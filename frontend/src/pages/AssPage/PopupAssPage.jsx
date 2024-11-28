import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Button, Spin, message} from "antd";
import TextArea from "antd/es/input/TextArea";
import {fetchChatResponse} from "../../slices/botSlice";
import styles from "./AssPage.module.scss";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {addMessageToChat} from "../../slices/botSlice";

const PopupAssPage = () => {
	const {id} = useParams();
	const dispatch = useDispatch();

	// Получаем данные из Redux Store
	const s = useSelector(state => state.bot.items.find(el => el.id === Number(id)));
	const items = useSelector(state => state.bot.items);
	console.log(s);
	const loading = useSelector(state => state.bot.loading);
	const chat = items.find(el => el.id === Number(id));

	// Локальные состояния для управления вводом
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showPopup, setShowPopup] = useState(false);

	const chatRef = useRef(null);
	const popupRef = useRef(null);

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [chat]);

	useEffect(() => {
		const handleClickOutside = event => {
			if (popupRef.current && !popupRef.current.contains(event.target)) {
				setShowPopup(false);
			}
		};

		// Добавляем обработчик на клик по документу
		document.addEventListener("mousedown", handleClickOutside);

		// Убираем обработчик при размонтировании компонента
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleSend = async () => {
		if (!inputValue.trim()) {
			message.warning("Введите сообщение.");
			return;
		}

		// Создаем сообщение пользователя и отправляем его в Redux
		const newMessage = {type: "question", text: inputValue};
		dispatch(addMessageToChat({id: Number(id), newMessages: [newMessage]}));

		setInputValue(""); // Очищаем поле ввода
		setIsLoading(true); // Устанавливаем флаг загрузки

		try {
			const response = await dispatch(fetchChatResponse({question: inputValue})).unwrap();

			// Добавляем ответ от бота в Redux
			const botMessage = {type: "answer", text: response.answer || "Нет ответа"};
			dispatch(addMessageToChat({id: Number(id), newMessages: [botMessage]}));
			message.success("Сообщение отправлено!");
		} catch (error) {
			message.error(`Ошибка: ${error}`);
		} finally {
			setIsLoading(false); // Сбрасываем флаг загрузки
		}
	};

	if (loading) {
		return <Spin />;
	}

	return (
		<>
			{showPopup && (
				<div className={styles.botChat} style={{borderColor: s.color}} ref={popupRef}>
					<div className={styles.prewHeader} style={{backgroundColor: s.color}}>
						<div
							className={styles.previewLogo}
							style={{
								backgroundImage: s.logo ? `url(${s.logo})` : undefined,
								backgroundSize: "contain",
								backgroundRepeat: "no-repeat",
								backgroundPosition: "center",
								backgroundColor: s.logo ? "inherit" : "gray",
							}}
						/>
						<div className={styles.prevTitle}>{s.title || "Lorem Ipsum"}</div>
					</div>
					<div className={styles.chatContainer}>
						<div className={styles.chat} ref={chatRef}>
							{chat?.messages?.map((msg, index) => (
								<div key={index} className={msg.type === "question" ? styles.ourMsg : styles.theirMsg}>
									<div
										className={styles.text}
										style={{
											backgroundColor: msg.type === "question" ? "inherit" : s?.color,
										}}>
										{msg.text}
									</div>
								</div>
							))}
							{isLoading && (
								<div className={styles.theirMsg}>
									<div className={styles.text} style={{backgroundColor: s?.color || "#f0f0f0"}}>
										<Spin />
									</div>
								</div>
							)}
						</div>
						<div className={styles.inputArea}>
							<TextArea
								value={inputValue}
								onChange={e => setInputValue(e.target.value)}
								placeholder='Введите сообщение'
								rows={2}
								className={styles.TextArea}
								onKeyDown={e => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault(); // предотвращает перенос строки
										handleSend();
									}
								}}
							/>
							<Button
								type='primary'
								className={styles.miniBtn}
								style={{
									backgroundColor: s.color || "#1890ff",
								}}
								onClick={handleSend}>
								Отправить
							</Button>
						</div>
					</div>
				</div>
			)}
			<Button
				type='primary'
				style={{
					backgroundColor: s.color || "#1890ff", // Пример использования цвета для кнопки
				}}
				className={styles.specialBtn}
				onClick={() => setShowPopup(prev => !prev)}>
				<QuestionCircleOutlined />
			</Button>
		</>
	);
};

export default React.memo(PopupAssPage);

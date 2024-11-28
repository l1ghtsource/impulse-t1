import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Button, Spin, message} from "antd";
import TextArea from "antd/es/input/TextArea";
import {fetchChatResponse} from "../../slices/botSlice";
import styles from "./AssPage.module.scss";
import {addMessageToChat} from "../../slices/botSlice";

const AssPage = () => {
	const {id} = useParams();
	const dispatch = useDispatch();

	// Получаем данные из Redux Store
	const s = useSelector(state => state.bot.items.find(el => el.id === Number(id)));
	const items = useSelector(state => state.bot.items);
	console.log();
	const loading = useSelector(state => state.bot.loading);
	const chat = items.find(el => el.id === Number(id));

	// Локальные состояния для управления вводом
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const chatRef = useRef(null);

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [chat]);

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
		<div className={styles.page}>
			<div
				className={styles.previewLogo}
				style={{
					backgroundImage: s.logo ? `url(${s.logo})` : undefined,
					backgroundSize: "contain",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundColor: s.logo ? "inherit" : "gray",
				}}></div>
			<div
				className={styles.title}
				style={{
					fontFamily: s.font || "inherit",
					color: s.color || "black",
				}}>
				{s.title || "Lorem Ipsum"}
			</div>
			<div style={{fontFamily: s.font || "inherit"}}>{s.desc || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>
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
	);
};

export default React.memo(AssPage);

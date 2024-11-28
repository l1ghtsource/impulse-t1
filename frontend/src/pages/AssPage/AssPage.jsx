import React, {useState} from "react";
import styles from "./AssPage.module.scss";
import TextArea from "antd/es/input/TextArea";
import {Button, Spin, message} from "antd";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {fetchChatResponse} from "../../slices/botSlice"; // Путь может отличаться

const AssPage = () => {
	const {id} = useParams();
	const dispatch = useDispatch();

	const s = useSelector(state => state.bot.items.find(el => el.id === Number(id)));
	const loading = useSelector(state => state.bot.loading);
	const [inputValue, setInputValue] = useState(""); // Стейт для ввода текста
	const [outputValue, setOutputValue] = useState(""); // Стейт для ответа
	const answer = useSelector(state => state.bot.answer);

	const handleSend = async () => {
		try {
			const response = await dispatch(fetchChatResponse({question: inputValue})).unwrap();
			setOutputValue(response.answer); // Устанавливаем текст ответа
			message.success("Сообщение отправлено!");
		} catch (error) {
			message.error(`Ошибка: ${error}`);
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
				className={styles.subTitle}
				style={{
					fontFamily: s.font || "inherit",
					color: s.color || "black",
				}}>
				{s.title || "Lorem Ipsum"}
			</div>
			<div
				style={{
					fontFamily: s.font || "inherit",
				}}>
				{s.desc || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
			</div>
			<div className={styles.previewEl}>
				<div>Input</div>
				<TextArea value={inputValue} onChange={e => setInputValue(e.target.value)} />
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
			<div className={styles.previewEl}>
				<div>Output</div>
				<TextArea value={outputValue} disabled />
			</div>
		</div>
	);
};

export default React.memo(AssPage);

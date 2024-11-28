import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import styles from "./MainPage.module.scss";

const MainPage = () => {
	// Получение списка чатов из Redux Store
	const chats = useSelector(state => state.bot.items);

	// Функция для подсчёта общей длины массивов в объекте
	const calculateTotalLength = obj => Object.values(obj).reduce((acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0);

	return (
		<div className={styles.page}>
			<div className={styles.title}>Мои ассистенты</div>
			<div className={styles.assDiv}>
				{chats.map(chat => {
					// Подсчёт количества файлов и ссылок
					const totalFiles = calculateTotalLength(chat.data || {});
					const totalLinks = calculateTotalLength(chat.services || {});

					return (
						<Link
							key={chat.id}
							to={chat.popup ? `/popup/${chat.id}` : `/${chat.id}`}
							className={styles.assCard}
							style={{textDecoration: "none", color: "inherit"}} // Убираем подчеркивание и меняем стиль
						>
							<div className={styles.cardTitle}>{chat.title || "Без названия"}</div>
							<div className={styles.desc}>{chat.desc || "Описание недоступно"}</div>
							<div className={styles.text}>
								<b>Модель:</b> {chat?.activeLlm || "Не указано"}
							</div>
							<div className={styles.text}>
								<b>Роль:</b> {chat?.prompt?.name || "Не указано"}
							</div>
							<div className={styles.text}>
								<b>Объем базы знаний:</b> {totalFiles} файлов, {totalLinks} ссылок
							</div>
							<div className={styles.text}>
								<b>Ссылка для интеграции:</b> {window.location.origin}
								{chat.popup ? `/popup/${chat.id}` : `/${chat.id}`}
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default React.memo(MainPage);

import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import styles from "./MainPage.module.scss";

const MainPage = () => {
	// Получение списка чатов из Redux Store
	const chats = useSelector(state => state.bot.items);
	console.log(chats);

	return (
		<div className={styles.page}>
			<div className={styles.title}>Мои ассистенты</div>
			<div className={styles.assDiv}>
				{chats.map(chat => (
					<Link
						key={chat.id}
						to={`/${chat.id}`}
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
							<b>Объем базы знаний:</b> {chat.files || 0} файлов, {chat.links || 0} ссылок
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default React.memo(MainPage);

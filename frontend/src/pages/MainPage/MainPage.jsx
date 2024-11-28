import React from "react";

import styles from "./MainPage.module.scss";

const MainPage = () => {
	return (
		<div className={styles.page}>
			<div className={styles.title}>Мои ассистенты</div>
			<div className={styles.assDiv}>
				<div className={styles.assCard}>
					<div className={styles.cardTitle}>Ассистент друзей</div>
					<div className={styles.desc}>Асистент друзей - лучший помошник современности,помошник да да не удивляйтесь</div>
					<div className={styles.text}>
						<b>Модель:</b> google/gemma-2-9b-it
					</div>
					<div className={styles.text}>
						<b>Роль:</b> Аналитик
					</div>
					<div className={styles.text}>
						<b>Объем базы знаний:</b> 5 файлов, 6 ссылок
					</div>
				</div>
				<div className={styles.assCard}>
					<div className={styles.cardTitle}>Ассистент друзей</div>
					<div className={styles.desc}>Асистент друзей - лучший помошник современности,помошник да да не удивляйтесь</div>
					<div className={styles.text}>
						<b>Модель:</b> google/gemma-2-9b-it
					</div>
					<div className={styles.text}>
						<b>Роль:</b> Аналитик
					</div>
					<div className={styles.text}>
						<b>Объем базы знаний:</b> 5 файлов, 6 ссылок
					</div>
				</div>
				<div className={styles.assCard}>
					<div className={styles.cardTitle}>Ассистент друзей</div>
					<div className={styles.desc}>Асистент друзей - лучший помошник современности,помошник да да не удивляйтесь</div>
					<div className={styles.text}>
						<b>Модель:</b> google/gemma-2-9b-it
					</div>
					<div className={styles.text}>
						<b>Роль:</b> Аналитик
					</div>
					<div className={styles.text}>
						<b>Объем базы знаний:</b> 5 файлов, 6 ссылок
					</div>
				</div>
				<div className={styles.assCard}>
					<div className={styles.cardTitle}>Ассистент друзей</div>
					<div className={styles.desc}>Асистент друзей - лучший помошник современности,помошник да да не удивляйтесь</div>
					<div className={styles.text}>
						<b>Модель:</b> google/gemma-2-9b-it
					</div>
					<div className={styles.text}>
						<b>Роль:</b> Аналитик
					</div>
					<div className={styles.text}>
						<b>Объем базы знаний:</b> 5 файлов, 6 ссылок
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(MainPage);

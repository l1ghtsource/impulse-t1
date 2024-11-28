import React from "react";

import styles from "./LoginPage.module.scss";
import {Button, Input, Tabs} from "antd";

const LoginPage = () => {
	const tabs = [
		{
			key: 1,
			label: "Регистрация",
		},
		{
			key: 2,
			label: "Авторизация",
		},
	];

	return (
		<div className={styles.page}>
			<div className={styles.cont}>
				<div className={styles.log} />
				<div className={styles.col}>
					<Tabs items={tabs} />
					<div className={styles.item}>
						<div className={styles.subsubTitle}>Логин</div>
						<Input />
					</div>
					<div className={styles.item}>
						<div className={styles.subsubTitle}>Пароль</div>
						<Input />
					</div>
					<div className={styles.item}>
						<div className={styles.subsubTitle}>Аватарка</div>
					</div>
					<Button type='primary' style={{width: "60%", height: "40px"}}>
						Зарегистрироваться
					</Button>
				</div>
			</div>
		</div>
	);
};

export default React.memo(LoginPage);

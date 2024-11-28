import React from "react";

import styles from "./AssPage.module.scss";
import TextArea from "antd/es/input/TextArea";
import {Button} from "antd";
import {useLocation} from "react-router-dom";

const AssPage = () => {
	const location = useLocation();

	return (
		<div className={styles.page}>
			<div
				className={styles.previewLogo}
				style={{
					backgroundImage: logo ? `url(${logo})` : undefined,
					backgroundSize: "contain",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundColor: logo ? "inherit" : "gray",
				}}></div>
			<div
				className={styles.subTitle}
				style={{
					fontFamily: font || "inherit",
					color: color || "black", // Применяем цвет текста
				}}>
				{title || "Lorem Ipsum"}
			</div>
			<div
				style={{
					fontFamily: font || "inherit", // Применяем цвет текста
				}}>
				{desc || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
			</div>
			<div className={styles.previewEl}>
				<div>Input</div>
				<TextArea />
				<Button
					type='primary'
					className={styles.miniBtn}
					style={{
						backgroundColor: color || "#1890ff", // Пример использования цвета для кнопки
					}}>
					Отправить
				</Button>
			</div>
			<div className={styles.previewEl}>
				<div>Output</div>
				<TextArea disabled />
			</div>
		</div>
	);
};

export default React.memo(AssPage);

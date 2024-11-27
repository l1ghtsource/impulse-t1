import React, {useState} from "react";
import styles from "./CreatePage.module.scss";
import {Button, Input, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import classNames from "classnames";

const TabSite = () => {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [logo, setLogo] = useState(null); // URL для загруженного изображения
	const [font, setFont] = useState("");
	const [color, setColor] = useState("");

	// Функция обработки загрузки изображения
	const handleUpload = ({file}) => {
		const reader = new FileReader();
		reader.onload = () => {
			setLogo(reader.result); // Устанавливаем результат чтения как строку
		};
		reader.readAsDataURL(file); // Читаем файл как Data URL
	};

	return (
		<div className={styles.tab}>
			<div className={styles.topTab}>
				<div className={styles.rigt}>
					<div className={styles.elem}>
						<div className={styles.subsubTitle}>Название</div>
						<Input value={title} onChange={e => setTitle(e.target.value)} />
					</div>
					<div className={classNames(styles.elem, styles.lElem)}>
						<div className={styles.subsubTitle}>Описание</div>
						<TextArea className={styles.textArea} value={desc} onChange={e => setDesc(e.target.value)} />
					</div>
				</div>
				<div className={styles.rigt}>
					<div className={styles.elem}>
						<div className={styles.subsubTitle}>Логотип</div>
						<Upload
							accept='.png,.jpg,.svg'
							beforeUpload={file => {
								handleUpload({file});
								return false; // Отключаем авто-загрузку
							}}
							showUploadList={false}>
							<Button>Загрузить</Button>
						</Upload>
					</div>
					<div className={styles.elem}>
						<div className={styles.subsubTitle}>Шрифт</div>
						<Input value={font} onChange={e => setFont(e.target.value)} />
					</div>
					<div className={styles.elem}>
						<div className={styles.subsubTitle}>Основной цвет</div>
						<Input value={color} onChange={e => setColor(e.target.value)} />
					</div>
				</div>
			</div>
			<div className={styles.subTitle}>Предпросмотр</div>
			<div className={styles.preview}>
				<div className={styles.previewContainer}>
					{/* Динамический фон для логотипа */}
					<div
						className={styles.previewLogo}
						style={{
							backgroundImage: logo ? `url(${logo})` : undefined,
							backgroundSize: "contain",
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center",
							backgroundColor: logo && "inherit",
						}}></div>
					<div className={styles.subTitle}>{title || "Lorem Ipsum"}</div>
					<div>{desc || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</div>
					<div className={styles.previewEl}>
						<div>Input</div>
						<TextArea disabled />
						<Button type='primary' className={styles.miniBtn}>
							Отправить
						</Button>
					</div>
					<div className={styles.previewEl}>
						<div>Output</div>
						<TextArea disabled />
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(TabSite);

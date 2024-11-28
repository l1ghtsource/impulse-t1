import React, {useState} from "react";
import styles from "./CreatePage.module.scss";
import {Button, ColorPicker, FloatButton, Input, Select, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import classNames from "classnames";
import {EnterOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {addElement, fetchData} from "../../slices/botSlice";
import {useNavigate} from "react-router-dom";

const TabPopup = () => {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [logo, setLogo] = useState(null);
	const [newLogo, setNewLogo] = useState(null);
	const [font, setFont] = useState(""); // Название шрифта
	const [color, setColor] = useState("#00aae6"); // Цвет
	const [showPopup, setShowPopup] = useState(false);

	const {data, services, settings, activeRetriver, activeLlm, prompt} = useSelector(s => s.createBot);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Функция обработки загрузки изображения
	const handleUpload = (type, file) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (type === "ass") {
				setLogo(reader.result);
			} else {
				setNewLogo(reader.result);
			}
		};
		reader.readAsDataURL(file);
	};

	const options = [
		{
			value: "roboto",
			label: "Roboto",
		},
		{
			value: "inter",
			label: "Inter",
		},
		{
			value: "Montserrat",
			label: "Montserrat",
		},
	];
	const items = useSelector(s => s.bot.items);

	// Генерация стиля для динамического подключения шрифта
	const generateFontStyle = () => {
		if (!font) return null;
		return <style>{`@import url('https://fonts.googleapis.com/css2?family=${font.replace(/\s/g, "+")}:wght@400;700&display=swap');`}</style>;
	};

	const handleSubmitClick = () => {
		const req = {
			services,
			settings: {
				temp: 0,
			},
			activeRetriver,
			activeLlm,
			prompt,
		};
		const res = {
			title,
			desc,
			logo,
			newLogo,
			font,
			color,
		};
		dispatch(addElement({...res, ...req, id: items?.length + 1}));
		navigate(`/popup/${items?.length + 1}`);
	};

	return (
		<div className={styles.tab}>
			{generateFontStyle() /* Подключаем шрифт динамически */}
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
					<div className={styles.elemLogos}>
						<div className={styles.elem}>
							<div className={styles.subsubTitle}>Логотип ассистента</div>
							<Upload
								beforeUpload={file => {
									handleUpload("ass", file);
									return false;
								}}
								showUploadList={false}>
								<Button>Загрузить</Button>
							</Upload>
						</div>
						<div className={styles.elem}>
							<div className={styles.subsubTitle}>Логотип пользователя</div>
							<Upload
								beforeUpload={file => {
									handleUpload("pol", file);
									return false;
								}}
								showUploadList={false}>
								<Button>Загрузить</Button>
							</Upload>
						</div>
					</div>
					<div className={styles.elem}>
						<div className={styles.subsubTitle}>Шрифт</div>
						<Select options={options} value={font} onChange={e => setFont(e)} placeholder='Введите название шрифта, напр. Roboto' />
					</div>
					<div className={styles.elem}>
						<div className={styles.subsubTitle}>Основной цвет</div>
						<div className={styles.divdiv}>
							<ColorPicker defaultValue={"#00aae6"} value={color} onChange={(v, css) => setColor(css)} />
							<Input value={color} onChange={e => setColor(e.target.value)} placeholder='Введите цвет, напр. #ff5733 или red' />
						</div>
					</div>
				</div>
			</div>
			<div className={styles.subTitle}>Предпросмотр</div>
			<div className={styles.preview}>
				<div
					className={styles.previewContainer}
					style={{
						fontFamily: font || "inherit", // Применяем цвет текста
					}}>
					{showPopup ?
						<>
							<div className={styles.botChat} style={{borderColor: color}}>
								<div className={styles.prewHeader} style={{backgroundColor: color}}>
									<div
										className={styles.previewLogo}
										style={{
											backgroundImage: logo ? `url(${logo})` : undefined,
											backgroundSize: "contain",
											backgroundRepeat: "no-repeat",
											backgroundPosition: "center",
											backgroundColor: logo ? "inherit" : "gray",
										}}
									/>
									<div className={styles.prevTitle}>{title || "Lorem Ipsum"}</div>
								</div>
								<div className={styles.chat}>
									<div className={styles.ourMsg}>
										<div className={styles.text}>
											<div className={styles.mainText}>{desc || "Lorem ipsum odor amet, consectetuer adipiscing elit. Finibus at habitasse senectus curae sollicitudin. Vehicula facilisi quis placerat quis accumsan molestie ad blandit? Etiam sagittis bibendum pellentesque arcu semper donec semper."}</div>
											<div className={styles.time}>12:22</div>
										</div>
										<div
											className={styles.miniIcon}
											style={{
												backgroundImage: newLogo ? `url(${newLogo})` : undefined,
												backgroundSize: "contain",
												backgroundRepeat: "no-repeat",
												backgroundPosition: "center",
												backgroundColor: newLogo ? "inherit" : "gray",
											}}
										/>
									</div>
									<div className={styles.theirMsg}>
										<div
											className={styles.miniIcon}
											style={{
												backgroundImage: logo ? `url(${logo})` : undefined,
												backgroundSize: "contain",
												backgroundRepeat: "no-repeat",
												backgroundPosition: "center",
												backgroundColor: logo ? "inherit" : "gray",
											}}
										/>
										<div className={styles.text} style={{backgroundColor: color}}>
											<div className={styles.mainText}>{desc || "Lorem ipsum odor amet, consectetuer adipiscing elit. Finibus at habitasse senectus curae sollicitudin. Vehicula facilisi quis placerat quis accumsan molestie ad blandit? Etiam sagittis bibendum pellentesque arcu semper donec semper."}</div>
											<div className={styles.time}>12:22</div>
										</div>
									</div>
								</div>
								<div className={styles.chatChat}>
									<TextArea disabled />
									<Button type='primary' style={{backgroundColor: color}}>
										<EnterOutlined />
									</Button>
								</div>
							</div>
						</>
					:	null}
				</div>
				<Button
					type='primary'
					style={{
						backgroundColor: color || "#1890ff", // Пример использования цвета для кнопки
					}}
					className={styles.specialBtn}
					onClick={() => setShowPopup(prev => !prev)}>
					<QuestionCircleOutlined />
				</Button>
			</div>
			<Button style={{width: "20%", margin: "30px auto"}} type='primary' onClick={handleSubmitClick}>
				Сохранить
			</Button>
		</div>
	);
};

export default React.memo(TabPopup);

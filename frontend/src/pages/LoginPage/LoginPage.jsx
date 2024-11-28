import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input, Tabs, Alert, Upload} from "antd";
import {login, register} from "../../slices/userSlice";
import {UploadOutlined} from "@ant-design/icons";
import styles from "./LoginPage.module.scss";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
	const dispatch = useDispatch();
	const {error} = useSelector(state => state.user);
	const navigate = useNavigate();
	const [tab, setTab] = useState(1);
	const [formData, setFormData] = useState({
		login: "",
		password: "",
		email: "",
		avatar: "", // Ссылка на файл (или base64, если нужно)
	});

	const tabs = [
		{key: 1, label: "Регистрация"},
		{key: 2, label: "Авторизация"},
	];

	const handleInputChange = e => {
		const {name, value} = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	// Обработчик загрузки файла
	const handleFileUpload = info => {
		// Берем последний загруженный файл
		const file = info.file.originFileObj;
		if (file) {
			const avatarUrl = URL.createObjectURL(file); // Создание временной ссылки
			setFormData(prev => ({
				...prev,
				avatar: avatarUrl,
			}));
			console.log(avatarUrl);
		}
	};

	const handleRegister = () => {
		if (!formData.login || !formData.password || !formData.email) {
			alert("Заполните все поля для регистрации!");
			return;
		}
		dispatch(register(formData));
		navigate("/");
	};

	const handleLogin = () => {
		if (!formData.login || !formData.password) {
			alert("Введите логин и пароль!");
			return;
		}
		dispatch(login({login: formData.login, password: formData.password}));
		navigate("/");
	};

	return (
		<div className={styles.page}>
			<div className={styles.cont}>
				<div className={styles.log} />
				<div className={styles.col}>
					<Tabs items={tabs} onChange={v => setTab(v)} />
					{error && <Alert type='error' message={error} />}
					{tab === 1 ?
						<div className={styles.consa}>
							<div className={styles.item}>
								<div className={styles.subsubTitle}>Логин</div>
								<Input name='login' onChange={handleInputChange} />
							</div>
							<div className={styles.item}>
								<div className={styles.subsubTitle}>Пароль</div>
								<Input name='password' type='password' onChange={handleInputChange} />
							</div>
							<div className={styles.item}>
								<div className={styles.subsubTitle}>Email</div>
								<Input name='email' onChange={handleInputChange} />
							</div>
							<div className={styles.item}>
								<div className={styles.subsubTitle}>Аватар</div>
								<Upload
									onChange={e => handleFileUpload(e)}
									accept='image/*' // Принимаем только изображения
								>
									<Button icon={<UploadOutlined />}>Загрузить аватар</Button>
								</Upload>
							</div>
							<Button type='primary' style={{width: "60%", height: "40px"}} onClick={handleRegister}>
								Зарегистрироваться
							</Button>
						</div>
					:	<div className={styles.consa}>
							<div className={styles.item}>
								<div className={styles.subsubTitle}>Логин</div>
								<Input name='login' onChange={handleInputChange} />
							</div>
							<div className={styles.item}>
								<div className={styles.subsubTitle}>Пароль</div>
								<Input name='password' type='password' onChange={handleInputChange} />
							</div>
							<Button type='primary' style={{width: "30%", height: "40px"}} onClick={handleLogin}>
								Войти
							</Button>
						</div>
					}
				</div>
			</div>
		</div>
	);
};

export default React.memo(LoginPage);

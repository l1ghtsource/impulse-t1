import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input, Tabs, Spin, Alert} from "antd";
import {loginUser, registerUser} from "../../slices/userSlice";
import styles from "./LoginPage.module.scss";

const LoginPage = () => {
	const dispatch = useDispatch();
	const {loading, error} = useSelector(state => state.user);
	const [tab, setTab] = useState(1);
	const [formData, setFormData] = useState({
		login: "",
		password: "",
		avatar: "",
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

	const handleRegister = () => {
		if (!formData.nickname || !formData.hashed_password) {
			alert("Заполните все поля для регистрации!");
			return;
		}
		dispatch(registerUser(formData));
	};

	const handleLogin = () => {
		if (!formData.nickname || !formData.hashed_password) {
			alert("Введите логин и пароль!");
			return;
		}
		dispatch(loginUser({nickname: formData.nickname, hashed_password: formData.hashed_password}));
	};

	return (
		<div className={styles.page}>
			<div className={styles.cont}>
				<div className={styles.log} />
				<div className={styles.col}>
					<Tabs items={tabs} onChange={v => setTab(v)} />
					{error && <Alert type='error' message={error} />}
					<Spin spinning={loading}>
						{tab === 1 ?
							<div className={styles.consa}>
								<div className={styles.item}>
									<div className={styles.subsubTitle}>Логин</div>
									<Input name='nickname' onChange={handleInputChange} />
								</div>
								<div className={styles.item}>
									<div className={styles.subsubTitle}>Пароль</div>
									<Input name='hashed_password' type='password' onChange={handleInputChange} />
								</div>
								<div className={styles.item}>
									<div className={styles.subsubTitle}>Email</div>
									<Input name='email' onChange={handleInputChange} />
								</div>
								<div className={styles.item}>
									<div className={styles.subsubTitle}>Аватарка (URL)</div>
									<Input name='avatar' onChange={handleInputChange} />
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
					</Spin>
				</div>
			</div>
		</div>
	);
};

export default React.memo(LoginPage);

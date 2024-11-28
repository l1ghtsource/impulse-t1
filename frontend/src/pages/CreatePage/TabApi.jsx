import React from "react";
import styles from "./CreatePage.module.scss";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";

const TabApi = () => {
	const dispatch = useDispatch();
	const {data, services, settings, activeRetriver, activeLlm, prompt} = useSelector(s => s.createBot);
	const handleSubmitClick = () => {
		const req = {
			data,
			services,
			settings,
			activeRetriver,
			activeLlm,
			prompt,
		};
	};
	return (
		<div style={{display: "flex", flexDirection: "column"}}>
			<div className={styles.blackTitle}>Выгрузка апи</div>
			<div>Результатом будет ссылка ввида https://example.com/api/123123123123</div>
			<Button style={{width: "20%", margin: "30px auto"}} type='primary' onClick={handleSubmitClick}>
				Сохранить
			</Button>
		</div>
	);
};

export default React.memo(TabApi);

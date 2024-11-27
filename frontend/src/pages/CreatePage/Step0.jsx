import React from "react";

import styles from "./CreatePage.module.scss";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addFile} from "../../slices/createBotSlice";
import ActionButton from "../../components/ActionButton";

const Step0 = ({setStep}) => {
	const {services, data} = useSelector(s => s.createBot);
	const dispatch = useDispatch();

	const handleFileChange = (fileType, event) => {
		const files = event.target.files; // Получаем все выбранные файлы
		if (files.length > 0) {
			// Преобразуем FileList в массив, чтобы можно было передать его в экшен
			const fileArray = Array.from(files);
			dispatch(addFile({fileType, files: fileArray})); // Отправляем экшен с типом файла и списком файлов
		}
	};

	return (
		<>
			<div className={styles.subTitle}>Файлы</div>
			<div className={styles.fileGrid}>
				{Object.keys(data).map((key, index) => (
					<ActionButton key={index} input={key} index={index} handler={handleFileChange} type='data' data={data[key]} />
				))}
			</div>
			<div className={styles.subTitle}>Сервисы</div>
			<div className={styles.fileGrid}>
				{Object.keys(services).map((key, index) => (
					<ActionButton key={index} input={key} index={index} type='services' data={services[key]} />
				))}
			</div>
			<Button type='primary' onClick={() => setStep(prevStep => prevStep + 1)} className={styles.btn}>
				К следующему шагу
			</Button>
		</>
	);
};

export default React.memo(Step0);

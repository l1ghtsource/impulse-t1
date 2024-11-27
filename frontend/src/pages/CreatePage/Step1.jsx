import {Button, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

import styles from "./CreatePage.module.scss";

const Step1 = setStep => {
	return (
		<>
			<div className={styles.subTitle}>Доступные LLM</div>
			<Input />
			<div className={styles.fileGrid}>{}</div>
			<div className={styles.subTitle}>Параметры</div>
			<div className={styles.subsubTitle}>Температура</div>
			<Input />
			<div className={styles.subsubTitle}>Ретривер</div>
			<Input />
			<div className={styles.fileGrid}>{}</div>
			<div className={styles.subsubTitle}>Промпт</div>
			<div className={styles.fileGrid}>{}</div>
			<TextArea />
			<Button type='primary' onClick={() => setStep(prevStep => prevStep + 1)} className={styles.btn}>
				К следующему шагу
			</Button>
		</>
	);
};
export default React.memo(Step1);

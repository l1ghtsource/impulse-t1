import React, {useState} from "react";
import styles from "./CreatePage.module.scss";
import {Button, Slider, Steps, Upload} from "antd";
import Search from "antd/es/input/Search";
import TextArea from "antd/es/input/TextArea";
import Step0 from "./Step0";
import Step1 from "./Step1";

const CreatePage = () => {
	const [step, setStep] = useState(0);

	const steps = [
		{
			title: "Шаг 1",
			subTitle: "Выбор и загрузка базы знаний",
			onClick: () => setStep(0),
		},
		{
			title: "Шаг 2",
			subTitle: "Выбор и настройка LLM",
			onClick: () => setStep(1),
		},
		{
			title: "Шаг 3",
			subTitle: "Настройка визуала",
		},
	];

	return (
		<div className={styles.page}>
			<div className={styles.title}>Создание нового ассистента</div>
			<div className={styles.stepss}>
				<Steps items={steps} current={step} progressDot />
			</div>
			{step === 0 ?
				<Step0 setStep={setStep} />
			:	null}
			{step === 1 ?
				<Step1 setStep={setStep} />
			:	null}
		</div>
	);
};

export default React.memo(CreatePage);

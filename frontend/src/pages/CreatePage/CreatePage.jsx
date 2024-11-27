import React, {useState} from "react";
import styles from "./CreatePage.module.scss";
import {Steps} from "antd";
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";

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
			onClick: () => setStep(2),
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
			{step === 2 ?
				<Step2 />
			:	null}
		</div>
	);
};

export default React.memo(CreatePage);

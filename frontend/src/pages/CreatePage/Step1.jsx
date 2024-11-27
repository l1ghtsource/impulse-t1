import {Button, Input, Slider} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

import styles from "./CreatePage.module.scss";
import {useDispatch, useSelector} from "react-redux";
import ActionButton from "../../components/ActionButton";
import {changeLR, changePropmt, changeSettigs} from "../../slices/createBotSlice";

const Step1 = ({setStep}) => {
	const {llm, retrivers, roles, activeLlm, activeRetriver, prompt} = useSelector(s => s.createBot);
	const dispatch = useDispatch();
	const s = useSelector(s => s.createBot);
	console.log(s);

	const handleValue = (type, value) => {
		dispatch(changeLR({type, value}));
	};

	const handlePrompt = (name, value) => {
		dispatch(changePropmt({name, value}));
	};
	const sliderMark = {
		0.1: 0.1,
		0.2: 0.2,
		0.3: 0.3,
		0.4: 0.4,
		0.5: 0.5,
		0.6: 0.6,
		0.7: 0.7,
		0.8: 0.8,
		0.9: 0.9,
		1: 1,
	};

	return (
		<>
			<div className={styles.subTitle}>Доступные LLM</div>
			<Input disabled={activeLlm} />
			<div className={styles.fileGrid}>
				{llm.map((el, index) => (
					<ActionButton key={index} input={el} index={index} handler={handleValue} type='activeLlm' data={activeLlm} />
				))}
			</div>
			<div className={styles.subTitle}>Параметры</div>
			<div className={styles.subsubTitle}>Температура</div>
			<div className={styles.slider}>
				<Slider min={0.1} max={1} step={0.1} marks={sliderMark} onChange={value => changeSettigs({type: "temp", value})} />
			</div>
			<div className={styles.subsubTitle}>Ретривер</div>
			<Input disabled={activeRetriver} />
			<div className={styles.fileGrid}>
				{retrivers.map((el, index) => (
					<ActionButton key={index} input={el} index={index} handler={handleValue} type='activeRetriver' data={activeRetriver} />
				))}
			</div>
			<div className={styles.subsubTitle}>Промпт</div>
			<div className={styles.fileGrid}>
				{Object.keys(roles).map((el, index) => (
					<ActionButton key={index} input={el} index={index} handler={handlePrompt} type='prompt' data={prompt.name} hover={roles[el]} />
				))}
			</div>
			<TextArea />
			<Button type='primary' onClick={() => setStep(prevStep => prevStep + 1)} className={styles.btn}>
				К следующему шагу
			</Button>
		</>
	);
};
export default React.memo(Step1);

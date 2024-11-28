import React, {useState, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import classnames from "classnames";
import styles from "./ActionButton.module.scss";
import {addService, removeSomeThing} from "../slices/createBotSlice";
import {Input, Modal, Popover} from "antd";

const ActionButton = ({index, input, handler, type, data, hover = false}) => {
	const [popup, setPopup] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [value, setValue] = useState("");
	const popupRef = useRef(null); // Ссылка на попап
	const dispatch = useDispatch();

	const handleOk = e => {
		e.stopPropagation();
		setIsModalOpen(false);
		dispatch(addService({serviceType: input, link: value}));
	};

	const handleCancel = e => {
		e.stopPropagation();
		setIsModalOpen(false);
	};

	const handleRemove = (e, name) => {
		e.stopPropagation();
		dispatch(removeSomeThing({docType: input, name, type})); // Передаем объект payload
	};

	// Обработчик для закрытия попапа при клике вне его
	const closePopup = e => {
		if (popupRef.current && !popupRef.current.contains(e.target)) {
			setPopup(false); // Закрываем попап
		}
	};

	useEffect(() => {
		// Добавляем обработчик кликов по всему документу
		document.addEventListener("mousedown", closePopup);

		// Убираем обработчик при размонтировании компонента
		return () => {
			document.removeEventListener("mousedown", closePopup);
		};
	}, []);

	if (type === "prompt") {
		const content = <div className={styles.promtDesc}>{hover}</div>;
		return (
			<Popover content={content}>
				<div className={classnames(styles.card, data === input && styles.active)} onClick={() => handler(input, hover)}>
					<div className={styles.ltext}>{input}</div>
				</div>
			</Popover>
		);
	}

	if (type === "activeLlm" || type === "activeRetriver") {
		return (
			<div className={classnames(styles.card, data === input && styles.active)} onClick={() => handler(type, input)}>
				<div className={styles.text}>{input}</div>
			</div>
		);
	}

	if (type === "services") {
		return (
			<div className={classnames(styles.card, data?.length && styles.active)} onClick={() => setIsModalOpen(true)}>
				<div htmlFor={`file-upload-${index}`} className={classnames(styles.label)}>
					{input}
				</div>
				<Modal open={isModalOpen} onOk={e => handleOk(e)} rootClassName={styles.modal} className={styles.modal} onCancel={e => handleCancel(e)} onClose={handleCancel}>
					<Input
						placeholder={
							input === "youtube" ? "Укажите id видео на YouTube"
							: input === "github" ?
								"Укажите login/repo на GitHub"
							:	`Введите url ${input}`
						}
						value={value}
						onChange={e => setValue(e.target.value)}
					/>
				</Modal>

				{data?.length ?
					<>
						<div
							className={classnames(styles.dot, popup && styles.spin)}
							onClick={e => {
								e.stopPropagation();
								setPopup(true);
							}}>
							{data.length}
						</div>
						{popup && (
							<div
								ref={popupRef} // Привязываем реф к попапу
								className={styles.popup}
								onClick={e => e.stopPropagation()}>
								{data.map(el => (
									<div key={el} className={styles.popupItem}>
										<div>{el}</div>
										<div
											className={styles.trash}
											onClick={e => handleRemove(e, el)} // Обработчик удаления
										/>
									</div>
								))}
							</div>
						)}
					</>
				:	null}
			</div>
		);
	}

	if (type === "data") {
		return (
			<div className={classnames(styles.card, data?.length && styles.active)}>
				<label htmlFor={`file-upload-${index}`} className={classnames(styles.label)}>
					{`.${input}`}
				</label>
				<input id={`file-upload-${index}`} type='file' accept={`.${input}`} className={styles.input} onChange={e => handler(input, e)} multiple />
				{data?.length ?
					<>
						<div className={classnames(styles.dot, popup && styles.spin)} onClick={() => setPopup(true)}>
							{data.length}
						</div>
						{popup && (
							<div
								ref={popupRef} // Привязываем реф к попапу
								className={styles.popup}>
								{data.map(el => (
									<div key={el.name} className={styles.popupItem}>
										<div>{el.name}</div>
										<div className={styles.trash} onClick={e => handleRemove(e, el.name)} />
									</div>
								))}
							</div>
						)}
					</>
				:	null}
			</div>
		);
	}
};

export default React.memo(ActionButton);

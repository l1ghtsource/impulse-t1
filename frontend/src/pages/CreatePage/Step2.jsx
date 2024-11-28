import React, {useState} from "react";
import styles from "./CreatePage.module.scss";
import {Button, Tabs} from "antd";
import TabSite from "./TabSite";
import {useSelector} from "react-redux";
import TabPopup from "./TabPopup";
import TabApi from "./TabApi";

const Step2 = () => {
	const [tab, setTab] = useState(1);

	const tabs = [
		{
			key: 1,
			label: "Сайт",
		},
		{
			key: 2,
			label: "Поп-ап",
		},
		{
			key: 3,
			label: "API",
		},
	];
	return (
		<>
			<Tabs defaultActiveKey='1' items={tabs} onChange={k => setTab(k)} />
			{tab === 1 ?
				<TabSite />
			:	null}
			{tab === 2 ?
				<TabPopup />
			:	null}
			{tab === 3 ?
				<TabApi />
			:	null}
			<Button style={{width: "20%", margin: "0 auto"}} type='primary'>
				Сохранить
			</Button>
		</>
	);
};

export default React.memo(Step2);

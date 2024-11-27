import React, {useState} from "react";
import styles from "./CreatePage.module.scss";
import {Tabs} from "antd";
import TabSite from "./TabSite";
import {useSelector} from "react-redux";

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
		</>
	);
};

export default React.memo(Step2);

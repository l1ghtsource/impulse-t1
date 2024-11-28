import React from "react";
import styles from "./CreatePage.module.scss";

const TabApi = () => {
	return (
		<div>
			<div className={styles.blackTitle}>Выгрузка апи</div>
			<div>Результатом будет ссылка ввида https://example.com/api/123123123123</div>
		</div>
	);
};

export default React.memo(TabApi);

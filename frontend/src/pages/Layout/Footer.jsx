import React from "react";

import styles from "./Layout.module.scss";

const Footer = () => {
	return <footer className={styles.footer}>Все права защищены</footer>;
};
export default React.memo(Footer);

import React from "react";

import styles from "./Layout.module.scss";
import {Link} from "react-router-dom";

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.left}>
				<div className={styles.logo}>
					<div className={styles.logoImg} />
					<div className={styles.logotext}>FoRAGer</div>
				</div>
				<div className={styles.links}>
					<Link to='/'>Мои ассистенты</Link>
					<Link to='/create'>Новый ассистент</Link>
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.profielIcon}></div>
				<div className={styles.profileText}>Admin</div>
			</div>
		</header>
	);
};
export default React.memo(Header);

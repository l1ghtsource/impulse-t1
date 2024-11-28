import React from "react";
import {NavLink} from "react-router-dom";

import styles from "./Layout.module.scss";

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.left}>
				<div className={styles.logo}>
					<div className={styles.logoImg} />
					<div className={styles.logotext}>FoRAGer</div>
				</div>
				<div className={styles.links}>
					<NavLink to='/' className={({isActive}) => (isActive ? `${styles.activeLink}` : undefined)}>
						Мои ассистенты
					</NavLink>
					<NavLink to='/create' className={({isActive}) => (isActive ? `${styles.activeLink}` : undefined)}>
						Новый ассистент
					</NavLink>
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

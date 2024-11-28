import React from "react";
import {NavLink} from "react-router-dom";

import styles from "./Layout.module.scss";
import {useSelector} from "react-redux";

const Header = () => {
	const user = useSelector(s => s.user.user);

	return (
		<header className={styles.header}>
			{user ?
				<>
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
						<div className={styles.profielIcon} style={{backgroundColor: "inherit"}}></div>
						<div className={styles.profileText}>{user.login}</div>
					</div>
				</>
			:	<div className={styles.logoImg} />}
		</header>
	);
};

export default React.memo(Header);

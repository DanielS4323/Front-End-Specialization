import React from 'react';
import LogoPhoto from '../../../../assets/logo.png';
import styles from './Logo.module.css';
const Logo = () => {
	return <img className={styles.logo} src={LogoPhoto} alt='Logo image' />;
};

export default Logo;

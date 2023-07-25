import React from "react"
import InfoIcon from "src/assets/info.svg"
import styles from "./header.module.scss"

export const Header: React.FC = () => (
  <header className={styles.root}>
    <div className={styles.title}>ЛОГОТИП</div>
    <InfoIcon className={styles.infoIcon}/>
  </header>
)

import React from "react"
import styles from "./layout.module.scss"
import { Header } from "../header/header"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.root}>
    <Header />
    {children}
  </div>
)

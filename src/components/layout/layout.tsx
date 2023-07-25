import React from "react"
import styles from "./layout.module.scss"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.root}>{children}</div>
)

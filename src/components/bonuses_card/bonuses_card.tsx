import React from "react"
import styles from "./bonuses_card.module.scss"
import FireIcon from "src/assets/fire.svg"
import ArrowButton from "src/assets/arrow-button.svg"

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.getMonth() + 1
  return `${day.toString().padStart(2, "0")}.${month
    .toString()
    .padStart(2, "0")}`
}

interface BonusesCardProps {
  bonusCount: number
  expiredDate: string
  expiredBonusCount: number
}

export const BonusesCard: React.FC<BonusesCardProps> = ({
  bonusCount,
  expiredDate,
  expiredBonusCount,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <div className={styles.bonusCount}>{bonusCount} бонусов</div>

        <div className={styles.expiredInfo}>
          {formatDate(expiredDate)} сгорит <FireIcon /> {expiredBonusCount}{" "}
          бонусов
        </div>
      </div>
      <ArrowButton className={styles.button} />
    </div>
  )
}

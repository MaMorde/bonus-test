import { Layout } from "~/components/layout/layout"
import { Header } from "~/components/header/header"
import { BonusesCard } from "~/components/bonuses_card/bonuses_card"
import styles from "../styles/index.module.scss"
import { useState, useEffect } from "react"
import { getAccessToken, getBonusInfo, getToken, setToken } from "~/api"

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [bonusInfo, setBonusInfo] = useState<BonusesRequest | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      const fetchData = async () => {
        setIsLoading(true)

        const token = getToken()
        if (token) {
          const data = await getBonusInfo(token)
          if (data?.data === null || data?.resultOperation?.status === 1) {
            setToken(null)
            const newToken = await getAccessToken({ latitude: 0, longitude: 0 })
            if (newToken) {
              setToken(newToken)
              const newData = await getBonusInfo(newToken)
              setBonusInfo(newData)
            } else {
              setBonusInfo(null)
            }
          } else {
            setBonusInfo(data)
          }
        } else {
          const newToken = await getAccessToken({ latitude: 0, longitude: 0 })
          if (newToken) {
            setToken(newToken)
            const data = await getBonusInfo(newToken)
            setBonusInfo(data)
          }
        }

        setIsLoading(false)
      }
      fetchData()
    }
  }, [isClient])

  return (
    <Layout>
      <Header />
      <div className={styles.cardWrapper}>
        <div className={styles.redBlock}></div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <BonusesCard
            bonusCount={bonusInfo?.data.currentQuantity || 0}
            expiredDate={bonusInfo?.data.dateBurning || ""}
            expiredBonusCount={bonusInfo?.data.forBurningQuantity || 0}
          />
        )}
      </div>
    </Layout>
  )
}

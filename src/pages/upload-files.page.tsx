import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Layout } from "~/components/layout/layout"

export default function UploadFiles() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isUnauthorized, setIsUnauthorized] = useState(false)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const selectedFiles = files.slice(0, 100)
    setSelectedFiles(selectedFiles)
  }

  const handleUpload = async () => {
    if (isUnauthorized) {
      console.error("Error: Unauthorized. Please check your access token.")
      return
    }

    const uploadUrl = "https://cloud-api.yandex.net/v1/disk/resources/upload"
    const token = "YANDEX_DISK_ACCESS_TOKEN"

    // Создаем промежуточный axios instance для проверки авторизации
    const checkAuthAxios = axios.create()

    try {
      await checkAuthAxios.get(uploadUrl, {
        headers: {
          Authorization: `OAuth ${token}`,
        },
      })
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setIsUnauthorized(true)
        console.error("Error: Unauthorized. Please check your access token.")
        return
      } else {
        console.error("Error checking authorization:", error)
      }
    }

    // Создаем отдельный axios instance для загрузки файлов с авторизацией
    const uploadAxios = axios.create({
      headers: {
        Authorization: `OAuth ${token}`,
      },
    })

    try {
      const uploadRequests = selectedFiles.map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        try {
          const response = await uploadAxios.post(uploadUrl, formData)
          console.log("File uploaded:", response.data)
          return response.data
        } catch (error) {
          console.error("Error uploading file:", error)
        }
      })

      await Promise.all(uploadRequests)
      console.log("All files uploaded")
    } catch (error) {
      console.error("Error uploading files:", error)
    }
  }

  return (
    <Layout>
      <div>
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload}>Загрузить на Яндекс.Диск</button>
      </div>
    </Layout>
  )
}

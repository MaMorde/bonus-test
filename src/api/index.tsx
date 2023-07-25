import axios from "axios"
import {
  ACCESS_KEY,
  ACCESS_TOKEN_URL,
  CLIENT_ID,
  DEVICE_ID,
  GET_BONUS_URL,
} from "./variables"

export const LOCAL_STORAGE_TOKEN_KEY = "access_token"

export const getToken = () => {
  const lsToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
  if (lsToken) {
    return lsToken
  }
  return null
}

export const setToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
  }
}

export const getAccessToken = async ({
  latitude,
  longitude,
}: {
  latitude: number
  longitude: number
}) => {
  const url = `${ACCESS_TOKEN_URL}/api/v3/clients/accesstoken`

  const params: AccessTokenRequest = {
    idClient: CLIENT_ID,
    accessToken: "",
    paramName: "device",
    paramValue: DEVICE_ID,
    latitude,
    longitude,
    sourceQuery: 0,
  }

  const config = {
    headers: {
      AccessKey: ACCESS_KEY,
    },
  }

  try {
    const response = await axios.post<AccessTokenResponse>(url, params, config)
    return response.data.accessToken
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getBonusInfo = async (token: string) => {
  const config = {
    headers: {
      AccessKey: ACCESS_KEY,
    },
  }

  const url = `${GET_BONUS_URL}/api/v3/ibonus/generalinfo/${token}`

  try {
    const response = await axios.get<BonusesRequest>(url, config)

    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

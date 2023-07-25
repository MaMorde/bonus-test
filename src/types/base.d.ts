type AccessTokenRequest = {
  idClient: string
  accessToken: string
  paramName: string
  paramValue: string
  latitude: number
  longitude: number
  sourceQuery: number
}

type AccessTokenResponse = {
  result: {
    status: number
    message: string
    messageDev: string | null
    codeResult: number
    duration: number
    idLog: string
  }
  accessToken: string
}

type ResultOperation = {
  status: number
  message: string
  messageDev: null | string
  codeResult: number
  duration: number
  idLog: string
}

type BonusData = {
  typeBonusName: string
  currentQuantity: number
  forBurningQuantity: number
  dateBurning: string
}

type BonusesRequest = {
  resultOperation: ResultOperation
  data: BonusData
}

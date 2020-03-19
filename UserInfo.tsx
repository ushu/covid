import React, { useState, useCallback, useMemo, useContext } from "react"
import { AsyncStorage } from "react-native"
import { subYears } from "date-fns"

// le "type" d'attestation: ça coche juste une case dans le doc
export type Kind = "pro" | "shopping" | "health" | "sport" | "family"

// les informations de l'utilisateur
export type UserInfo = typeof emptyUserInfo

// et les valeurs par défaut
export const emptyUserInfo = {
  firstName: "",
  lastName: "",
  street: "",
  postCode: "",
  city: "",
  birthDate: subYears(new Date(), 18),
}

// valide les champs (on pourrait utiliser qqchose comme yup mais j'ai pas le temps)
export const isValidUserInfo = (userInfo: UserInfo) => {
  return (
    Boolean(userInfo.firstName) &&
    Boolean(userInfo.lastName) &&
    Boolean(userInfo.street) &&
    Boolean(userInfo.postCode) &&
    Boolean(userInfo.city)
  )
}

//
// Persistance
//

export const persistUserInfo = (userInfo: UserInfo) => AsyncStorage.setItem("PROFILE", JSON.stringify(userInfo))

export const reloadUserInfo = async () => {
  const rawData = await AsyncStorage.getItem("PROFILE")
  if (!rawData) throw new Error("Missing PROFILE info")
  const userInfo = JSON.parse(rawData) as UserInfo
  userInfo.birthDate = new Date(userInfo.birthDate)
  return userInfo
}

//
// Le contexte 
//

type ContextValues = {
  userInfo: UserInfo
  isValid: boolean
  setUserInfo: (update: Partial<UserInfo>) => void
}
const Context = React.createContext<ContextValues>({
  userInfo: emptyUserInfo,
  isValid: false,
  setUserInfo: () => { },
})

export const useUserInfo = () => useContext(Context)
export const Provider = Context.Provider
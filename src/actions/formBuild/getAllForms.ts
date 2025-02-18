// get all forms from localstorage

import { LOCAL_STORAGE_KEY } from "../../constants/constants"
import { Form } from "../../types/Form"

export const getAllForms = () => {
  const forms = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (forms) {
    return JSON.parse(forms) as Form[]
  }
  return [] as Form[]
}
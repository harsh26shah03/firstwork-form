import { LOCAL_STORAGE_KEY } from "../../constants/constants"
import { Form } from "../../types/Form";
import { getAllForms } from "./getAllForms"

export const updateFormDetails = ({
  formId,
  key,
  value
}:{
  formId: string,
  key: keyof Form,
  value: any
}) => {
  return new Promise((resolve, reject) => {
    try {
      const forms= getAllForms()
      const form = forms.find((f) => f.id === formId) as Form

      form[key] = value

      const index = forms.findIndex((f) => f.id === form.id)

      forms[index] = form

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(forms))

      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}
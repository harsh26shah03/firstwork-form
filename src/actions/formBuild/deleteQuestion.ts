import { Form } from "@/types/Form"
import { getAllForms } from "./getAllForms"
import { LOCAL_STORAGE_KEY } from "@/constants/constants"

export const deleteQuestion = (formId: string, fieldId: string) => {
  return new Promise((resolve, reject) => {
    try {
      const forms = getAllForms()
      const form = forms.find((f) => f.id === formId) as Form

      form.fields = form.fields.filter((field) => field.id !== fieldId)

      const index = forms.findIndex((f) => f.id === form.id)

      forms[index] = form

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(forms))

      resolve(forms)
    } catch (error) {
      reject(error)
    }
  })
}
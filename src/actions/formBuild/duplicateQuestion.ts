import { LOCAL_STORAGE_KEY } from "../../constants/constants"
import { Form, FormField } from "../../types/Form";
import { getAllForms } from "./getAllForms"

export const duplicateQuestion = (formId:string, fieldId: string) => {
  return new Promise((resolve, reject) => {
    try{
      const forms = getAllForms()
      const form = forms.find((form:Form) => form.id === formId) as Form

      if(!form) {
        reject('Form not found')
      }

      const field = form.fields.find((field) => field.id === fieldId) as FormField

      if(!field) {
        reject('Field not found')
      }

      const newField = {
        ...field,
        id: crypto.randomUUID()
      }

      const index = form.fields.findIndex((field) => field.id === fieldId)

      form.fields.splice(index, 0, newField)

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(forms))

      resolve(forms)
    }
    catch(e) {
      reject(e)
    }
  })
}
import { LOCAL_STORAGE_KEY } from "../../constants/constants"
import { FieldType, Form } from "../../types/Form"
import { getAllForms } from "./getAllForms"

export const addQuestions = (formId:string) => {
  return new Promise((resolve, reject) => {
    try{
      const forms = getAllForms()
      const form = forms.find((form:Form) => form.id === formId) as Form

      if(!form) {
        reject('Form not found')
      }

      form.fields.push({
        id: crypto.randomUUID(),
        answerType: FieldType.SHORT_TEXT,
        question: 'Untitled Question',
        required: false,
        helperText: '',
      })

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(forms))

      resolve(form)
    }
    catch(e) {
      reject(e)
    }
  })
}
import { LOCAL_STORAGE_KEY } from "../../constants/constants"
import { Form, FormField, RangeField, SelectField } from "../../types/Form";
import { getAllForms } from "./getAllForms"

export const deleteError = ({
  formId,
  fieldId,
  key,
}:{
  formId: string
  fieldId: string
  key: keyof FormField | keyof SelectField | keyof RangeField
}) => {
  return new Promise((resolve, reject) => {
    try {
      const forms= getAllForms()
      const form = forms.find((f) => f.id === formId) as Form

      const updateFields = form.fields.map((field) => {
        if (field.id===fieldId) {
          delete field[key as keyof typeof field]
        }
        return field
      })

      form.fields = updateFields

      const index = forms.findIndex((f) => f.id === form.id)

      forms[index] = form

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(forms))

      resolve(form)
    } catch (error) {
      reject(error)
    }
  })
}
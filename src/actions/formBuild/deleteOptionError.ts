import { LOCAL_STORAGE_KEY } from "../../constants/constants"
import { Form, SelectField } from "../../types/Form";
import { getAllForms } from "./getAllForms"

export const deleteOptionError = ({
  formId,
  fieldId,
  idx,
}:{
  formId: string
  fieldId: string
  idx: number
}) => {
  return new Promise((resolve, reject) => {
    try {
      const forms= getAllForms()
      const form = forms.find((f) => f.id === formId) as Form

      const updateFields = form.fields.map((field) => {
        if (field.id===fieldId) {

          const newOptions = (field as SelectField).options.map((option, index) => {
            if (index === idx) {
              delete option.error_value
            }
            return option
          })


          ;(field as SelectField).options = newOptions
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
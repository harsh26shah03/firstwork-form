import { LOCAL_STORAGE_KEY } from '../../constants/constants'
import { FieldType, Form, FormField, RangeField, SelectField } from '../../types/Form'
import { getAllForms } from './getAllForms'

export const updateField = ({
  formId,
  fieldId,
  key,
  val
}: {
  formId: string
  fieldId: string
  key: keyof FormField | keyof SelectField | keyof RangeField
  val: string | boolean | { value: string }[] | number
}) => {
  return new Promise((resolve, reject) => {
    try {
      const forms = getAllForms()
      const form = forms.find((f) => f.id === formId) as Form

      const updateFields = form.fields.map((field) => {
        const updatedField = JSON.parse(JSON.stringify(field))

        if (field.id === fieldId) {
          updatedField[key] = val

          if (key === 'answerType') {

            delete updatedField?.min
            delete updatedField?.max
            delete updatedField?.options

            if (val === FieldType.SELECT || val === FieldType.MULTIPLE_CHOICE || val === FieldType.CHECKBOXES) {
              updatedField.options = [
                {
                  value: '',
                  id: crypto.randomUUID()
                }
              ]
            }

            if (val === FieldType.RANGE) {
              updatedField.min = 0
              updatedField.max = 10
            }
          }
        }
        return updatedField
      })

      form.fields = updateFields

      const index = forms.findIndex((f) => f.id === form.id)

      forms[index] = form

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(forms))

      resolve(forms)
    } catch (error) {
      reject(error)
    }
  })
}

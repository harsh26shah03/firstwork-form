import { LOCAL_STORAGE_KEY } from '@/constants/constants'
import { FieldType, Form, RangeField, SelectField } from '@/types/Form'
import { getAllForms } from './getAllForms'

export const validateForm = (form: Form) => {
  return new Promise((resolve, reject) => {
    try{
      const updatedForm = {
        ...form,
        fields: form.fields.map((field) => {
          const updatedField = {
            ...field
          }
    
          delete updatedField?.error_question
          delete updatedField?.error_answerType
          delete updatedField?.error_options
          delete updatedField?.error_min
          delete updatedField?.error_max
    
          // Validate field question
          if (!field.question) {
            updatedField.error_question = 'Question is required'
          }

          // Validate field answer type
          if (!field.answerType) {
            updatedField.error_answerType = 'Answer Type is required'
          }
    
          // Validate field answer type
          if (field.answerType === FieldType.SELECT || field.answerType === FieldType.MULTIPLE_CHOICE || field.answerType === FieldType.CHECKBOXES) {

            if((field as SelectField)?.options?.length === 0){
              updatedField.error_options = 'There should be at least one option'
            }



            (updatedField as SelectField).options = (field as SelectField).options.map((opt) => {
              const updatedOpt = {
                ...opt
              }
    
              delete updatedOpt.error_value
    
              if (!opt.value) {
                updatedOpt.error_value = 'Value is required'
              }
    
              return updatedOpt
            })
          }
    
          // Validate field range
          if ((field.answerType as FieldType) === FieldType.RANGE) {
            const min = (field as RangeField).min
            const max = (field as RangeField).max
    
            if (min === undefined || min === null) {
              updatedField.error_min = 'Min is required'
            }
    
            if (max === undefined|| min === null) {
              updatedField.error_max = 'Max is required'
            }
    
            if (min !== undefined && max !== undefined && min !== null && max !== null && min >= max) {
              updatedField.error_max = 'Max must be > min'
            }
          }
    
          return updatedField
        })
      }

      const forms = getAllForms()

      const index = forms.findIndex((f) => f.id === form.id)

      forms[index] = updatedForm

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(forms))
    
      resolve(updatedForm)
    }catch(error){
      reject(error)
    }
  })
}

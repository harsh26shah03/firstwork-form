import { LOCAL_STORAGE_KEY } from '../../constants/constants'
import { Form } from '../../types/Form'
import { getAllForms } from './getAllForms'

export const createForm = (form: Form) => {
  return new Promise((resolve, reject) => {
    try {
      const forms = getAllForms()
      forms.push(form)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(forms))
      resolve(form)
    } catch (error) {
      reject(error)
    }
  })
}

import { FillingForm, FillingFormField } from '@/types/Form'

export const validatedFilledForm = ({ fillingForm }: { fillingForm: FillingForm }) => {
  return new Promise<FillingForm>((resolve, reject) => {
    try {
      const answersFields = fillingForm.answers

      const validatedFilledForm = answersFields.map((answersField) => {
        const updatedAnswersField = {
          ...answersField
        }

        const answer = answersField.answer as string[] | string

        const isRequired = answersField.required

        if (isRequired && (answer === null || answer === undefined || answer === '' || answer.length === 0)) {
          updatedAnswersField.error = 'This field is required'
        }
        return updatedAnswersField
      })

      resolve({
        ...fillingForm,
        answers: validatedFilledForm as FillingFormField[]
      })
    } catch (e) {
      reject(e)
    }
  })
}

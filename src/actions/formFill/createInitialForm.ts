import { FieldType, FillingForm, FillingFormField, Form, RangeField, SelectField } from '@/types/Form'

export const createInitialForm = (form: Form) => {
  return new Promise<FillingForm>((resolve, reject) => {
    try {
      const answers: FillingFormField[] = form.fields.map((question) => {
        return {
          id: question.id,
          question: question.question,
          answer: question?.answerType === FieldType.CHECKBOXES ? [] : '',
          required: question.required,
          ...(question?.answerType === FieldType.SELECT ||
          question?.answerType === FieldType.MULTIPLE_CHOICE ||
          question?.answerType === FieldType.CHECKBOXES
            ? { options: (question as SelectField).options }
            : {}),
          ...((question as RangeField)?.answerType === FieldType.RANGE
            ? { min: (question as RangeField).min, max: (question as RangeField).max }
            : {})
        }
      })

      const fillingForm: FillingForm = {
        id: crypto.randomUUID(),
        formId: form.id,
        answers: answers
      }

      resolve(fillingForm)
    } catch (e) {
      reject(e)
    }
  })
}

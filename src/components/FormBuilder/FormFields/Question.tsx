import { useState } from 'react'
import { useGlobalState } from '../../../hooks/useGlobalState'
import { Form, FormField } from '../../../types/Form'
import { updateField } from '../../../actions/formBuild/updateField'
import { twMerge } from 'tailwind-merge'
import { deleteError } from '@/actions/formBuild/deleteError'
import { actions } from '@/store/actions'

const Question = ({ fieldId, formId }: { fieldId: string; formId: string }) => {
  const {
    dispatch,
    state: { forms }
  } = useGlobalState()

  const form = forms.find((form) => form.id === formId) as Form

  const field = form?.fields.find((field) => field.id === fieldId) as FormField

  const [localQuestion, setLocalQuestion] = useState(field?.question || '')
  const [localHelperText, setLocalHelperText] = useState(field?.helperText || '')

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between w-full">
        <label className="text-sm font-bold">Question: <span  className="text-red-500">*</span> </label>
        {field?.error_question && <span className="text-red-500 text-xs">{field.error_question}</span>}
      </div>
      <input
        className={twMerge('w-full ', field?.error_question && 'border-red-500')}
        onBlur={() => {
          updateField({
            formId,
            fieldId,
            key: 'question',
            val: localQuestion
          }).then((forms) => {
            dispatch({
              type: actions.SET_FORMS,
              payload: forms
            })
          })
        }}
        value={localQuestion}
        onChange={(e) => {
          setLocalQuestion(e.target.value)
          deleteError({ formId, fieldId, key: 'error_question' }).then((form)=>{
            dispatch({
              type: actions.SET_FORM,
              payload: form as Form
            })
          })
        }}
      />

      <label className="text-sm font-bold w-full">Helper Text: </label>
      <input
        className="w-full "
        onBlur={() => {
          updateField({
            formId,
            fieldId,
            key: 'helperText',
            val: localHelperText
          }).then((forms) => {
            dispatch({
              type: actions.SET_FORMS,
              payload: forms
            })
          })
        }}
        value={localHelperText}
        onChange={(e) => {
          setLocalHelperText(e.target.value)
        }}
      />
    </div>
  )
}

export default Question

import { deleteError } from '@/actions/formBuild/deleteError'
import { updateField } from '@/actions/formBuild/updateField'
import { useGlobalState } from '@/hooks/useGlobalState'
import { actions } from '@/store/actions'
import { Form, RangeField as RangeFieldType } from '@/types/Form'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const RangeField = ({ fieldId, formId }: { fieldId: string; formId: string }) => {
  const {
    state: { forms },
    dispatch
  } = useGlobalState()

  const form = forms.find((form) => form.id === formId) as Form

  const field = form?.fields.find((field) => field.id === fieldId) as RangeFieldType

  const [localMin, setLocalMin] = useState(field?.min)
  const [localMax, setLocalMax] = useState(field?.max)

  useEffect(()=>{
    setLocalMin(field?.min)
  },[field?.min])

  useEffect(()=>{
    setLocalMax(field?.max)
  },[field?.max])

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold">Min: <span  className="text-red-500">*</span></span>
        <input
          className={twMerge(' w-[8rem]', field?.error_min && 'border-red-500')}
          value={localMin}
          onChange={(e) => {
            setLocalMin(Number(e.target.value))
            deleteError({ formId, fieldId, key: 'error_min' }).then((form) => {
              dispatch({
                type: actions.SET_FORM,
                payload: form as Form
              })
            })
          }}
          type="number"
          onBlur={() => {
            updateField({
              formId,
              fieldId,
              key: 'min',
              val: localMin
            }).then((forms) => {
              dispatch({
                type: actions.SET_FORMS,
                payload: forms
              })
              setLocalMin(localMin)
            })
          }}
        />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-bold">Max: <span  className="text-red-500">*</span></span>
        <input
          className={twMerge(' w-[8rem]', field?.error_max && 'border-red-500')}
          value={localMax}
          onChange={(e) => {
            setLocalMax(Number(e.target.value))
            deleteError({ formId, fieldId, key: 'error_max' }).then((form) => {
              dispatch({
                type: actions.SET_FORM,
                payload: form as Form
              })
            })
          }}
          type="number"
          onBlur={() => {
            updateField({
              formId,
              fieldId,
              key: 'max',
              val: localMax
            }).then((forms) => {
              dispatch({
                type: actions.SET_FORMS,
                payload: forms
              })
              setLocalMax(localMax)
            })
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        {field?.error_min && <span className="text-red-500 text-xs">{field.error_min}</span>}
        {field?.error_max && <span className="text-red-500 text-xs">{field.error_max}</span>}
      </div>
    </div>
  )
}

export default RangeField

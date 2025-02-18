import { useState } from 'react'
import { updateField } from '../../../actions/formBuild/updateField'
import { useGlobalState } from '../../../hooks/useGlobalState'
import { FieldType, Form, FormField } from '../../../types/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { actions } from '@/store/actions'
import { twMerge } from 'tailwind-merge'


const FieldSelection = ({ fieldId, formId }: { fieldId: string; formId: string }) => {
  const {
    dispatch,
    state: { forms }
  } = useGlobalState()

  const form = forms.find((form) => form.id === formId) as Form

  const field = form?.fields.find((field) => field.id === fieldId) as FormField

  const [fieldType, setFieldType] = useState<FieldType>(field?.answerType)

  return (
    <div className="w-full flex gap-2">
      <div className="w-[80%] flex flex-col gap-2">
        <div className="flex items-center justify-between w-full">
          <label className="text-sm font-bold">
            Answer Type: <span className="text-red-500">*</span>
          </label>
          {field?.error_answerType && <span className="text-red-500 text-xs">{field.error_answerType}</span>}
        </div>
        <Select
          // defaultValue={fieldType}
          value={fieldType}
          onValueChange={(value) => {
            updateField({
              formId,
              fieldId,
              key: 'answerType',
              val: value
            }).then((forms) => {
              dispatch({
                type: actions.SET_FORMS,
                payload: forms
              })
              setFieldType(value as FieldType)
            })
          }}
        >
          <SelectTrigger className={twMerge('w-full rounded-xs', field?.error_answerType && 'border-red-500')}>
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent className="w-full rounded-xs">
            {[
              { value: FieldType.SHORT_TEXT, label: 'Short Text' },
              { value: FieldType.LONG_TEXT, label: 'Long Text' },
              { value: FieldType.NUMBER, label: 'Number' },
              { value: FieldType.DATE, label: 'Date' },
              { value: FieldType.SELECT, label: 'Select' },
              { value: FieldType.MULTIPLE_CHOICE, label: 'Multiple Choice' },
              { value: FieldType.CHECKBOXES, label: 'Checkbox' },
              { value: FieldType.RANGE, label: 'Range' }
            ].map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <label className="text-sm font-bold w-full">Required: </label>

        <input
          type="checkbox"
          checked={field?.required}
          onChange={(e) => {
            updateField({
              formId,
              fieldId,
              key: 'required',
              val: e.target.checked
            }).then((forms) => {
              dispatch({
                type: actions.SET_FORMS,
                payload: forms
              })
            })
          }}
          className="flex-grow h-[1rem] w-[1rem]"
        />
      </div>
    </div>
  )
}

export default FieldSelection

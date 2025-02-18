import { deleteError } from '@/actions/formBuild/deleteError'
import { deleteOptionError } from '@/actions/formBuild/deleteOptionError'
import { updateField } from '@/actions/formBuild/updateField'
import { Button } from '@/components/ui/button'
import { useGlobalState } from '@/hooks/useGlobalState'
import { actions } from '@/store/actions'
import { Form, OptionsType, SelectField } from '@/types/Form'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const OptionsMaker = ({ fieldId, formId }: { fieldId: string; formId: string }) => {
  const {
    state: { forms },
    dispatch
  } = useGlobalState()

  const form = forms.find((form) => form.id === formId) as Form

  const field = form?.fields.find((field) => field.id === fieldId) as SelectField

  const [localOptions, setLocalOptions] = useState(field?.options || [])

  // console.log('localOptions', localOptions)
  // console.log('field', field.options)

  useEffect(() => {
    setLocalOptions((prevOptions) => {
      const newOptions = [...prevOptions]
      newOptions.forEach((option) => {
        const updatedField = field.options.find((o) => o.id === option.id)

        if (updatedField?.error_value) {
          option.error_value = updatedField.error_value
        }
      })
      return newOptions
    })
  }, [field.options])

  const updateOptions = (options: OptionsType[]) => {
    updateField({
      formId,
      fieldId,
      key: 'options',
      val: options
    }).then((forms) => {
      dispatch({
        type: actions.SET_FORMS,
        payload: forms
      })
      setLocalOptions(options)
    })
  }

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center gap-4">
        <Button
          className="w-[8rem]"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            const newOption = { value: '', id: crypto.randomUUID() }
            updateOptions([...localOptions, newOption])
            deleteError({ formId, fieldId, key: 'error_options' }).then((form) => {
              dispatch({
                type: actions.SET_FORM,
                payload: form as Form
              })
            })
          }}
        >
          Add Option
        </Button>

        {field.error_options && <span className="text-red-500 text-xs">{field.error_options}</span>}
      </div>
      {localOptions?.map((option, idx) => (
        <div className="flex items-center gap-4" key={option.id}>
          <span className="text-sm font-bold">Option: {idx + 1} <span  className="text-red-500">*</span></span>
          <input
            className={twMerge(' w-[8rem]', option?.error_value && 'border-red-500')}
            value={option.value}
            onChange={(e) => {
              const newOptions = [...localOptions]
              delete newOptions[idx].error_value
              newOptions[idx].value = e.target.value
              setLocalOptions(newOptions)
              deleteOptionError({ formId, fieldId, idx }).then((form) => {
                dispatch({
                  type: actions.SET_FORM,
                  payload: form as Form
                })
              })
            }}
            onBlur={() => {
              updateOptions(localOptions)
            }}
          />
          <Button
            variant={'link'}
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              const newOptions = [...localOptions]
              newOptions.splice(idx, 1)
              updateOptions(newOptions)
            }}
          >
            <X />
          </Button>
          {option?.error_value && <span className="text-red-500 text-xs">{option.error_value}</span>}
        </div>
      ))}
    </div>
  )
}

export default OptionsMaker

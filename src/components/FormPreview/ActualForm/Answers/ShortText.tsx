import { FillingFormField } from '@/types/Form'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

const ShortText = ({
  onUpdate,
  answerField,
  removeError
}: {
  onUpdate: (value: string) => void
  answerField: FillingFormField
  removeError: () => void
}) => {
  const [value, setValue] = useState(answerField?.answer as string)

  return (
    <input
      className={twMerge('border border-gray-300 rounded-md p-2', answerField?.error && 'border-red-500')}
      type="text"
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        removeError()
      }}
      onBlur={() => {
        onUpdate(value)
      }}
    ></input>
  )
}

export default ShortText

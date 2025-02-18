import { FillingFormField } from '@/types/Form'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

const LongText = ({
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
    <textarea
      className={twMerge('border border-gray-300 rounded-md p-2', answerField?.error && 'border-red-500')}
      rows={4}
      onBlur={() => {
        onUpdate(value)
      }}
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        removeError()
      }}
    ></textarea>
  )
}

export default LongText

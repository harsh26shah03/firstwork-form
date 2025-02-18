import { FillingFormField } from '@/types/Form'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

const Number = ({
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
      className={twMerge('border border-gray-300 rounded-md p-2 w-[60%]', answerField?.error && 'border-red-500')}
      type="number"
      value={value}
      onChange={(e) => {
        console.log(e.target.value)
        setValue(e.target.value)
        removeError()
      }}
      onBlur={() => {
        console.log(value)
        onUpdate(value)
      }}
    ></input>
  )
}

export default Number

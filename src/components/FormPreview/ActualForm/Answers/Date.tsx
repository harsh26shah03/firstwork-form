import { FillingFormField } from '@/types/Form'
import { twMerge } from 'tailwind-merge'

const Date = ({ onUpdate, answerField }: { onUpdate: (value: string) => void; answerField: FillingFormField }) => {
  return (
    <input
      className={twMerge('border border-gray-300 rounded-md p-2', answerField?.error && 'border-red-500')}
      type="date"
      value={answerField?.answer as string}
      onChange={(e) => onUpdate(e.target.value)}
    ></input>
  )
}

export default Date

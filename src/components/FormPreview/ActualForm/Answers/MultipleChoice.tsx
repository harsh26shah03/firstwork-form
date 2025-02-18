import { FillingFormField } from '@/types/Form'

const MultipleChoice = ({ onUpdate, answerField }: { onUpdate: (value: string) => void, answerField: FillingFormField }) => {
  return (
    <div className='w-full flex flex-col gap-2' >
      {answerField?.options?.map((option) => (
        <div key={option.value} className='flex items-center gap-2'>
          <input
            type='radio'
            id={option.value}
            name={answerField.id}
            value={option.value}
            checked={answerField.answer === option.value}
            onChange={(e) => onUpdate(e.target.value)}
          />
          <label htmlFor={option.value}>{option.value}</label>
        </div>
      ))}
    </div>
  )
}

export default MultipleChoice
import { FillingFormField } from '@/types/Form'

const Checkboxes = ({ onUpdate, answerField }: { onUpdate: (value: string[]) => void; answerField: FillingFormField }) => {
  return (
    <div className="flex flex-col gap-2">
      {answerField?.options?.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <input
            type="checkbox"
            id={option.value}
            name={answerField.id}
            value={option.value}
            checked={answerField.answer.includes(option.value)}
            onChange={(e) => {
              const checked = e.target.checked
              if (checked) {
                const updatedAnswers = new Set([...((answerField?.answer as string[])?.map((op) => op) as string[]), e.target.value])
                onUpdate(Array.from(updatedAnswers))
              } else {
                const updatedAnswers = new Set([
                  ...((answerField?.answer as string[])?.map((op) => op) as string[]).filter((op) => op !== e.target.value)
                ])
                onUpdate(Array.from(updatedAnswers))
              }
            }}
          />
          <label htmlFor={option.value}>{option.value}</label>
        </div>
      ))}
    </div>
  )
}

export default Checkboxes

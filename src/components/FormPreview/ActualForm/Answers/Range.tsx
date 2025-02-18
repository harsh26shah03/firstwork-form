import { FillingFormField } from '@/types/Form'

const Range = ({ onUpdate, answerField }: { onUpdate: (value: string) => void; answerField: FillingFormField }) => {

  return (
    <div className='flex flex-col gap-2 w-[60%]' >
      <input
      className="text-foreground w-full !p-0"
      type="range"
      value={answerField?.answer}
      onChange={(e) => onUpdate(e.target.value)}
      min={answerField?.min}
      max={answerField?.max}
    ></input>
    <div className='w-full flex items-center justify-between' >
    <span>{answerField?.min}</span>
    <span>{answerField?.max}</span>
    </div>
    </div>
  )
}

export default Range

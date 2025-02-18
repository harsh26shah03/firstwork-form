import { FillingFormField } from '@/types/Form'
import { twMerge } from 'tailwind-merge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const SelectField = ({ onUpdate, answerField }: { onUpdate: (value: string) => void; answerField: FillingFormField }) => {
  return (
    <Select
      value={answerField?.answer as string}
      onValueChange={(value) => {
        onUpdate(value)
      }}
    >
      <SelectTrigger className={twMerge('w-full rounded-xs', answerField?.error && 'border-red-500')}>
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent className="w-full rounded-xs">
        {answerField?.options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectField

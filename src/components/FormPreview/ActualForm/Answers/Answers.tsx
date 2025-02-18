import { FieldType, FillingFormField } from '@/types/Form'
import ShortText from './ShortText'
import LongText from './LongText'
import Date from './Date'
import SelectField from './SelectField'
import MultipleChoice from './MultipleChoice'
import Checkboxes from './Checkboxes'
import Number from './Number'
import Range from './Range'

const Answers = ({
  answerType,
  onUpdate,
  answerField,
  removeError
}:{
  answerType: FieldType,
  onUpdate: (value: string | string[]) => void,
  answerField: FillingFormField,
  removeError: () => void
}) => {
  
  switch (answerType) {
    case FieldType.SHORT_TEXT:
      return <ShortText onUpdate={onUpdate} answerField={answerField} removeError={removeError}/>
    case FieldType.LONG_TEXT:
      return <LongText onUpdate={onUpdate} answerField={answerField} removeError={removeError}/>
    case FieldType.DATE:
      return <Date onUpdate={onUpdate} answerField={answerField}/>
    case FieldType.SELECT:
      return <SelectField onUpdate={onUpdate} answerField={answerField}/>
    case FieldType.MULTIPLE_CHOICE:
      return <MultipleChoice onUpdate={onUpdate} answerField={answerField}/>
    case FieldType.CHECKBOXES:
      return <Checkboxes onUpdate={onUpdate} answerField={answerField}/>
    case FieldType.NUMBER:
      return <Number onUpdate={onUpdate} answerField={answerField} removeError={removeError}/>
    case FieldType.RANGE:
      return <Range onUpdate={onUpdate} answerField={answerField}/>
    default:
      return null
  }
}

export default Answers
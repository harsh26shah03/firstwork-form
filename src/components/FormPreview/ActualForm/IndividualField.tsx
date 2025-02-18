import { actions } from '@/store/actions'
import Answers from './Answers/Answers'
import Question from './Question'
import { FillingFormField, FormField } from '@/types/Form'
import { useGlobalState } from '@/hooks/useGlobalState'

const IndividualField = ({ field, idx, answerField }: { field: FormField; idx: number; answerField: FillingFormField }) => {
  const { dispatch } = useGlobalState()

  return (
    answerField ? <div className="flex flex-col gap-6 border-b py-6">
      <Question question={field.question} helperText={field.helperText} required={field.required} idx={idx} error={answerField.error} />
      <Answers
        answerType={field.answerType}
        onUpdate={(value: string | string[]) => {
          dispatch({ type: actions.UPDATE_ANSWER, payload: { id: field.id, value } })
        }}
        removeError={()=>{
          dispatch({ type: actions.UPDATE_ANSWER, payload: { id: field.id } })
        }}
        answerField={answerField}
      />
    </div> : null
  )
}

export default IndividualField

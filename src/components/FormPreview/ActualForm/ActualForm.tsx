import { FillingForm, FillingFormField, Form } from "@/types/Form"
import IndividualField from "./IndividualField"

const ActualForm = ({
  form,
  fillingForm
}:{
  form:Form,
  fillingForm: FillingForm | null
}) => {

  return (
    <form className="flex flex-col w-full gap-6" >
      {form.fields.map((field, idx) => {

        const answerField = fillingForm?.answers.find((answer) => answer.id === field.id) as FillingFormField

        return (
          <IndividualField field={field} key={field.id} idx={idx} answerField={answerField} />
        )
      })}
    </form>
  )
}

export default ActualForm
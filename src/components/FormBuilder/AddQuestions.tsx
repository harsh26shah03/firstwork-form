import { PlusIcon } from "lucide-react"
import { addQuestions } from "../../actions/formBuild/addQuestions"
import { useGlobalState } from "../../hooks/useGlobalState"
import { actions } from "../../store/actions"
import { Form } from "../../types/Form"
import { Button } from "../ui/button"

const AddQuestions = ({
  formId
}:{
  formId: string
}) => {

  const { dispatch } = useGlobalState()

  return (
    <Button className="w-full"
    onClick={() => {
      addQuestions(formId).then((form) => {
        dispatch({ type: actions.SET_FORM, payload: form as Form})
      })
    }}
    >
      <div className="flex items-center gap-6 w-full justify-center" >
        <PlusIcon size={16} />
        <span>Add Question</span>
      </div>
    </Button>
  )
}

export default AddQuestions
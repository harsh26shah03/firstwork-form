import { updateFormDetails } from "@/actions/formBuild/updateFormDetails";
import { useGlobalState } from "@/hooks/useGlobalState"
import { actions } from "@/store/actions"
import { useState } from "react"

const FormTitle = ({
  title,
  formId
}: {
  title: string,
  formId: string
}) => {

  const [localTitle, setLocalTitle] = useState<string>(title || '')


  const {
    dispatch,
  } = useGlobalState()

  return (
    <div className="flex gap-4 items-center">
      <span className="text-sm font-bold">Title:</span>
      <input
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        onBlur={() => {
          updateFormDetails({
            formId,
            key: 'title',
            value: localTitle
          }).then(() => {
            dispatch({
              type: actions.SET_TITLE,
              payload: {
                formId,
                title: localTitle
              }
            })
          })
        }}
        className=" w-full"
      />
    </div>
  )
}

export default FormTitle
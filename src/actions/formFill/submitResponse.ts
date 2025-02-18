import { LOCAL_STORAGE_RESPONSES_KEY } from "@/constants/constants";
import { FillingForm } from "@/types/Form";

export const submitResponse = ({ fillingForm }: { fillingForm: FillingForm }) => {
  const allResponses = localStorage.getItem(LOCAL_STORAGE_RESPONSES_KEY) || '{}'

  const responses = JSON.parse(allResponses as string)


  if(!responses[fillingForm.formId]){
    responses[fillingForm.formId] = []
  }

  if(responses[fillingForm.formId]){
    responses[fillingForm.formId].push(fillingForm)
  }

  localStorage.setItem(LOCAL_STORAGE_RESPONSES_KEY, JSON.stringify(responses))
}
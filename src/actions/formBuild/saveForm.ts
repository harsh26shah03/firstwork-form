import { toast } from "sonner";
import { LOCAL_STORAGE_KEY } from "../../constants/constants";
import { Form } from "../../types/Form";
import { getAllForms } from "./getAllForms";

export const saveForm = (form: Form) => {
  const forms = getAllForms()
  const index = forms.findIndex((f:Form) => f.id === form.id)
  forms[index] = form
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(forms))
  toast.success('Form Saved')
}
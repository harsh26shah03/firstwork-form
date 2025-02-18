import { getAllForms } from "../actions/formBuild/getAllForms";
import { FillingForm, Form } from "../types/Form";

const initialState: {
  forms: Form[],
  fillingForm: FillingForm | null
} = {
  forms: getAllForms(),
  fillingForm: null
}

export { initialState }
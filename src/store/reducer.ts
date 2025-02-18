import { FillingForm, Form } from "../types/Form"

interface State {
  forms: Form[]
  fillingForm: FillingForm | null
}

export interface Action {
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CREATE_FORM':
      return {
        ...state,
        forms: [...state.forms, (action.payload as Form)]
      }
    case 'SET_FORMS':
      return {
        ...state,
        forms: (action?.payload || []) as Form[]
      }
    case 'SET_FORM': {
      const form = action.payload as Form
      return {
        ...state,
        forms: state.forms.map((f) => {
          if (f.id === form.id) {
            return form
          }
          return f
        })
      }
    }
    case 'SET_FIELDS':{
      const { formId, fieldId, key, val } = action.payload
      return {
        ...state,
        forms: state.forms.map((form) => {
          if (form.id === formId) {
            return {
              ...form,
              fields: form.fields.map((field) => {
                if (field.id === fieldId) {
                  return {
                    ...field,
                    [key]: val
                  }
                }
                return field
              })
            }
          }
          return form

        })
      }}
    case 'SET_TITLE': {
      const { formId, title } = action.payload
      return {
        ...state,
        forms: state.forms.map((form) => {
          if (form.id === formId) {
            return {
              ...form,
              title
            }
          }
          return form
        })
      }
    }


    case 'SET_FILLING_FORM':
      return {
        ...state,
        fillingForm: action.payload
      }
    case 'UPDATE_ANSWER': {
      const { id, value } = action.payload
      return {
        ...state,
        fillingForm: {
          ...state?.fillingForm,
          answers: state?.fillingForm?.answers.map((a) => {
            if (a.id === id) {
              delete a?.error
              return {
                ...a,
                answer:value
              }
            }
            return a
          })
        }
      }
    }
    case 'REMOVE_ERROR': {
      const { id } = action.payload
      return {
        ...state,
        fillingForm: {
          ...state?.fillingForm,
          answers: state?.fillingForm?.answers.map((a) => {
            if (a.id === id) {
              delete a?.error
              return a
            }
            return a
          })
        }
      }
    }
    default:
      return state
  }
}

export { reducer }
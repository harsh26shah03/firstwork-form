import { useNavigate, useParams } from 'react-router'
import { useGlobalState } from '../../hooks/useGlobalState'
import { FieldType, Form, FormStatus, SelectField } from '../../types/Form'
import AddQuestions from './AddQuestions'
import Question from './FormFields/Question'
import { saveForm } from '../../actions/formBuild/saveForm'
import FieldSelection from './FormFields/FieldSelection'
import OptionsMaker from './FormFields/OptionsMaker'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '../ui/button'
import FormTitle from './FormFields/FormTitle'
import RangeField from './FormFields/RangeField'
import { BugIcon, ChevronLeft, Copy, Trash2 } from 'lucide-react'
import { deleteQuestion } from '@/actions/formBuild/deleteQuestion'
import { duplicateQuestion } from '@/actions/formBuild/duplicateQuestion'
import { actions } from '@/store/actions'
import { validateForm } from '@/actions/formBuild/validateForm'
import { toast, Toaster } from 'sonner'
import { createInitialForm } from '@/actions/formFill/createInitialForm'
import { updateFormDetails } from '@/actions/formBuild/updateFormDetails'

const FormBuilder = () => {
  const { formId } = useParams()
  const navigate = useNavigate()

  const {
    state: { forms },
    dispatch
  } = useGlobalState()

  const form = forms.find((form) => form.id === formId) as Form

  if (!form) {
    navigate('/')
  }

  const showOptions = (fieldType: FieldType) => {
    return fieldType === FieldType.SELECT || fieldType === FieldType.MULTIPLE_CHOICE || fieldType === FieldType.CHECKBOXES
  }

  return formId && form ? (
    <div className="flex flex-col w-full gap-6 max-w-xl">
      <Toaster />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              navigate('/')
            }}
            variant="link"
            className=""
          >
            <ChevronLeft size={16} />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-yellow-500">{form.status}</span>

          {form.status === FormStatus.DRAFT && (
            <Button
              onClick={() => {
                validateForm(form).then((validatedForm) => {
                  const hasError = (validatedForm as Form).fields.some((field) => {
                    return (
                      Object.keys(field)?.some((key) => key.startsWith('error')) ||
                      (field as SelectField)?.options?.find((keys) => keys.error_value) ||
                      false
                    )
                  })

                  if (hasError) {
                    toast.error('Please fix the errors before publishing')
                  }

                  if (!hasError) {
                    ;(validatedForm as Form).status = FormStatus.PUBLISHED

                    updateFormDetails({
                      formId,
                      key: 'status',
                      value: FormStatus.PUBLISHED
                    })
                  }

                  dispatch({ type: actions.SET_FORM, payload: validatedForm })
                })
              }}
              className=""
              variant={'outline'}
            >
              Publish
            </Button>
          )}

          {form.status === FormStatus.PUBLISHED && (
            <Button
              onClick={() => {
                ;(form as Form).status = FormStatus.DRAFT
                dispatch({ type: actions.SET_FORM, payload: form })
              }}
              className=""
              variant={'outline'}
            >
              Unpublish
            </Button>
          )}

          {form.status === FormStatus.PUBLISHED && (
            <Button
              onClick={() => {
                createInitialForm(form).then((filledForm) => {
                  dispatch({ type: actions.SET_FILLING_FORM, payload: filledForm })
                  navigate(`/preview/${formId}`)
                })
              }}
              className=""
            >
              Preview
            </Button>
          )}
        </div>
      </div>

      <FormTitle formId={formId} title={form?.title} />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          saveForm(form)
        }}
        className="flex flex-col gap-2"
      >
        {form.fields.map((field, idx) => {
          let otherError = Object.keys(field)?.some((key) => key.startsWith('error')) || false
          let optionsError = (field as SelectField)?.options?.find((keys) => keys.error_value) || false

          const hasError = !!optionsError || otherError

          return (
            <Accordion type="single" collapsible key={field.id}>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex items-center">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <span>
                        Question {idx + 1}: {field.question}
                      </span>
                      {hasError && <BugIcon size={16} color="red" fill="red" />}
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          deleteQuestion(formId, field.id).then((forms) => {
                            dispatch({ type: actions.SET_FORMS, payload: forms })
                          })
                        }}
                        className="cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          duplicateQuestion(formId, field.id).then((forms) => {
                            dispatch({ type: actions.SET_FORMS, payload: forms })
                          })
                        }}
                        className="cursor-pointer"
                      >
                        <Copy size={16} />
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col border rounded-xs p-6 gap-6">
                    <Question fieldId={field.id} formId={formId} />
                    <FieldSelection fieldId={field.id} formId={formId} />
                    {showOptions(field.answerType) && <OptionsMaker fieldId={field.id} formId={formId} />}
                    {(field.answerType as FieldType) === FieldType.RANGE && <RangeField fieldId={field.id} formId={formId} />}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        })}
        <Button type="submit" className="mt-4">
          Save
        </Button>
      </form>
      <AddQuestions formId={formId} />
    </div>
  ) : null
}

export default FormBuilder

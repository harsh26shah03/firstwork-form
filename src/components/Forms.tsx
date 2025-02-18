import { createForm } from '../actions/formBuild/createForm'
import { Form, FormStatus } from '../types/Form'
import { useGlobalState } from '../hooks/useGlobalState'
import { actions } from '../store/actions'
import { getAllForms } from '../actions/formBuild/getAllForms'
import { useNavigate } from 'react-router'

import { BookCheck, PlusIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { Toaster } from './ui/sonner'

function Forms() {
  const { state, dispatch } = useGlobalState()
  const navigate = useNavigate()

  const { forms } = state

  return (
    <div className="flex flex-col p-10 gap-10">
      <Toaster />
      <div className="flex flex-col gap-2">
        <h1 className="font-bold flex flex-row items-center gap-2">
          <BookCheck size={24} /> Formbuilder
        </h1>
        <span className="text-xs">(click on + to create a new one)</span>
      </div>

      <div className="flex gap-6 flex-wrap">
        <Button
          className="h-24 w-24 flex items-center justify-center"
          onClick={() => {
            createForm({
              id: crypto.randomUUID(),
              title: 'Form 1',
              fields: [],
              status: FormStatus.DRAFT
            }).then(() => {
              dispatch({ type: actions.SET_FORMS, payload: getAllForms() })
              toast.success('Form Created')
            })
          }}
        >
          <PlusIcon size={24} />
        </Button>

        {forms.map((form: Form) => (
          <Button
            key={form.id}
            onClick={() => {
              navigate(`edit/${form.id}`)
            }}
            className="h-24 w-24 line-clamp-1"
          >
            {form.title}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Forms

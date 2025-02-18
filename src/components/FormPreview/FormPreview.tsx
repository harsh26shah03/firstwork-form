import { useGlobalState } from '@/hooks/useGlobalState'
import { Form } from '@/types/Form'
import { useNavigate, useParams } from 'react-router'
import { Toaster } from 'sonner'
import ActualForm from './ActualForm/ActualForm'
import TopBar from './ActualForm/TopBar'
import FormTitle from './ActualForm/FormTitle'
import { useEffect } from 'react'
import { createInitialForm } from '@/actions/formFill/createInitialForm'

const FormPreview = () => {
  const { formId } = useParams()

  const navigate = useNavigate()

  const {
    state: { forms, fillingForm },
    dispatch
  } = useGlobalState()

  useEffect(()=>{
    const form = forms.find((form) => form.id === formId) as Form

    if(!fillingForm && form){
      createInitialForm(form).then((fillingForm) => {
        dispatch({
          type: 'SET_FILLING_FORM',
          payload: fillingForm
        })
      })
    }
  },[])

  console.log(fillingForm)

  const form = forms.find((form) => form.id === formId) as Form

  if (!form) {
    navigate('/')
  }
  return formId && form ? (
    <div className="flex flex-col w-full gap-6 max-w-xl">
      <Toaster />
      <TopBar/>
      <FormTitle title={form.title} />
      <ActualForm form={form} fillingForm={fillingForm} />
    </div>
  ) : null
}

export default FormPreview

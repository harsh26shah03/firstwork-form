import { submitResponse } from '@/actions/formFill/submitResponse'
import { validatedFilledForm } from '@/actions/formFill/validatedFilledForm'
import { Button } from '@/components/ui/button'
import { useGlobalState } from '@/hooks/useGlobalState'
import { actions } from '@/store/actions'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

const TopBar = () => {
  const navigate = useNavigate()

  const {
    dispatch,
    state: { fillingForm }
  } = useGlobalState()

  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={() => {
          navigate('/')
        }}
        variant="link"
        className=""
      >
        <ChevronLeft size={16} />
      </Button>

      <Button
        onClick={() => {
          if (fillingForm) {
            validatedFilledForm({ fillingForm }).then((validatedForm) => {
              dispatch({
                type: actions.SET_FILLING_FORM,
                payload: validatedForm
              })

              const hasErrors = Object.values(validatedForm.answers).some((field) => field.error)

              if (!hasErrors) {
                submitResponse({
                  fillingForm: validatedForm
                })
                dispatch({
                  type: actions.SET_FILLING_FORM,
                  payload: null
                })
                navigate(`/preview/${fillingForm.formId}/success`)
                toast.success('Form submitted successfully')
              }
            })
          }
        }}
        className=""
      >
        Submit
      </Button>
    </div>
  )
}

export default TopBar

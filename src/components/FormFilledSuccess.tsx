import { Button } from './ui/button'
import { useNavigate } from 'react-router'

const FormFilledSuccess = () => {
  const navigate = useNavigate()

  return (
    <div className='h-screen w-full'>
      <div className='flex flex-col items-center justify-center h-full w-full'>
        <h1 className='text-4xl font-bold'>Form Filled Successfully</h1>
        <p className='text-lg'>Thank you for filling the form</p>
        <Button onClick={() => {
          navigate('/')
        }} className='mt-4'>
          Go back to home
        </Button>
      </div>
    </div>
  )
}

export default FormFilledSuccess
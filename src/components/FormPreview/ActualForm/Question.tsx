const Question = ({
  question,
  helperText,
  required,
  idx,
  error
}: {
  question: string
  helperText?: string
  required: boolean
  idx: number
  error?: string
}) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center justify-between">
        <span className="text-sm font-bold">
          Question {idx + 1}: {question} {required && <span className="text-red-500">*</span>}
        </span>
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
      <span className="text-xs text-gray-500">{helperText}</span>
    </div>
  )
}

export default Question

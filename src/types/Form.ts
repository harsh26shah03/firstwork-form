export enum FieldType {
  SHORT_TEXT = 'SHORT_TEXT',
  LONG_TEXT = 'LONG_TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  SELECT = 'SELECT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  CHECKBOXES = 'CHECKBOXES',
  RANGE = 'RANGE'
}

export enum FormStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = "PUBLISHED"
}

export interface Field {
  id: string
  question: string
  required: boolean
  helperText?: string

  // Errors

  error_question?: string
  error_answerType?: string
  error_options?: string
  error_min?: string
  error_max?: string
}

export interface TextField extends Field {
  answerType: FieldType.SHORT_TEXT | FieldType.LONG_TEXT
}

export interface NumberField extends Field {
  answerType: FieldType.NUMBER
}

export interface DateField extends Field {
  answerType: FieldType.DATE
}

export interface OptionsType {
  value: string
  error_value?: string
  id: string
}

export interface SelectField extends Field {
  answerType: FieldType.SELECT
  options: OptionsType[]
}

export interface MultipleChoiceField extends Field {
  answerType: FieldType.MULTIPLE_CHOICE
  options: OptionsType[]

}

export interface CheckboxesField extends Field {
  answerType: FieldType.CHECKBOXES
  options: OptionsType[]

}

export interface RangeField extends Field {
  answerType: FieldType.RANGE
  min: number
  max: number
}

export type FormField = TextField | NumberField | DateField | SelectField | MultipleChoiceField | CheckboxesField | RangeField

export type Form = {
  id: string
  title: string
  fields: FormField[]
  status: FormStatus
}

export type FillingFormField = {
  id: string
  question: string
  required: boolean
  answer: string | string[]
  error?: string
  options?: OptionsType[]
  min?: number
  max?: number
}

export type FillingForm = {
  id: string
  formId: string
  answers: FillingFormField[]
}
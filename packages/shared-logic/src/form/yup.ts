import * as Yup from 'yup'

Yup.setLocale({
  mixed: {
    default: () => 'Invalid',
    required: 'Required'
  },
  number: {
    max: params => `Can not be greater than ${params.max}`,
    min: params => `Can not be lower than ${params.min}`
  },
  string: {
    email: 'Invalid e-mail address',
    length: params => `Should be ${params.length} characters long`,
    matches: params => `Invalid ${params.path}`,
    max: params => `Can not be longer than ${params.max} characters`,
    min: params => `Can not be shorter than ${params.min} characters`,
    url: 'Invalid URL'
  }
})

export { Yup }

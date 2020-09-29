import * as Yup from 'yup'

Yup.setLocale({
  mixed: {
    default: () => 'field.error.invalid',
    required: 'field.error.required'
  },
  number: {
    max: ({ max }) => `field.error.number.max=${max}`,
    min: ({ min }) => `field.error.number.min=${min}`
  },
  string: {
    email: 'field.error.email',
    length: ({ length }) => `field.error.string.length=${length}`,
    matches: ({ path }) => `field.error.string.matches/${path}`,
    max: ({ max }) => `field.error.string.max=${max}`,
    min: ({ min }) => `field.error.string.min=${min}`,
    url: 'field.error.url'
  }
})

export { Yup }

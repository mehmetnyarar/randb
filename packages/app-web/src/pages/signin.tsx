import { Logger, Snack, useSigninUserForm } from '@app/logic'
import { Theme } from '@app/ui'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { GhostButton, SubmitButton } from '~/components/button'
import {
  Field,
  FieldError,
  FieldErrorList,
  InputGroup,
  Label
} from '~/components/form'
import { Layout } from '~/components/layout'

const logger = Logger.create({
  src: 'SigninUserScreen'
})

/**
 * Screen for user signin.
 */
const SigninScreen: React.FC = () => {
  const { push } = useRouter()
  const { palette } = useContext(Theme)

  const {
    method,
    altMethod,
    onMethodChange,
    isPasswordVisible,
    // onTogglePasswordVisibility,
    TypedController,
    isDisabled,
    handleSubmit,
    onValid,
    errors,
    loading,
    result,
    error
  } = useSigninUserForm()

  useEffect(() => {
    if (result) {
      push('/')
    }
  }, [result, push])

  const { show } = useContext(Snack)
  useEffect(() => {
    if (error) {
      show({
        type: 'error',
        title: 'Error',
        content: error.messages.join('. ')
      })
    }
  }, [show, error])

  logger.debug('render', { errors, loading, result, error })

  if (result) return null

  return (
    <Layout title='Signin'>
      <main role='main'>
        <h1>Signin</h1>
        <section role='form'>
          <form onSubmit={handleSubmit(onValid)}>
            {method === 'email' && (
              <Field>
                <Label htmlFor='e-mail'>E-mail</Label>
                <TypedController
                  name='email'
                  render={({ value, onChange, onBlur }: any) => (
                    <input
                      type='email'
                      value={value}
                      onChange={value => onChange(value)}
                      onBlur={onBlur}
                      placeholder='you@mail.com'
                      autoCapitalize='none'
                      autoComplete='email'
                      data-testid='email'
                    />
                  )}
                />
                <FieldError error={errors.email?.message} />
              </Field>
            )}
            {method === 'phone' && (
              <Field>
                <Label>Phone</Label>
                <InputGroup>
                  <TypedController
                    name={['phone', 'cc']}
                    render={({ value, onChange, onBlur }: any) => (
                      <input
                        type='number'
                        value={value}
                        onChange={value => onChange(value)}
                        onBlur={onBlur}
                        placeholder='Country Code'
                        autoComplete='tel-country-code'
                        className='phone-cc'
                      />
                    )}
                  />
                  <TypedController
                    name={['phone', 'dc']}
                    render={({ value, onChange, onBlur }: any) => (
                      <input
                        type='number'
                        value={value}
                        onChange={value => onChange(value)}
                        onBlur={onBlur}
                        placeholder='Destination Code'
                        autoComplete='tel-area-code'
                        className='phone-dc'
                      />
                    )}
                  />
                  <TypedController
                    name={['phone', 'sn']}
                    render={({ value, onChange, onBlur }: any) => (
                      <input
                        type='number'
                        value={value}
                        onChange={value => onChange(value)}
                        onBlur={onBlur}
                        placeholder='Subscriber No'
                        autoComplete='tel-local'
                        className='phone-sn'
                      />
                    )}
                  />
                </InputGroup>
                <FieldErrorList errors={errors.phone as any} />
              </Field>
            )}
            <Field>
              <Label>Password</Label>
              <TypedController
                name='password'
                render={({ value, onChange, onBlur }: any) => (
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={value}
                    onChange={value => onChange(value)}
                    onBlur={onBlur}
                    autoComplete='current-password'
                    data-testid='password'
                  />
                )}
              />
              <FieldError error={errors.password} />
            </Field>

            <SubmitButton disabled={isDisabled}>Signin</SubmitButton>
          </form>

          <aside className='helpers'>
            <GhostButton onClick={() => onMethodChange()}>
              {`Signin with ${altMethod} instead`}
            </GhostButton>
          </aside>
        </section>
      </main>

      <style jsx>
        {`
          main {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          section[role='form'] {
            min-width: 480px;
            max-width: 720px;
            padding: 32px;
            border: 1px solid ${palette['text-hint-color']};
            border-radius: 4px;
          }

          form {
            display: flex;
            flex-direction: column;
          }

          input[type='email'],
          input[type='number'],
          input[type='password'],
          input[type='text'] {
            width: 100%;
            outline: none;
            padding: 8px;
            border: 1px solid ${palette['border-primary-color-1']};
            border-radius: 4px;
          }
          input:hover {
            border: 1px solid ${palette['color-primary-hover-border']};
          }

          .phone-cc {
            flex: 1;
          }
          .phone-dc {
            flex: 2;
            margin: 0 4px;
          }
          .phone-sn {
            flex: 3;
          }

          aside {
            margin-top: 16px;
          }
        `}
      </style>
    </Layout>
  )
}

export default SigninScreen

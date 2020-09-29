import { Logger, Snack, useSigninUserForm } from '@app/logic'
import { Theme } from '@app/ui'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { initializeApollo } from '~/apollo'
import { GhostButton, SubmitButton } from '~/components/button'
import {
  Field,
  FieldError,
  FieldErrorList,
  InputGroup,
  Label
} from '~/components/form'
import { Layout } from '~/components/layout'
import { withTranslation } from '~/i18n'
import { NextScreen } from '~/types'

const logger = Logger.create({
  src: 'SigninUserScreen'
})

/**
 * Screen for user signin.
 */
export const SigninScreen: NextScreen = ({ t }) => {
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
        content: error.messages.map(m => t(m)).join('. ')
      })
    }
  }, [t, show, error])

  logger.debug('render', { errors, loading, result, error })

  if (result) return null

  return (
    <Layout title={t('auth.signin')}>
      <main role='main'>
        <h1>{t('auth.signin')}</h1>
        <section role='form'>
          <form onSubmit={handleSubmit(onValid)}>
            {method === 'email' && (
              <Field>
                <Label htmlFor='e-mail'>{t('email')}</Label>
                <TypedController
                  name='email'
                  render={({ value, onChange, onBlur }: any) => (
                    <input
                      type='email'
                      value={value}
                      onChange={value => onChange(value)}
                      onBlur={onBlur}
                      placeholder={t('email.placeholder')}
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
                <Label>{t('phone')}</Label>
                <InputGroup>
                  <TypedController
                    name={['phone', 'cc']}
                    render={({ value, onChange, onBlur }: any) => (
                      <input
                        type='number'
                        value={value}
                        onChange={value => onChange(value)}
                        onBlur={onBlur}
                        placeholder={t('phone.cc')}
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
                        placeholder={t('phone.dc')}
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
                        placeholder={t('phone.sn')}
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
              <Label>{t('password')}</Label>
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

            <SubmitButton disabled={isDisabled}>
              {t('auth.signin')}
            </SubmitButton>
          </form>

          <aside className='helpers'>
            <GhostButton onClick={() => onMethodChange()}>
              {t('auth.signin.with', { method: t(altMethod) })}
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

/**
 * Initial props.
 */
SigninScreen.getInitialProps = async () => {
  const apolloClient = initializeApollo()

  return {
    initialApolloState: apolloClient.cache.extract(),
    namespacesRequired: ['common']
  }
}

export default withTranslation('common')(SigninScreen)

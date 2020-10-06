import {
  Auth,
  Logger,
  SigninMethod,
  Snack,
  useSigninUserForm
} from '@app/logic'
import { useRouter } from 'next/router'
import React, { Fragment, useContext, useEffect, useMemo } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { initializeApollo } from '~/apollo'
import { BasicButton, GhostButton, SubmitButton } from '~/components/button'
import { Divider } from '~/components/divider'
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
  const { replace, query } = useRouter()
  const returnUrl = useMemo(() => (query.returnUrl as string) || '/', [query])

  const { user } = useContext(Auth)
  const {
    method,
    otherMethods,
    onMethodChange,
    isPasswordVisible,
    onTogglePasswordVisibility,
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
    if (user || result) {
      replace(returnUrl)
    }
  }, [user, result, replace, returnUrl])

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
        <h2>{t('auth.signin')}</h2>
        <section role='form'>
          <form onSubmit={handleSubmit(onValid)}>
            {method === SigninMethod.USERNAME && (
              <Field>
                <Label htmlFor='username'>{t('username')}</Label>
                <TypedController
                  name='username'
                  render={({ value, onChange, onBlur }: any) => (
                    <input
                      type='text'
                      value={value}
                      onChange={value => onChange(value)}
                      onBlur={onBlur}
                      className='full-width'
                      placeholder={t('username.placeholder')}
                      autoCapitalize='none'
                      autoComplete='username'
                      data-testid='username'
                    />
                  )}
                />
                <FieldError error={errors.username?.message} />
              </Field>
            )}
            {method === SigninMethod.EMAIL && (
              <Field>
                <Label htmlFor='email'>{t('email')}</Label>
                <TypedController
                  name='email'
                  render={({ value, onChange, onBlur }: any) => (
                    <input
                      type='email'
                      value={value}
                      onChange={value => onChange(value)}
                      onBlur={onBlur}
                      className='full-width'
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
            {method === SigninMethod.PHONE && (
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
                        className='full-width'
                        placeholder={t('phone.cc')}
                        autoComplete='tel-country-code'
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
                        className='phone-dc full-width'
                        placeholder={t('phone.dc')}
                        autoComplete='tel-area-code'
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
                        className='full-width'
                        placeholder={t('phone.sn')}
                        autoComplete='tel-local'
                      />
                    )}
                  />
                </InputGroup>
                <FieldErrorList errors={errors.phone as any} />
              </Field>
            )}
            <Field>
              <Label>{t('password')}</Label>
              <InputGroup>
                <TypedController
                  name='password'
                  render={({ value, onChange, onBlur }: any) => (
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      value={value}
                      onChange={value => onChange(value)}
                      onBlur={onBlur}
                      className='full-width'
                      autoComplete='current-password'
                      data-testid='password'
                    />
                  )}
                />
                <BasicButton
                  margin='0 0 0 8px'
                  onClick={onTogglePasswordVisibility}
                >
                  {isPasswordVisible ? <FiEye /> : <FiEyeOff />}
                </BasicButton>
              </InputGroup>
              <FieldError error={errors.password} />
            </Field>
            <SubmitButton disabled={isDisabled} data-testid='signin'>
              {t('auth.signin')}
            </SubmitButton>
          </form>

          <aside className='signin-methods' data-testid='signin-methods'>
            <span>{t('auth.signin.method')}</span>
            {otherMethods.map((m, i) => (
              <Fragment key={i}>
                {i > 0 && <Divider vertical />}
                <GhostButton
                  onClick={() => onMethodChange(m)}
                  data-testid={`onMethodChange-${m}`}
                >
                  {t(`auth.signin.method.${m}`)}
                </GhostButton>
              </Fragment>
            ))}
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

          .phone-dc {
            margin: 0 8px;
          }

          .signin-methods {
            margin-top: 32px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            font-size: smaller;
          }
          .signin-methods span {
            margin-right: 8px;
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

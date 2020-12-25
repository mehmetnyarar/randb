import {
  Auth,
  initializeApolloClient,
  Logger,
  SigninMethod,
  Snack,
  useSigninUserForm
} from '@app/logic'
import { useRouter } from 'next/router'
import React, { Fragment, useContext, useEffect, useMemo } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { BasicButton, GhostButton, SubmitButton } from '~/components/button'
import { Divider } from '~/components/divider'
import {
  Field,
  FieldError,
  FieldErrorList,
  InputGroup,
  Label
} from '~/components/form'
import { Layout, Main } from '~/components/layout'
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
    <Layout title={t('screen.signin')}>
      <Main justify='center' align='center'>
        <h2 className='page-title'>{t('screen.signin')}</h2>
        <section role='form'>
          <form onSubmit={handleSubmit(onValid)}>
            {method === SigninMethod.USERNAME && (
              <Field>
                <Label htmlFor='username'>{t('username')}</Label>
                <TypedController
                  name='username'
                  render={({ value, onChange, onBlur }: any) => (
                    <input
                      id='username'
                      type='text'
                      value={value}
                      onChange={value => onChange(value)}
                      onBlur={onBlur}
                      className='full-width'
                      placeholder={t('username.placeholder')}
                      autoCapitalize='none'
                      autoComplete='username'
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
                      id='email'
                      type='email'
                      value={value}
                      onChange={value => onChange(value)}
                      onBlur={onBlur}
                      className='full-width'
                      placeholder={t('email.placeholder')}
                      autoCapitalize='none'
                      autoComplete='email'
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
                        aria-labelledby='phone.cc'
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
                        aria-labelledby='phone.dc'
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
                        aria-labelledby='phone.sn'
                      />
                    )}
                  />
                </InputGroup>
                <FieldErrorList errors={errors.phone as any} />
              </Field>
            )}
            <Field>
              <Label htmlFor='password'>{t('password')}</Label>
              <InputGroup>
                <TypedController
                  name='password'
                  render={({ value, onChange, onBlur }: any) => (
                    <input
                      id='password'
                      type={isPasswordVisible ? 'text' : 'password'}
                      value={value}
                      onChange={value => onChange(value)}
                      onBlur={onBlur}
                      className='full-width'
                      autoComplete='current-password'
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
            {otherMethods.map((otherMethod, i) => (
              <Fragment key={otherMethod}>
                {i > 0 && <Divider vertical />}
                <GhostButton
                  onClick={() => onMethodChange(otherMethod)}
                  data-testid={`onMethodChange-${otherMethod}`}
                >
                  {t(`auth.signin.method.${otherMethod}`)}
                </GhostButton>
              </Fragment>
            ))}
          </aside>
        </section>
      </Main>
      <style jsx>
        {`
          .page-title {
            margin: 32px 0;
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
  const apolloClient = initializeApolloClient()

  return {
    initialApolloState: apolloClient.cache.extract(),
    namespacesRequired: ['common']
  }
}

export default withTranslation('common')(SigninScreen)

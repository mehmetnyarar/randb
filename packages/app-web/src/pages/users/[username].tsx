import {
  initializeApolloClient,
  Logger,
  NEW_USER_ROLES,
  PersonGender,
  RequestOrigin,
  Snack,
  UserRole,
  useUpsertUserForm
} from '@app/logic'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { BasicButton, InfoButton, SubmitButton } from '~/components/button'
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
  src: 'UserScreen'
})

/**
 * Users screen.
 */
export const UserScreen: NextScreen = ({ t }) => {
  const router = useRouter()
  const username = router.query.username as string

  const {
    create,
    createPassword,
    isPasswordVisible,
    onTogglePasswordVisibility,
    TypedController,
    isDisabled,
    handleSubmit,
    onValid,
    errors,
    loading,
    result: user,
    error
  } = useUpsertUserForm({
    initialValues: {
      username,
      origin: RequestOrigin.WEB
    }
  })

  const title = useMemo(
    () =>
      user ? `${user.name.first} ${user.name.last}` : t('screen.user.new'),
    [t, user]
  )

  const { show } = useContext(Snack)
  useEffect(() => {
    if (error) {
      show({
        type: 'error',
        content: error.messages.map(m => t(m)).join('. ')
      })
    }
  }, [t, show, error])

  logger.debug('render', { username, errors, loading, user, error })

  return (
    <>
      <Layout title={title} roles={[UserRole.SA, UserRole.ADMIN]}>
        <main role='main'>
          <h2>{title}</h2>
          <section role='form'>
            <form onSubmit={handleSubmit(onValid)}>
              <Field>
                <Label>{t('person.name')}</Label>
                <InputGroup>
                  <TypedController
                    name={['name', 'first']}
                    render={({ value, onChange, onBlur }: any) => (
                      <input
                        type='text'
                        value={value}
                        onChange={value => onChange(value)}
                        onBlur={onBlur}
                        className='name-first full-width'
                        placeholder={t('person.name.first')}
                      />
                    )}
                  />
                  <TypedController
                    name={['name', 'last']}
                    render={({ value, onChange, onBlur }: any) => (
                      <input
                        type='text'
                        value={value}
                        onChange={value => onChange(value)}
                        onBlur={onBlur}
                        className='name-last full-width'
                        placeholder={t('person.name.last')}
                      />
                    )}
                  />
                </InputGroup>
                <FieldErrorList errors={errors.name as any} />
              </Field>
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
              <Field>
                <Label htmlFor='gender'>{t('person.gender')}</Label>
                <TypedController
                  name='gender'
                  render={({ value, onChange, onBlur }: any) => (
                    <select
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      className='full-width'
                    >
                      {Object.values(PersonGender).map((gender, i) => (
                        <option key={i} value={gender}>
                          {t(`person.gender.${gender}`)}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <FieldError error={errors.gender} />
              </Field>
              <Field>
                <Label htmlFor='roles'>{t('user.roles')}</Label>
                <TypedController
                  name='roles'
                  render={({ value, onChange, onBlur }: any) => (
                    <select
                      value={value[0]}
                      onChange={e => onChange([e.target.value])}
                      onBlur={onBlur}
                      className='full-width'
                    >
                      {NEW_USER_ROLES.map((role, i) => (
                        <option key={i} value={role}>
                          {t(`user.role.${role}`)}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <FieldError error={errors.roles} />
              </Field>
              <Field>
                <Label>{t('password')}</Label>
                <InputGroup>
                  <TypedController
                    name='password'
                    render={({ value, onChange, onBlur }: any) => (
                      <input
                        readOnly
                        type={isPasswordVisible ? 'text' : 'password'}
                        value={value}
                        onChange={value => onChange(value)}
                        onBlur={onBlur}
                        className='full-width'
                        autoComplete='new-password'
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
                  <InfoButton margin='0 0 0 8px' onClick={createPassword}>
                    {t('password.create')}
                  </InfoButton>
                </InputGroup>
                <FieldError error={errors.password} />
              </Field>
              <SubmitButton disabled={isDisabled}>
                {t(create ? 'create' : 'update')}
              </SubmitButton>
            </form>
          </section>
        </main>
      </Layout>

      <style jsx>
        {`
          main {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 32px;
          }

          .name-last {
            margin-left: 8px;
          }
          .phone-dc {
            margin: 0 8px;
          }
        `}
      </style>
    </>
  )
}

/**
 * Initial props.
 */
UserScreen.getInitialProps = async () => {
  const apolloClient = initializeApolloClient()

  return {
    initialApolloState: apolloClient.cache.extract(),
    namespacesRequired: ['common']
  }
}

export default withTranslation('common')(UserScreen)

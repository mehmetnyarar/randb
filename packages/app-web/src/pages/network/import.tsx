import {
  initializeApolloClient,
  NetworkType,
  NETWORK_UPLOAD_LIMIT,
  RequestOrigin,
  Snack,
  useImportNetworkForm,
  UserRole
} from '@app/logic'
import React, { useContext, useEffect } from 'react'
import { GhostButton, SubmitButton } from '~/components/button'
import { Field, Label } from '~/components/form'
import { FileUpload } from '~/components/input'
import { Layout } from '~/components/layout'
import { ImportReport } from '~/components/network'
import { withTranslation } from '~/i18n'
import { NextScreen } from '~/types'

/**
 * Network import screen.
 */
export const NetworkImportScreen: NextScreen = ({ t }) => {
  const {
    TypedController,
    isDisabled,
    handleSubmit,
    onValid,
    result,
    error,
    refresh
  } = useImportNetworkForm({
    initialValues: {
      origin: RequestOrigin.WEB
    }
  })

  const { show } = useContext(Snack)
  useEffect(() => {
    if (error) {
      show({
        type: 'error',
        content: error.messages.map(m => t(m)).join('. ')
      })
    }
  }, [t, show, error])

  return (
    <Layout
      title={t('screen.network.import')}
      roles={[UserRole.SA, UserRole.ADMIN, UserRole.MANAGER]}
    >
      <main role='main'>
        <h2>{t('screen.network.import')}</h2>
        {result ? (
          <>
            <GhostButton margin='16px 0' onClick={refresh}>
              {t('import.new')}
            </GhostButton>
            <ImportReport value={result} />
          </>
        ) : (
          <section role='form'>
            <form onSubmit={handleSubmit(onValid)}>
              <Field>
                <Label htmlFor='type'>{t('network.type')}</Label>
                <TypedController
                  name='type'
                  render={({ value, onChange, onBlur }: any) => (
                    <select
                      id='type'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    >
                      {Object.values(NetworkType).map((type, i) => (
                        <option key={i} value={type}>
                          {t(`network.type.${type}`)}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </Field>
              <Field>
                <Label htmlFor='upload'>{t('file')}</Label>
                <TypedController
                  name='upload'
                  render={({ value, onChange }: any) => (
                    <FileUpload
                      id='upload'
                      value={value}
                      onChange={onChange}
                      limit={NETWORK_UPLOAD_LIMIT}
                    />
                  )}
                />
              </Field>
              <SubmitButton disabled={isDisabled}>{t('import')}</SubmitButton>
            </form>
          </section>
        )}
      </main>

      <style jsx>
        {`
          main {
            flex: 1;
            padding: 16px;
          }
        `}
      </style>
    </Layout>
  )
}

/**
 * Initial props.
 */
NetworkImportScreen.getInitialProps = async () => {
  const apolloClient = initializeApolloClient()

  return {
    initialApolloState: apolloClient.cache.extract(),
    namespacesRequired: ['common']
  }
}

export default withTranslation('common')(NetworkImportScreen)

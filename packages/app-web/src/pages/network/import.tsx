import {
  initializeApolloClient,
  NetworkType,
  NETWORK_UPLOAD_LIMIT,
  Snack,
  useImportNetworkForm,
  UserRole
} from '@app/logic'
import React, { useContext, useEffect } from 'react'
import { RiStackLine } from 'react-icons/ri'
import { GhostButton, SubmitButton } from '~/components/button'
import { Field, Label } from '~/components/form'
import { FileUpload } from '~/components/input'
import { Layout, Main } from '~/components/layout'
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
    error,
    result,
    loading,
    refresh
  } = useImportNetworkForm()

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
      <Main
        icon={<RiStackLine />}
        title={t('screen.network.import')}
        loading={loading}
        actions={
          <GhostButton onClick={refresh}>{t('import.new')}</GhostButton>
        }
      >
        <>
          {result ? (
            <ImportReport value={result} />
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
                        className='network-select'
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
        </>
      </Main>
      <style jsx>
        {`
          .network-select {
            width: 150px;
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

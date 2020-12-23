import { Auth, SigninMethod, Snack, useSigninUserForm } from '@app/logic'
import { StackScreenProps } from '@react-navigation/stack'
import { Input } from '@ui-kitten/components'
import React, { Fragment, useContext, useEffect } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { GhostButton, SubmitButton } from '~/components/button'
import {
  Field,
  FieldError,
  FieldErrorList,
  InputGroup,
  Label
} from '~/components/form'
import { Layout } from '~/components/layout'
import { EyeIcon, EyeOffIcon } from '~/icons'
import { AuthNavParams } from '~/navigation/types'

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  phoneCc: {
    flex: 1
  },
  phoneDc: {
    flex: 2,
    marginHorizontal: 4
  },
  phoneSn: {
    flex: 3
  },
  aside: {
    margin: 32
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center'
  },
  skip: {
    marginLeft: 8
  }
})

type Props = StackScreenProps<AuthNavParams, 'Signin'>

/**
 * Signin screen.
 */
export const SigninScreen: React.FC<Props> = () => {
  const { onSkipChange } = useContext(Auth)
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
    // loading,
    // result,
    error
  } = useSigninUserForm()

  const { show } = useContext(Snack)
  useEffect(() => {
    if (error) {
      show({
        type: 'error',
        content: error.messages.join('. ')
      })
    }
  }, [show, error])

  return (
    <Layout allowBack allowMenu={false} style={styles.layout}>
      {method === SigninMethod.USERNAME && (
        <Field>
          <Label>Username</Label>
          <TypedController
            name='username'
            render={({ value, onChange }: any) => (
              <Input
                value={value}
                onChangeText={value => onChange(value)}
                placeholder=''
                autoCapitalize='none'
              />
            )}
          />
          <FieldError error={errors.username?.message} />
        </Field>
      )}
      {method === SigninMethod.EMAIL && (
        <Field>
          <Label>E-mail</Label>
          <TypedController
            name='email'
            render={({ value, onChange }: any) => (
              <Input
                value={value}
                onChangeText={value => onChange(value)}
                placeholder='you@mail.com'
                autoCapitalize='none'
                autoCompleteType='email'
                keyboardType='email-address'
                textContentType='emailAddress'
              />
            )}
          />
          <FieldError error={errors.email?.message} />
        </Field>
      )}
      {method === SigninMethod.PHONE && (
        <Field>
          <Label>Phone</Label>
          <InputGroup>
            <TypedController
              name={['phone', 'cc']}
              render={({ value, onChange, onBlur }: any) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  placeholder='Country Code'
                  keyboardType='number-pad'
                  style={styles.phoneCc}
                />
              )}
            />
            <TypedController
              name={['phone', 'dc']}
              render={({ value, onChange, onBlur }: any) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  placeholder='Destination Code'
                  keyboardType='number-pad'
                  style={styles.phoneDc}
                />
              )}
            />
            <TypedController
              name={['phone', 'sn']}
              render={({ value, onChange, onBlur }: any) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  placeholder='Subscriber No'
                  keyboardType='number-pad'
                  style={styles.phoneSn}
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
          render={({ value, onChange }: any) => (
            <Input
              value={value}
              onChangeText={value => onChange(value)}
              autoCompleteType='password'
              textContentType='password'
              secureTextEntry={!isPasswordVisible}
              accessoryRight={props => (
                <TouchableWithoutFeedback onPress={onTogglePasswordVisibility}>
                  {isPasswordVisible ? (
                    <EyeIcon {...props} />
                  ) : (
                    <EyeOffIcon {...props} />
                  )}
                </TouchableWithoutFeedback>
              )}
            />
          )}
        />
        <FieldError error={errors.password} />
      </Field>

      <SubmitButton onPress={handleSubmit(onValid)} disabled={isDisabled}>
        Signin
      </SubmitButton>

      <View style={styles.aside}>
        <Text>Signin with</Text>
        {otherMethods.map((m, i) => (
          <Fragment key={i}>
            <GhostButton
              onPress={() => onMethodChange(m)}
              data-testid={`onMethodChange-${m}`}
            >
              {m}
            </GhostButton>
          </Fragment>
        ))}
        <GhostButton style={styles.skip} onPress={() => onSkipChange(true)}>
          or skip signin
        </GhostButton>
      </View>
    </Layout>
  )
}

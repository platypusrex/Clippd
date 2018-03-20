import * as React from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
import { containerStyles } from '../styles/shared/ContainerStyles';
import { Input } from '../shared/components/Input';
import { AuthHeader } from '../shared/components/AuthHeader';
import { Button } from '../shared/components/Button';
import { Fade } from '../shared/components/Fade';
import { RouteComponentProps } from 'react-router';
import { compose, withHandlers } from 'recompose';
import { withState, WithStateProps } from '../shared/containers/withState';
import { withRegisterUser, WithRegisterUserProps } from '../api/auth/withRegister';
import { storeAuthToken, storeUserId } from '../shared/util/authUtil';
import { Loading } from '../shared/components/Loading';

const nameView = 'nameVisible';
const emailView = 'emailVisible';
const passwordView = 'passwordVisible';

interface RegisterErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

interface State {
  nameVisible: boolean;
  emailVisible: boolean;
  passwordVisible: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  errors: RegisterErrors;
  isSubmitting: boolean;
}
const initialState: State = {
  nameVisible: true,
  emailVisible: false,
  passwordVisible: false,
  errors: {},
  isSubmitting: false
};

interface WithHandlers {
  handleChangeView: (currentView: string, newView: string) => any;
  handleRegisterUser: () => any;
}

type Props =
  RouteComponentProps<{}> &
  WithStateProps<State> &
  WithHandlers &
  WithRegisterUserProps;

export const RegisterComponent: React.SFC<Props> = (props) => {
  const {setState, state} = props;
  const {firstName, lastName, email, password, errors} = state;

  const NameView = (
    <Fade visible={state.nameVisible}>
      <AuthHeader title="Your Name" subTitle="Who are you"/>

      <Input
        placeholder="First Name"
        autoCapitalize="words"
        value={firstName}
        onChangeText={firstName => setState(ss => ({...ss, firstName}))}
        error={errors.firstName}
      />

      <Input
        placeholder="Last Name"
        autoCapitalize="words"
        value={lastName}
        onChangeText={lastName => setState(ss => ({...ss, lastName}))}
        error={errors.lastName}
      />

      <Button
        buttonText="Next"
        type="primary"
        full={true}
        disabled={!firstName || !lastName}
        onPress={() => props.handleChangeView(nameView, emailView)}
      />
      <Button
        buttonText="Login"
        clear={true}
        full={true}
        onPress={() => props.history.push('/login')}
      />
    </Fade>
  );

  const EmailView = (
    <Fade visible={state.emailVisible}>
      <AuthHeader title="Your Email" subTitle="We won't spam"/>

      <Input
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={email => setState(ss => ({...ss, email}))}
        error={errors.email}
      />

      <Button
        buttonText="Next"
        type="primary"
        full={true}
        disabled={!email}
        onPress={() => props.handleChangeView(emailView, passwordView)}
      />
      <Button
        buttonText="Back"
        clear={true}
        full={true}
        onPress={() => props.handleChangeView(emailView, nameView)}
      />
    </Fade>
  );

  const PasswordView = (
    <Fade visible={state.passwordVisible}>
      <AuthHeader title="Your Password" subTitle="Stay safe"/>

      <Input
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={password => setState(ss => ({...ss, password}))}
        error={errors.password}
      />

      <Button
        buttonText="Sign up"
        type="primary"
        full={true}
        disabled={!password}
        onPress={props.handleRegisterUser}
      />
      <Button
        buttonText="Back"
        clear={true}
        full={true}
        onPress={() => props.handleChangeView(passwordView, emailView)}
      />
    </Fade>
  );

  return (
    <KeyboardAvoidingView behavior="padding" style={[containerStyles.centered, containerStyles.paddingLg]}>
      {state.isSubmitting && <Loading/>}

      <React.Fragment>
        {NameView}
        {EmailView}
        {PasswordView}
      </React.Fragment>
    </KeyboardAvoidingView>
  );
};

export const Register = compose<Props, State>(
  withRegisterUser,
  withState<State>(initialState),
  withHandlers<Props, WithHandlers>({
    handleChangeView: (props: Props) => (currentView: string, newView: string) => {
      props.setState(ss => ({...ss, [currentView]: false}));

      setTimeout(() => {
        props.setState(ss => ({...ss, [newView]: true}));
      }, 400)
    },
    handleRegisterUser: (props: Props) => async () => {
      const {state, setState} = props;
      const {firstName, lastName, email, password} = state;

      if (!firstName || !lastName || !email || !password) {
        return;
      }

      try {
        setState(ss => ({...ss, isSubmitting: true}));
        const response = await props.registerUser({firstName, lastName, email, password});
        const {token, user} = response.data.signup;

        await storeAuthToken(token);
        await storeUserId(user.id);

        setTimeout(() => {
          setState(initialState);
          props.history.push('/tabs');
        }, 1000);
      } catch (err) {
        const alertProps = {
          title: 'Sorry',
          message: 'An account with this email already exists.',
          okButton: [{
            text: 'OK',
            onPress: () => {
              setState(ss => ({...ss, passwordVisible: false}));
              setTimeout(() => {setState(initialState)}, 400);
            }
          }]
        };

        Alert.alert(alertProps.title, alertProps.message, alertProps.okButton)
      }
    }
  })
)(RegisterComponent);
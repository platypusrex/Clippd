import * as React from 'react';
import { compose, withHandlers } from 'recompose';
import { KeyboardAvoidingView } from 'react-native';
import { AuthHeader } from '../shared/components/AuthHeader';
import { Input } from '../shared/components/Input';
import { Button } from '../shared/components/Button';
import { containerStyles } from '../styles/shared/ContainerStyles';
import { RouteComponentProps } from 'react-router';
import { Loading } from '../shared/components/Loading';
import { withState, WithStateProps } from '../shared/containers/withState';
import { withLoginUser, WithLoginUserProps } from '../api/auth/withLogin';
import { getFormErrorState } from '../shared/util/getFormErrorState';
import { storeAuthToken, storeUserId } from '../shared/util/authUtil';

interface LoginErrors {
  email?: string;
  password?: string;
}

interface State {
  email?: string;
  password?: string;
  errors: LoginErrors;
  isSubmitting: boolean;
}
const initialState: State = {
  errors: {},
  isSubmitting: false
};

interface WithHandlers {
  handleInputFocus: () => any;
  handleLoginUser: () => any;
}

type Props =
  RouteComponentProps<{}> &
  WithLoginUserProps &
  WithStateProps<State> &
  WithHandlers;

export const LoginComponent: React.SFC<Props> = (props) => {
  const {state, setState} = props;
  const {email, password, errors, isSubmitting} = state;

  return (
    <KeyboardAvoidingView behavior="padding" style={[containerStyles.centered, containerStyles.paddingLg]}>
      {isSubmitting && <Loading/>}

      <AuthHeader
        title="Login"
        subTitle="Welcome Back"
      />

      <Input
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onFocus={props.handleInputFocus}
        onChangeText={email => setState(ss => ({...ss, email}))}
        error={errors.email}
      />

      <Input
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onFocus={props.handleInputFocus}
        onChangeText={password => setState(ss => ({...ss, password}))}
        error={errors.password}
      />

      <Button
        buttonText="Login"
        type="primary"
        full={true}
        onPress={props.handleLoginUser}
      />
      <Button
        buttonText="Sign up"
        clear={true}
        full={true}
        onPress={() => props.history.push('/register')}
      />
    </KeyboardAvoidingView>
  );
};

export const Login = compose<Props, {}>(
  withLoginUser,
  withState<State>(initialState),
  withHandlers<Props, WithHandlers>({
    handleInputFocus: (props: Props) => () => props.setState(ss => ({...ss, errors: {}})),
    handleLoginUser: (props: Props) => async () => {
      const {state, setState} = props;
      const {email, password, isSubmitting, errors} = state;

      if (isSubmitting) {
        return;
      }

      const formValues = [{email}, {password}];
      const formErrors = getFormErrorState(formValues);


      if (Object.keys(formErrors).length){
        props.setState(ss => ({...ss, errors: {...errors, ...formErrors}}));
        return;
      }

      if (!email || !password) {
        return;
      }

      props.setState(ss => ({...ss, isSubmitting: true}));
      const response = await props.loginUser({email, password});
      const {error, payload} = response.data.login;

      if (payload) {
        const {token, user} = payload;

        await storeAuthToken(token);
        await storeUserId(user.id);

        setTimeout(() => {
          props.setState(initialState);
          props.history.push('/tabs');
        }, 1000);
      }

      if (error) {
        props.setState(ss => ({...ss, errors: {...ss.errors, [error.field]: error.message}, isSubmitting: false}))
      }
    }
  })
)(LoginComponent);
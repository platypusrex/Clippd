import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { Font } from 'expo'
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { withState, WithStateProps } from './shared/containers/withState';
import { getAuthToken } from './shared/util/authUtil';
import { Routes } from './routes';
import { apiBasePath } from './shared/constants/apiConstants';
const apolloUploadClient = require('apollo-upload-client');

// Custom Fonts
const montserratRegular = require('./assets/fonts/Montserrat-Regular.ttf');
const montserratMedium = require('./assets/fonts/Montserrat-Medium.ttf');
const montserratBold = require('./assets/fonts/Montserrat-Bold.ttf');
const montserratExtraBold = require('./assets/fonts/Montserrat-ExtraBold.ttf');
const montserratBlack = require('./assets/fonts/Montserrat-Black.ttf');

const uploadLink = apolloUploadClient.createUploadLink({uri: apiBasePath});
const authLink = setContext(async (_, {headers}) => {
  const token = await getAuthToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache()
});

interface State {
  isReady: boolean;
}
const initialState: State = {
  isReady: false
};

type Props = WithStateProps<State>;

export const AppComponent: React.SFC<Props> = (props) => {
  if (!props.state.isReady) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <Routes/>
    </ApolloProvider>
  )
};

function getFonts (): Font.FontMap[] {
  return [
    {'montserrat-regular': montserratRegular},
    {'montserrat-medium': montserratMedium},
    {'montserrat-bold': montserratBold},
    {'montserrat-extra-bold': montserratExtraBold},
    {'montserrat-black': montserratBlack}
  ];
}

export const App = compose<Props, State>(
  withState<State>(initialState),
  lifecycle<Props, State>({
    componentWillMount: async function () {
      const fontAssets = getFonts();
      await Promise.all(fontAssets.map(font => Font.loadAsync(font)));
      this.props.setState(ss => ({...ss, isReady: true}));
    }
  })
)(AppComponent);


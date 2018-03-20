import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { Loading } from '../shared/components/Loading';
import { withRefreshToken, WithRefreshTokenProps } from '../api/auth/withRefreshToken';
import { RouteComponentProps } from 'react-router';
import { getAuthToken, storeAuthToken, storeUserId } from '../shared/util/authUtil';

type Props =
  RouteComponentProps<{}> &
  WithRefreshTokenProps;

const CheckTokenComponent: React.SFC<{}> = () =>  (
  <Loading/>
);

export const CheckToken = compose(
  withRefreshToken,
  lifecycle<Props, {}>({
    componentDidMount: async function () {
      const token = await getAuthToken();

      if (!token) {
        this.props.history.push('/login');
        return;
      }

      try {
        const response = await this.props.refreshToken();
        const { token, userId } = response.data.refreshToken;

        await storeAuthToken(token);
        await storeUserId(userId);

        this.props.history.push('/tabs');
      } catch (err) {
        this.props.history.push('/login');
      }
    }
  })
)(CheckTokenComponent);
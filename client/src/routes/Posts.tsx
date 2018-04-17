import * as React from 'react';
import { branch, compose, renderComponent, withProps } from 'recompose';
import { Dimensions, FlatList, View } from 'react-native';
import { Text } from '../shared/components/Text';
import { containerStyles } from '../styles/shared/ContainerStyles';
import { RouteComponentProps, withRouter } from 'react-router';
import { Navbar } from '../shared/components/Navbar';
import { withAllPosts, WithAllPostsProps } from '../api/post/withAllPosts';
import { Post } from '../../../server/src/generated/prisma';
import { Loading } from '../shared/components/Loading';
import { pictureUrlPath } from '../shared/util/pictureUrlPathUtil';
import { Card } from '../shared/components/Card/Card';
import moment from 'moment';

const {height} = Dimensions.get('window');

interface WithProps {
  posts: Post[];
}

type Props =
  RouteComponentProps<{}> &
  WithAllPostsProps &
  WithProps;

const PostsComponent: React.SFC<Props> = (props) => {
  return (
    <View style={{height: height - 65}}>
      <Navbar
        body={{title: 'Posts'}}
        rightButton={{icon: {name: 'md-camera', size: 28}, handler: () => console.log('button clicked')}}
      />

      <FlatList
        data={props.posts}
        numColumns={1}
        keyExtractor={item => item.id}
        renderItem={({item}) => item.pictureUrl ? (
          <Card image={pictureUrlPath(item.pictureUrl)} style={{marginLeft: 15, marginRight: 15, marginTop: 15, marginBottom: 5}}>
            <View>
              <Text weight="bold">{item.author.firstName} {item.author.lastName}</Text>
              <Text>{moment(item.createdAt).fromNow()}</Text>
            </View>

            <View style={{marginTop: 15}}>
              <Text>{item.caption}</Text>
            </View>
          </Card>
        ) : null}
      />
    </View>
  );
};

export const Posts = compose<Props, {}>(
  withRouter,
  withAllPosts,
  withProps((props: Props) => {
    const posts = props.data.posts || [];
    return {posts};
  }),
  branch((props: Props) => props.data.loading || !props.posts.length,
    renderComponent(() => <Loading/>)
  )
)(PostsComponent);
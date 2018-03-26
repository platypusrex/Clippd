import * as React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { cardStyles as styles, fullImageCardStyles } from '../../../styles/shared/CardStyles';
import { containerStyles } from '../../../styles/shared/ContainerStyles';

interface Props {
  isTouchable?: boolean;
  children?: string | React.ReactNode;
  bodyStyle?: {};
  image?: string;
  imageCard?: string;
  style?: {}
}

export const Card: React.SFC<Props> = (props) => {
  const {isTouchable, image, style, children} = props;

  const Card = (
    <View style={containerStyles.full}>
      {image && <ImageCard {...props}/>}

      <CardBody style={styles.bodyWrapper}>
        {children}
      </CardBody>
    </View>
  );

  return isTouchable ? (
    <TouchableOpacity style={[styles.wrapper, style]}>
      <ImageCard {...props}/>
    </TouchableOpacity>
  ) : (
    <View style={[styles.wrapper, style]}>
      <ImageCard {...props}/>
    </View>
  );
};

const ImageCard: React.SFC<Props> = (props) => {
  const {children, image, imageCard} = props;
  const style = imageCard ? fullImageCardStyles : styles;

  return (
    <React.Fragment>
      {image && <Image style={style.image} resizeMode="cover" source={{uri: image}}/>}

      <CardBody style={style.bodyWrapper}>
        {children}
      </CardBody>
    </React.Fragment>
  );
};

const CardBody: React.SFC<Props> = ({style, children}) => {
  return (
    <View style={style}>
      {children}
    </View>
  );
};

import * as React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { cardStyles as styles, fullImageCardStyles } from '../../../styles/shared/CardStyles';
import { containerStyles } from '../../../styles/shared/ContainerStyles';
import { CardHeader } from './CardHeader';

interface CardHeaderProps {
  title: string | string[];
  subTitle?: string | string[];
  titleStyle?: {};
  subTitleStyle?: {}
}

interface Props {
  isTouchable?: boolean;
  header?: CardHeaderProps;
  children?: string | React.ReactNode;
  bodyStyle?: {};
  image?: string;
  imageCard?: string;
  style?: {}
}

export const Card: React.SFC<Props> = (props) => {
  const {isTouchable, image, style, header, children} = props;

  const Card = (
    <View style={containerStyles.full}>
      {header &&
      <CardHeader
        title={header.title}
        titleStyle={header.titleStyle}
        subTitle={header.subTitle}
        subTitleStyle={header.subTitleStyle}
      />}

      {image && <ImageCard {...props}/>}

      {!image && <CardBody style={styles.bodyWrapper}>
        {children}
      </CardBody>}
    </View>
  );

  return isTouchable ? (
    <TouchableOpacity style={[styles.wrapper, style]}>
      {Card}
    </TouchableOpacity>
  ) : (
    <View style={[styles.wrapper, style]}>
      {Card}
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

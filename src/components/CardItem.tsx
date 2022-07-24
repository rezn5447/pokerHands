import React from 'react';
import { css } from '@emotion/native';
import { View, Image } from 'react-native';
import { Card } from '../shared/types';

interface Props {
  card: Card;
}

const CardItem = ({ card }: Props) => (
  <View style={cardStyle}>
    <Image style={imageStyle} source={{ uri: card.image }} />
  </View>
);

const imageStyle = css({
  width: 100,
  height: 150,
  resizeMode: 'stretch',
});
const cardStyle = css({
  alignItems: 'center',
  justifyContent: 'center',
  marginHorizontal: -14,
});

export default CardItem;

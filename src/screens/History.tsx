import React, { useState } from 'react';
import { css } from '@emotion/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDeck } from '../hooks/useDeck';
import { Card } from '../shared/types';
import CardItem from '../components/CardItem';
import { buttonStyle, subHeaderStyle } from '../shared/styles';

const History = () => {
  const [handIndex, setHandIndex] = useState(-1);
  const { handHistory } = useDeck();

  return (
    <View style={historyStyle}>
      {handHistory &&
        handHistory.slice(0, 10).map(({ hand, bestHand }, index) => {
          const handStr = hand.map((card) => card.code).join(',');
          return (
            <TouchableOpacity
              style={buttonStyle}
              key={index}
              onPress={() => setHandIndex(index)}
            >
              <Text>{handStr}</Text>
            </TouchableOpacity>
          );
        })}

      {handIndex > -1 && (
        <>
          <View style={cardContainerStyle}>
            {handHistory[handIndex].hand.map((card: Card) => (
              <CardItem card={card} key={card.code} />
            ))}
          </View>
          <Text style={subHeaderStyle}>{handHistory[handIndex].bestHand}</Text>
        </>
      )}
    </View>
  );
};

const historyStyle = css({
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  paddingTop: 16,
});

const cardContainerStyle = css({
  marginTop: 12,
  marginBottom: 12,
  flexDirection: 'row',
});

export default History;

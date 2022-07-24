import React, { useLayoutEffect } from 'react';
import { css } from '@emotion/native';
import HistoryButton from '../components/buttons/HistoryButton';
import CardItem from '../components/CardItem';
import { ROUTES } from '../shared/constants';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  buttonStyle,
  headerStyle,
  subHeaderStyle,
  textStyle,
} from '../shared/styles';
import { useDeck } from '../hooks/useDeck';
import { Card } from '../shared/types';

interface Props {
  navigation;
}

const Home = ({ navigation }: Props) => {
  const { hand, bestHand, fetchNewDeck, shuffleDeck, drawCards } = useDeck();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HistoryButton
          goToHistory={() => navigation.navigate(ROUTES.HISTORY)}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={homeStyle}>
      <Text style={headerStyle}>Poker Hands</Text>
      <View>
        <TouchableOpacity style={buttonStyle} onPress={() => fetchNewDeck()}>
          <Text style={textStyle}>Fetch Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle} onPress={() => shuffleDeck()}>
          <Text style={textStyle}>Shuffle Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle} onPress={() => drawCards()}>
          <Text style={textStyle}>Deal</Text>
        </TouchableOpacity>
      </View>

      {hand && (
        <>
          <View style={cardContainerStyle}>
            {hand.map((card: Card) => (
              <CardItem card={card} key={card.code} />
            ))}
          </View>
          <Text style={subHeaderStyle}>{bestHand}</Text>
        </>
      )}
    </View>
  );
};

export default Home;

const homeStyle = css({
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  paddingTop: 32,
});

const cardContainerStyle = css({
  marginTop: 32,
  marginBottom: 12,
  flexDirection: 'row',
});

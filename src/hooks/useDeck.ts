import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { HAND_HISTORY, KEY } from '../shared/constants';
import { Deck, Card, SavedHand } from '../shared/types';

export const useDeck = () => {
  const [deck, setDeck] = useState<Deck | undefined>();
  const [hand, setHand] = useState<Card[]>([]);
  const [bestHand, setBestHand] = useState('');
  const [handHistory, setHandHistory] = useState<SavedHand[]>([]);

  useEffect(() => {
    const getHandHistory = async () => {
      const jsonValue = await AsyncStorage.getItem(HAND_HISTORY);
      const handHistory: SavedHand[] = JSON.parse(jsonValue);
      setHandHistory(handHistory ?? []);
    };
    getHandHistory();
  }, []);

  const fetchNewDeck = async () => {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/');
    const deck = await response.json();
    setDeck(deck);
  };

  const shuffleDeck = async () => {
    if (deck && deck.deck_id) {
      const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`
      );
      const shuffledDeck = await response.json();
      setDeck(shuffledDeck);
    } else {
      Alert.alert('Please Fetch a Deck First');
    }
  };

  const drawCards = async () => {
    if (deck && deck.deck_id) {
      const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=5`
      );
      const hand = await response.json();
      const bestHand = findBestHand(hand.cards);
      setHand(hand.cards);
      setBestHand(bestHand);
      handHistory.unshift({ hand: hand.cards, bestHand });
      await AsyncStorage.setItem(HAND_HISTORY, JSON.stringify(handHistory));
    } else {
      Alert.alert('Please Fetch a Deck First');
    }
  };

  const findBestHand = useCallback(
    (cards) => {
      const valueCount = {};
      const suitCount = {};
      const aceStraight = '2,3,4,5,ACE';
      // sortHand
      const sortedHand = cards.sort((a, b) => KEY[a.value] - KEY[b.value]);
      sortedHand.forEach((card: Card) => {
        valueCount[card.value]
          ? valueCount[card.value]++
          : (valueCount[card.value] = 1);
        suitCount[card.suit]
          ? suitCount[card.suit]++
          : (suitCount[card.suit] = 1);
      });

      // Get values and suits count
      const values = Object.values(valueCount);
      const suits = Object.values(suitCount);
      const handValues = sortedHand.map((card) => card.value);

      // best hand logic
      const isStraight =
        KEY[sortedHand[4].value] - KEY[sortedHand[0].value] === 4 &&
        !values.includes(2) &&
        !values.includes(3) &&
        !values.includes(4);

      const isFlush = suits.includes(5);
      const isAceStraight = handValues.join(',') == aceStraight;
      const isStraightFlush = isFlush && isStraight;
      const isTwoPair = values.filter((value) => value === 2).length === 2;

      if (isStraightFlush && KEY[sortedHand[4].value] === 14) {
        return 'Royal Flush!';
      } else if (isStraightFlush) {
        return 'Straight Flush!';
      } else if (isStraight || isAceStraight) {
        return 'Straight';
      } else if (values.includes(4)) {
        return 'Four of a Kind';
      } else if (values.includes(3) && values.includes(2)) {
        return 'Full House';
      } else if (values.includes(3)) {
        return 'Three of a Kind';
      } else if (isTwoPair) {
        return 'Two Pair';
      } else if (values.includes(2)) {
        return 'Pair';
      } else {
        return `High Card: ${sortedHand[4].value}`;
      }
    },
    [hand]
  );

  return {
    deck,
    hand,
    bestHand,
    handHistory,
    fetchNewDeck,
    shuffleDeck,
    drawCards,
  };
};

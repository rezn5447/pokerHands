import React from 'react';
import { TouchableOpacity, Text, Platform } from 'react-native';
import { css } from '@emotion/native';
import { maxBlue } from '../../shared/colors';

interface Props {
  goToHistory: () => void;
}

const HistoryButton = ({ goToHistory }: Props) => {
  return (
    <TouchableOpacity onPress={goToHistory}>
      <Text style={historyButtonStyle}>History</Text>
    </TouchableOpacity>
  );
};

export default HistoryButton;

const historyButtonStyle = css({
  color: maxBlue,
  fontSize: 18,
  lineHeight: 24,
  marginRight: Platform.OS === 'android' ? 24 : 0,
});

import { css } from '@emotion/native';
import { black, maxBlue, white } from './colors';

// Container
export const containerStyle = css({
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
});

// Button
export const buttonStyle = css({
  fontSize: 24,
  height: 50,
  width: 200,
  color: white,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  backgroundColor: maxBlue,
  marginVertical: 4,
});

// Text
export const headerStyle = css({
  fontSize: 32,
  color: black,
  marginBottom: 12,
});

export const subHeaderStyle = css({
  fontSize: 24,
  color: black,
});

export const textStyle = css({
  fontSize: 16,
  color: black,
});

export const cardTextStyle = css({
  fontSize: 14,
  color: black,
});

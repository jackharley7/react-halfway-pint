import theme from 'styled-theming';

export const colorDark = theme('mode', {
  light: '#182628',
  dark: '#313131',
});

export const colorPrimaryA = theme('mode', {
  light: '#65CCB8',
  dark: '#15202b',
});

export const colorPrimaryB = theme('mode', {
  light: '#57BA98',
  dark: '#746855',
});

export const colorPrimaryC = theme('mode', {
  light: '#3B945E',
  dark: '',
});

export const colorLight = theme('mode', {
  light: '#F2F2F2',
  dark: '#15202b',
});

export const stopColor = theme('mode', {
  light: '#65CCB8',
  dark: '#BAA294',
});

export const textColorDark = theme('mode', {
  light: '#182628',
  dark: '#f7e9d7'
});

export const textColorLight = theme('mode', {
  light: '#000',
  dark: '#fff'
});

export const buttonDisabledColor = theme('mode', {
  light: '#bababa',
  dark: '#15202b'
});

export const inputBackgroundColor = theme('mode', {
  light: '#fafafa',
  dark: '#222'
});

export const borderColor = theme('mode', {
  light: '#e1e1e1',
  dark: '#746855'
});

export const inputBackgroundColorHover = theme('mode', {
  light: '#ebebeb',
  dark: '#333'
});

const size = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
};

export const screens = {
  xs: `(min-width: ${size.xs})`,
  sm: `(min-width: ${size.sm})`,
  md: `(min-width: ${size.md})`,
  lg: `(min-width: ${size.lg})`,
  xl: `(min-width: ${size.xl})`,
};

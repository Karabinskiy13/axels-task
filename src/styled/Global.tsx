import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
*,
::after,
::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
},
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
},
code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
}`;

export const mediaDevices = {
  XSmall: '(max-width: 575.98px)',
  Small: '(min-width: 576px)',
  Medium: '(min-width: 768px)',
  Large: '(min-width: 992px)',
  ELarge: '(min-width: 1200px)',
  EElarge: '(min-width: 1400px)'
};

export const colors = {
  borderColor: '#808080',
  bgColor: '#000000',
  headerColor: '#FFFFFF'
};

// 1. Import `extendTheme`
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme(
  { config: config },
  {
    colors: {
      brand: {
        100: '#fc2399',
        900: '#1a202c',
      },
    },
    styles: {
      global: () => ({
        body: {
          bg: 'green.50',
        },
      }),
    },
  }
);

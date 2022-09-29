// 1. Import `extendTheme`
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme(
  { config },
  {
    colors: {
      brand: {
        100: '##f90567',
      },
    },
    styles: {
      global: () => ({
        body: {
          bg: 'whiteAlpha.200',
        },
      }),
    },
  }
);

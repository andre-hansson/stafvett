import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        transparent: 'rgba(255,255,255,0)',
        purple: {
          100: '#F3F0FF',
          200: '#DFD8FD',
          300: '#B8ACF6',
          400: '#9F8FEF',
          500: '#8F7EE7',
          600: '#8270DB',
          700: '#6E5DC6',
          800: '#5E4DB2',
          900: '#352C63',
          1000: '#2B273F'
        },
        neutral: {
          0: '#FFFFFF',
          100: '#F7F8F9',
          200: '#F1F2F4',
          300: '#DCDFE4',
          400: '#B3B9C4',
          500: '#8590A2',
          600: '#758195',
          700: '#626F86',
          800: '#44546F',
          900: '#2C3E5D',
          1000: '#172B4D'
        },
        darkneutral: {
          0: '#161A1D',
          100: '#1D2125',
          200: '#22272B',
          250: '#282E33',
          300: '#2C333A',
          350: '#38414A',
          400: '#454F59',
          500: '#596773',
          600: '#738496',
          700: '#8C9BAB',
          800: '#9FADBC',
          900: '#B6C2CF',
          1000: '#C7D1DB'
        }
      },
      fontFamily: {
        heading: ['NotoSans', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [
    plugin(({ matchVariant }) => {
      matchVariant(
        'nth',
        (value) => {
          return `&:nth-child(${value})`;
        },
        {
          values: {
            1: '1',
            2: '2',
            3: '3'
          }
        }
      );
    })
  ]
};
export default config;

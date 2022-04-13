const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

/**
 * 
 * @param {*string*} hex 
 * @param {*string*} alpha 
 * @returns string with rgba values
 */
const hexToRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};

const config = {
  // mode: process.env.NODE_ENV === 'production' ? 'jit' : undefined,
  mode: 'jit',
  purge: ['./src/**/*.{ts,tsx}', '../react/src/**/*.{ts,tsx}'],
  darkMode: 'class', // false or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      spacing: {
        '84': '21rem',
        '88': '22rem',
        '92': '23rem',
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '116': '29rem',
        '120': '30rem',
        '124': '31rem',
        '128': '32rem',
        '132': '33rem',
        '136': '34rem',
        '140': '35rem',
        '144': '36rem',
        '148': '37rem',
        '152': '38rem',
        '158': '39rem',
        '160': '40rem',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
      },
      colors: {
        gray: colors.warmGray,
        green: colors.green,
        red: colors.red,
        primary: {
          100: "#e2d9d9",
          200: "#c6b3b3",
          300: "#a98e8d",
          400: "#8d6867",
          500: "#704241",
          600: "#5a3534",
          700: "#432827",
          800: "#2d1a1a",
          900: "#160d0d"
        },
      },
    },
  },
  plugins: [
    // plugin((options) => console.log(options)),
    plugin(({ addBase, addComponents, addUtilities, e, theme }) => {
      const flexBasisUtilities = Object.entries(theme('spacing')).map(([key, value]) => ({
        [`.${e(`flex-basis-${key}`)}`]: {
          'flex-basis': value
        }
      }))

      addUtilities(flexBasisUtilities, ['responsive'])

      const shadow = {
        '.shadow-glass': {
          'box-shadow': `10px 10px 15px -12px ${hexToRGB(theme('colors.primary.700'), '0.8')}, -10px -10px 15px -12px ${hexToRGB(theme('colors.primary.600'), '0.5')}`
        },
        '.shadow-glass-sm': {
          'box-shadow': `4px 4px 3px -3px ${hexToRGB(theme('colors.primary.700'), '0.8')}, -4px -4px 3px -3px ${hexToRGB(theme('colors.primary.600'), '0.5')}`
        }
      }

      const headlesssUi = {
        '[aria-selected="true"]': {
          color: `theme('colors.primary.700') !important`,
          'box-shadow': `inset 0 10px 10px -10px ${hexToRGB(theme('colors.primary.700'))}, inset 0 -10px 10px -10px ${hexToRGB(theme('colors.primary.700'))} !important`,
        },
        '.dark [aria-selected="true"]': {
          color: `theme('colors.primary.400') !important`,
          'box-shadow': `inset 0 10px 10px -10px ${hexToRGB(theme('colors.primary.400'))}, inset 0 -10px 10px -10px ${hexToRGB(theme('colors.primary.400'))} !important`,
        },
        '[role="tab"]': {
          color: theme('colors.primary.500'),
          'background-color': hexToRGB(theme('borderColor.gray.300'), '0.3'),
          'border-radius': theme('borderRadius.none'),
          'border-width': theme('borderWidth.0'),
          'box-sizing': 'border-box',
          flex: '1 0 0%',
          display: 'flex',
          'place-content': 'center',
          'box-shadow': `inset 0 10px 10px -10px ${hexToRGB(theme('colors.primary.500'))}, inset 0 -10px 10px -10px ${hexToRGB(theme('colors.primary.500'))}`,
          '&:hover': {
            'box-shadow': `inset 0 10px 10px -10px ${hexToRGB(theme('colors.primary.700'))}, inset 0 -10px 10px -10px ${hexToRGB(theme('colors.primary.700'))} !important`,
            'background-color': hexToRGB(theme('borderColor.gray.300'), '0.3'),
            animation: 'none'
          },
        },
        '.dark [role="tab"]': {
          color: theme('colors.primary.300'),
          'background-color': hexToRGB(theme('borderColor.gray.800'), '0.3'),
          'box-shadow': `inset 0 10px 10px -10px ${hexToRGB(theme('colors.primary.300'))}, inset 0 -10px 10px -10px ${hexToRGB(theme('colors.primary.300'))}`,
          '&:hover': {
            'box-shadow': `inset 0 10px 10px -10px ${hexToRGB(theme('colors.primary.400'))}, inset 0 -10px 10px -10px ${hexToRGB(theme('colors.primary.400'))} !important`,
            'background-color': hexToRGB(theme('borderColor.gray.800'), '0.3'),
          },
        },
        '[role="tablist"]': {
          display: 'flex',
          'flex-wrap': 'wrap',
          'overflow': 'auto',
        }
      }

      const tooltip = {
        '.tooltip': {
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          'background-color': theme('borderColor.gray.200'),
          'border-color': hexToRGB(theme('borderColor.primary.500'), '0.3'),
          'border-width': theme('borderWidth.2'),
          'border-radius': theme('borderRadius.lg'),
          'box-shadow': shadow['.shadow-glass']['box-shadow'],
        },
        '.dark .tooltip': {
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          'background-color': theme('borderColor.gray.800'),
          'border-color': hexToRGB(theme('borderColor.primary.300'), '0.3'),
        },
      };

      const container = {
        '.container-glass': {
          'box-sizing': 'border-box',
          'box-shadow': shadow['.shadow-glass']['box-shadow'],
          'border-color': hexToRGB(theme('borderColor.gray.500'), '0.5'),
          'border-width': theme('borderWidth.DEFAULT'),
          'border-radius': theme('borderRadius.lg'),
          'background-color': hexToRGB(theme('borderColor.gray.200'), '0.1'),
          'backdrop-filter': `blur(20px) saturate(0.7)`,
          padding: theme('spacing.4'),
        },
        '.dark .container-glass': {
          'border-color': hexToRGB(theme('borderColor.gray.600'), '0.5'),
          'background-color': hexToRGB(theme('borderColor.gray.900'), '0.1'),
        }
      }

      addComponents([tooltip, shadow, container, headlesssUi]);

      addBase({
        ':focus-visible': {
          outline: 'none',
        },
        ':focus': {
          outline: 'none',
        },
        '.dark body': {
          color: theme('colors.gray.100'),
          'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='${theme('colors.primary.500').replace('#', '%')}' fill-opacity='0.5' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        },
        body: {
          color: theme('colors.gray.800'),
          'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='${theme('colors.primary.500').replace('#', '%')}' fill-opacity='0.05' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        },
        h1: {
          color: theme('colors.primary.500'),
          'font-size': theme('fontSize.4xl'),
          'font-weight': 'bold',
        },
        '.dark h1': {
          color: theme('colors.primary.300'),
        },
        h2: {
          color: theme('colors.primary.500'),
          'font-size': theme('fontSize.3xl'),
          'font-weight': 'bold',
        },
        '.dark h2': {
          color: theme('colors.primary.300'),
        },
        h3: {
          color: theme('colors.primary.500'),
          'font-size': theme('fontSize.2xl'),
          'font-weight': 'bold',
        },
        '.dark h3': {
          color: theme('colors.primary.300'),
        },
        h4: {
          color: theme('colors.primary.500'),
          'font-size': theme('fontSize.xl'),
          'font-weight': 'bold',
        },
        '.dark h4': {
          color: theme('colors.primary.300'),
        },
        p: {
          margin: '1rem 0',
        },
        hr: {
          border: `1px solid ${theme('colors.primary.800')}`,
          opacity: '0.8',
          margin: '0.5rem 0',
        },
        '.dark hr': {
          border: `1px solid ${theme('colors.primary.300')}`,
          opacity: '0.3',
        },
        'svg[viewBox]': {
          width: theme('spacing.6'),
          height: theme('spacing.6'),
        },
        button: {
          color: theme('colors.primary.500'),
          display: 'inline-flex',
          gap: theme('spacing.2'),
          'box-shadow': shadow['.shadow-glass-sm']['box-shadow'],
          'font-weight': 'bold',
          'background-color': hexToRGB(theme('colors.primary.500'), '0.2'),
          padding: `${theme('padding.2')} ${theme('padding.4')}`,
          'border-radius': theme('borderRadius.lg'),
          'border-width': theme('borderWidth.DEFAULT'),
          'border-color': hexToRGB(theme('colors.primary.500'), '0.4'),
          '&:hover': {
            'background-color': hexToRGB(theme('colors.primary.600'), '0.1'),
            'border-color': hexToRGB(theme('colors.primary.600'), '0.3'),
            animation: theme('animation.pulse'),
          },
          '&:focus': {
            outline: 'none',
          },
          '&:focus-visible': {
            outline: 'none',
          },
          '&:disabled': {
            'background-color': hexToRGB(theme('colors.gray.700'), '0.3'),
            'border-color': hexToRGB(theme('colors.gray.500'), '0.3'),
            color: theme('colors.gray.500'),
            animation: 'none'
          },
        },
        '.dark button': {
          color: theme('colors.primary.300'),
          'background-color': hexToRGB(theme('colors.primary.300'), '0.2'),
          'border-color': hexToRGB(theme('colors.primary.300'), '0.4'),
          '&:hover': {
            'background-color': hexToRGB(theme('colors.primary.400'), '0.1'),
            'border-color': hexToRGB(theme('colors.primary.400'), '0.3'),
          },
          '&:disabled': {
            'background-color': hexToRGB(theme('colors.gray.500'), '0.3'),
            'border-color': hexToRGB(theme('colors.gray.300'), '0.3'),
            color: theme('colors.gray.300'),
          },
        },
        a: {
          color: theme('colors.primary.500'),
          '&:hover': {
            color: theme('colors.primary.600'),
            animation: theme('animation.pulse'),
          },
        },
        '.dark a': {
          color: theme('colors.primary.300'),
          '&:hover': {
            color: theme('colors.primary.400'),
          },
        },
        label: {
          'text-transform': 'uppercase',
          'font-size': theme('fontSize.sm'),
          // opacity: theme('opacity.0'),
        },
        input: {
          width: '100%',
          appearance: 'none !important',
          padding: theme('padding.2'),
          'border-radius': theme('borderRadius.lg'),
          'border-color': theme('borderColor.gray.500'),
          'border-width': theme('borderWidth.2'),
          background: theme('colors.transparent'),
          'box-shadow': theme('shadow.sm'),
          '&:hover': {
            animation: theme('animation.pulse'),
            'border-color': theme('borderColor.primary.500'),
          },
          '&:focus': {
            'border-color': theme('borderColor.primary.500'),
            animation: theme('animation.pulse'),
          },
          '&:focus-visible': {
            outline: 'none !important',
          },
        },
        'input[type="checkbox"]': {
          width: 'auto',
          'border-radius': theme('borderRadius.DEFAULT'),
          appearance: 'none',
          'min-width': theme('spacing.6'),
          'min-height': theme('spacing.6'),
          '&:checked': {
            'border-color': theme('borderColor.primary.500'),
            'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' className='h-full w-full' viewBox='0 0 20 20' fill='${hexToRGB(
              theme('colors.primary.500')
            )}'%3E%3Cpath fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' /%3E%3C/svg%3E")`,
          },
          '&:hover': {
            animation: theme('animation.pulse'),
            'border-color': theme('borderColor.primary.500'),
          },
        },
        '.dark input[type="checkbox"]': {
          '&:checked': {
            'border-color': theme('borderColor.primary.300'),
            'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' className='h-full w-full' viewBox='0 0 20 20' fill='${hexToRGB(
              theme('colors.primary.300')
            )}'%3E%3Cpath fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' /%3E%3C/svg%3E")`,
          },
          '&:hover': {
            'border-color': theme('borderColor.primary.300'),
          },
        },
        'select': {
          width: '100%',
          appearance: 'none',
          padding: theme('padding.2'),
          'border-radius': theme('borderRadius.lg'),
          'border-color': theme('borderColor.gray.500'),
          'border-width': theme('borderWidth.2'),
          'background-color': theme('colors.transparent'),
          'background-image': `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' class='h-full w-full' viewBox='0 0 20 20' fill='${hexToRGB(
            theme('colors.primary.500')
          )}'%3e%3cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3e%3c/svg%3e")`,
          'background-position': `right ${theme('spacing.2')} center`,
          'background-repeat': `no-repeat`,
          'box-shadow': theme('shadow.sm'),
          '&:hover': {
            animation: theme('animation.pulse'),
            'border-color': theme('borderColor.primary.500'),
          },
          '&:focus': {
            'border-color': theme('borderColor.primary.500'),
            animation: theme('animation.pulse'),
          },
          '&:focus-visible': {
            outline: 'none',
          },
        },
        'select option': {
          'background-color': theme('borderColor.gray.200'),
        },
        '.dark select option': {
          'background-color': theme('borderColor.gray.800'),
        },
        '@keyframes pulse': theme('keyframes.pulse'),
        '@keyframes spin': theme('keyframes.spin'),
        '@keyframes ping': theme('keyframes.ping'),
        '@keyframes bounce': theme('keyframes.bounce'),
      });
    }),
  ],
};

module.exports = { ...config, hexToRGB };
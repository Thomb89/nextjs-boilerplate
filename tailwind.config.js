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
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      spacing: {
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
        gray: colors.coolGray,
        orange: colors.orange,
        primary: colors.orange,
        secondary: colors.blue,
      },
      width: {
        '160': '40rem'
      }
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus']
    },
  },
  plugins: [
    // plugin((options) => console.log(options)),
    plugin(({ addBase, addComponents, theme }) => {
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
          flex: '1 0 auto',
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
          'border-color': hexToRGB(theme('borderColor.secondary.500'), '0.3'),
          'border-width': theme('borderWidth.2'),
          'border-radius': theme('borderRadius.lg'),
          'box-shadow': shadow['.shadow-glass']['box-shadow'],
        },
        '.dark .tooltip': {
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          'background-color': theme('borderColor.gray.800'),
          'border-color': hexToRGB(theme('borderColor.secondary.300'), '0.3'),
        },
      };

      const container = {
        '.container-glass': {
          'box-shadow': shadow['.shadow-glass']['box-shadow'],
          'border-color': hexToRGB(theme('borderColor.gray.400'), '0.2'),
          'border-width': theme('borderWidth.DEFAULT'),
          'border-radius': theme('borderRadius.lg'),
          'background-color': hexToRGB(theme('borderColor.gray.300'), '0.1'),
          padding: theme('spacing.4'),
        },
        '.dark .container-glass': {
          'border-color': hexToRGB(theme('borderColor.gray.700'), '0.3'),
          'background-color': hexToRGB(theme('borderColor.gray.900'), '0.1'),
        }
      }

      addComponents([tooltip, shadow, container, headlesssUi]);

      addBase({
        '.dark body': { color: theme('colors.gray.100') },
        body: {
          color: theme('colors.gray.800'),
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
            'background-color': hexToRGB(theme('colors.secondary.600'), '0.1'),
            'border-color': hexToRGB(theme('colors.secondary.600'), '0.3'),
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
          padding: theme('padding.2'),
          'border-radius': theme('borderRadius.lg'),
          'border-color': theme('borderColor.gray.500'),
          'border-width': theme('borderWidth.2'),
          background: theme('colors.transparent'),
          'box-shadow': theme('shadow.sm'),
          '&:hover': {
            animation: theme('animation.pulse'),
            'border-color': theme('borderColor.secondary.500'),
          },
          '&:focus': {
            'border-color': theme('borderColor.primary.500'),
            animation: theme('animation.pulse'),
          },
          '&:focus-visible': {
            outline: 'none',
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
            'border-color': theme('borderColor.secondary.500'),
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
            'border-color': theme('borderColor.secondary.500'),
          },
          '&:focus': {
            'border-color': theme('borderColor.primary.500'),
            animation: theme('animation.pulse'),
          },
          '&:focus-visible': {
            outline: 'none',
          },
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
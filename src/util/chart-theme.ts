import { Theme, Colors } from '@nivo/core';
import { theme } from '../../tailwind.config';

export const getChartColors = (isDark: boolean): Colors => [
  theme.extend.colors.primary[isDark ? 300 : 500],
  theme.extend.colors.primary[isDark ? 200 : 600],
  theme.extend.colors.primary[isDark ? 400 : 300],
  theme.extend.colors.primary[isDark ? 100 : 400],
  theme.extend.colors.primary[isDark ? 500 : 700],
];

export const getChartTheme = (isDark: boolean): Theme => ({
  background: 'transparent',
  textColor: theme.extend.colors.primary[isDark ? 300 : 500],
  fontSize: 12,
  grid: {
    line: {
      stroke: theme.extend.colors.gray[isDark ? 700 : 300],
    },
  },
  axis: {
    domain: {
      line: {
        stroke: theme.extend.colors.gray[isDark ? 800 : 400],
      },
    },
    ticks: {
      line: {
        stroke: theme.extend.colors.gray[isDark ? 800 : 400],
      },
    },
  },
  legends: {
    hidden: {
      symbol: {
        fill: theme.extend.colors.gray[isDark ? 400 : 900],
      },
      text: {
        fill: theme.extend.colors.gray[isDark ? 400 : 900],
      },
    },
  },
  labels: {
    text: {
      color: theme.extend.colors.primary[isDark ? 300 : 500],
      fill: theme.extend.colors.primary[isDark ? 800 : 200],
    },
  },
  tooltip: {
    container: {
      background: theme.extend.colors.gray[isDark ? 800 : 200],
    },
  },
});

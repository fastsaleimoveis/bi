'use client';

import {
  MantineThemeOverride,
  VariantColorsResolver,
  defaultVariantColorsResolver,
  parseThemeColor,
  rgba,
} from '@mantine/core';

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolved = defaultVariantColorsResolver(input);

  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  if (input.variant === 'outline') {
    return {
      border: `1px solid ${parsedColor.value}`,
      color: parsedColor.value,
      background: 'transparent',
      hover: rgba('#456846', 1),
      hoverColor: '#ffffff',   
    };
  }


  return defaultResolved;
};

const mantineTheme: MantineThemeOverride = {
  colors: {
    fast: [
      "#f3f7f3",
      "#e6ebe6",
      "#c8d5c9",
      "#a8c0a9",
      "#8dad8d",
      "#7ba17b",
      "#719b72",
      "#608861",
      "#547854",
      "#456846"
    ],
  },
  primaryColor: 'fast',

  variantColorResolver,
};

export default mantineTheme;

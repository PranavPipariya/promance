// Bumble-inspired color scheme
export const theme = {
  colors: {
    // Primary yellow (Bumble's signature color)
    primary: '#FFC629',
    primaryDark: '#F5B800',
    primaryLight: '#FFD952',

    // Secondary colors
    secondary: '#FFE17B',
    accent: '#FF6B6B',
    success: '#00D39F',

    // Backgrounds - Bumble's warm cream aesthetic
    bgLight: '#FFF8E7',     // Warm cream background (Bumble's signature)
    bgWhite: '#FFFEF9',     // Slightly warm white for cards
    bgGray: '#FFF4D6',      // Lighter yellow tint

    // Text - strong contrast like Bumble
    textPrimary: '#1A1A1A',  // Softer black
    textSecondary: '#646464',
    textMuted: '#999999',

    // Borders
    border: '#FFE8B8',       // Warm yellow border
    borderLight: '#FFF0CC',
  },

  fonts: {
    heading: 'system-ui, -apple-system, sans-serif',
    body: 'system-ui, -apple-system, sans-serif',
  },

  shadows: {
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    cardHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    button: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  },
};

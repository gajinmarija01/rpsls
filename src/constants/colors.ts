// Game color constants
// inspired by https://www.pinterest.com/search/pins/?q=synthwave%20color%20palette
export const COLORS = {
    // Primary colors
    PRIMARY: '#ff00a6',
    SECONDARY: '#00ffe7',

    // Game state colors
    WIN: '#00ff85',
    LOSE: '#ff0059',
    TIE: '#00ffe7',

    // Background colors
    BG_DARK: '#181825',
    BG_PANEL: 'rgba(35, 35, 71, 0.9)',

    // Text colors
    TEXT_LIGHT: '#ffffff',
    TEXT_DARK: '#000000',

    // Accent colors
    ACCENT: '#00ccff',
    ERROR: '#dc2626',
    SUCCESS: '#4caf50',

    // Additional colors
    GRAY_LIGHT: '#3a3a5a',
    GRAY_DARK: '#4a4a6a',
    BORDER_DARK: '#b91c1c'
} as const

// Spacing constants
export const SPACING = {
    XS: '0.5rem',
    SM: '1rem',
    MD: '1.5rem',
    LG: '2rem',
    XL: '2.5rem'
} as const

// Border radius constants
export const BORDER_RADIUS = {
    SM: '0.5rem',
    MD: '1rem',
    LG: '1.25rem'
} as const

// Border width constants
export const BORDER_WIDTH = {
    THIN: '2px',
    THICK: '3px'
} as const
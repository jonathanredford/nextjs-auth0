module.exports = {
    mode: 'jit',
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
    theme: {
        minHeight: {
          'screen-25': '25vh',
          'screen-50': '50vh',
          'screen-75': '75vh',
        },
        gradientColorStops: theme => ({
            ...theme('colors'),
            'gray-900-opacity-10': 'rgba(17, 24, 39, 0.10)',
            'gray-900-opacity-20': 'rgba(17, 24, 39, 0.20)',
            'gray-900-opacity-25': 'rgba(17, 24, 39, 0.25)',
            'gray-900-opacity-30': 'rgba(17, 24, 39, 0.30)',
            'gray-900-opacity-40': 'rgba(17, 24, 39, 0.40)',
            'gray-900-opacity-50': 'rgba(17, 24, 39, 0.50)',
            'gray-900-opacity-60': 'rgba(17, 24, 39, 0.60)',
            'gray-900-opacity-70': 'rgba(17, 24, 39, 0.70)',
            'gray-900-opacity-75': 'rgba(17, 24, 39, 0.75)',
            'gray-900-opacity-80': 'rgba(17, 24, 39, 0.80)',
            'gray-900-opacity-90': 'rgba(17, 24, 39, 0.90)',
        }),
        extend: {
            colors: {
                'accent-1': '#333',
            },
            zIndex: {
                '-1': '-1'
            }
        },
    },
    variants: {},
    plugins: [
        require('@tailwindcss/aspect-ratio')
    ],
}

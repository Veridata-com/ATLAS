// Typography system for Atlas app
export const typography = {
    // Font family
    fontFamily: {
        regular: 'System',
        medium: 'System',
        bold: 'System',
    },

    // Font sizes
    fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 32,
        display: 40,
    },

    // Font weights
    fontWeight: {
        regular: '400' as const,
        medium: '500' as const,
        semiBold: '600' as const,
        bold: '700' as const,
    },

    // Line heights
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
    },

    // Letter spacing
    letterSpacing: {
        tight: -0.5,
        normal: 0,
        wide: 0.5,
    },
};

// Common text styles
export const textStyles = {
    // Display title (Guide titles)
    display: {
        fontSize: typography.fontSize.display,
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
    },

    // Headings
    h1: {
        fontSize: typography.fontSize.xxxl,
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
    },
    h2: {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.semiBold,
        lineHeight: typography.lineHeight.normal,
    },
    h3: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.semiBold,
        lineHeight: typography.lineHeight.normal,
    },

    // Body text
    body: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.relaxed,
    },
    bodyLarge: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.relaxed,
    },
    bodySmall: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.normal,
    },

    // Labels and UI
    label: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.medium,
        lineHeight: typography.lineHeight.normal,
    },
    caption: {
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.normal,
    },

    // Buttons
    button: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semiBold,
        lineHeight: typography.lineHeight.normal,
    },
};

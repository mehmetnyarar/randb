/**
 * Basic colors.
 */
export interface BasicColorPalette extends Record<string, string> {
  'color-basic-100': string
  'color-basic-200': string
  'color-basic-300': string
  'color-basic-400': string
  'color-basic-500': string
  'color-basic-600': string
  'color-basic-700': string
  'color-basic-800': string
  'color-basic-900': string
  'color-basic-1000': string
  'color-basic-1100': string
  'color-basic-transparent-100': string
  'color-basic-transparent-200': string
  'color-basic-transparent-300': string
  'color-basic-transparent-400': string
  'color-basic-transparent-500': string
  'color-basic-transparent-600': string
  'color-basic-control-transparent-100': string
  'color-basic-control-transparent-200': string
  'color-basic-control-transparent-300': string
  'color-basic-control-transparent-400': string
  'color-basic-control-transparent-500': string
  'color-basic-control-transparent-600': string
}

/**
 * Brand colors.
 */
export interface BrandColorPalette extends Record<string, string> {
  // primary
  'color-primary-100': string
  'color-primary-200': string
  'color-primary-300': string
  'color-primary-400': string
  'color-primary-500': string
  'color-primary-600': string
  'color-primary-700': string
  'color-primary-800': string
  'color-primary-900': string
  'color-primary-transparent-100': string
  'color-primary-transparent-200': string
  'color-primary-transparent-300': string
  'color-primary-transparent-400': string
  'color-primary-transparent-500': string
  'color-primary-transparent-600': string
  // success
  'color-success-100': string
  'color-success-200': string
  'color-success-300': string
  'color-success-400': string
  'color-success-500': string
  'color-success-600': string
  'color-success-700': string
  'color-success-800': string
  'color-success-900': string
  'color-success-transparent-100': string
  'color-success-transparent-200': string
  'color-success-transparent-300': string
  'color-success-transparent-400': string
  'color-success-transparent-500': string
  'color-success-transparent-600': string
  // info
  'color-info-100': string
  'color-info-200': string
  'color-info-300': string
  'color-info-400': string
  'color-info-500': string
  'color-info-600': string
  'color-info-700': string
  'color-info-800': string
  'color-info-900': string
  'color-info-transparent-100': string
  'color-info-transparent-200': string
  'color-info-transparent-300': string
  'color-info-transparent-400': string
  'color-info-transparent-500': string
  'color-info-transparent-600': string
  // warning
  'color-warning-100': string
  'color-warning-200': string
  'color-warning-300': string
  'color-warning-400': string
  'color-warning-500': string
  'color-warning-600': string
  'color-warning-700': string
  'color-warning-800': string
  'color-warning-900': string
  'color-warning-transparent-100': string
  'color-warning-transparent-200': string
  'color-warning-transparent-300': string
  'color-warning-transparent-400': string
  'color-warning-transparent-500': string
  'color-warning-transparent-600': string
  // danger
  'color-danger-100': string
  'color-danger-200': string
  'color-danger-300': string
  'color-danger-400': string
  'color-danger-500': string
  'color-danger-600': string
  'color-danger-700': string
  'color-danger-800': string
  'color-danger-900': string
  'color-danger-transparent-100': string
  'color-danger-transparent-200': string
  'color-danger-transparent-300': string
  'color-danger-transparent-400': string
  'color-danger-transparent-500': string
  'color-danger-transparent-600': string
}

/**
 * Mapped colors.
 */
export interface MappedColorPalette extends Record<string, string> {
  'color-basic-focus': string
  'color-basic-hover': string
  'color-basic-default': string
  'color-basic-active': string
  'color-basic-disabled': string
  'color-basic-focus-border': string
  'color-basic-hover-border': string
  'color-basic-default-border': string
  'color-basic-active-border': string
  'color-basic-disabled-border': string
  'color-basic-transparent-focus': string
  'color-basic-transparent-hover': string
  'color-basic-transparent-default': string
  'color-basic-transparent-active': string
  'color-basic-transparent-disabled': string
  'color-basic-transparent-focus-border': string
  'color-basic-transparent-hover-border': string
  'color-basic-transparent-default-border': string
  'color-basic-transparent-active-border': string
  'color-basic-transparent-disabled-border': string
  'color-primary-focus': string
  'color-primary-hover': string
  'color-primary-default': string
  'color-primary-active': string
  'color-primary-disabled': string
  'color-primary-focus-border': string
  'color-primary-hover-border': string
  'color-primary-default-border': string
  'color-primary-active-border': string
  'color-primary-disabled-border': string
  'color-primary-transparent-focus': string
  'color-primary-transparent-hover': string
  'color-primary-transparent-default': string
  'color-primary-transparent-active': string
  'color-primary-transparent-disabled': string
  'color-primary-transparent-focus-border': string
  'color-primary-transparent-hover-border': string
  'color-primary-transparent-default-border': string
  'color-primary-transparent-active-border': string
  'color-primary-transparent-disabled-border': string
  'color-success-focus': string
  'color-success-hover': string
  'color-success-default': string
  'color-success-active': string
  'color-success-disabled': string
  'color-success-focus-border': string
  'color-success-hover-border': string
  'color-success-default-border': string
  'color-success-active-border': string
  'color-success-disabled-border': string
  'color-success-transparent-focus': string
  'color-success-transparent-hover': string
  'color-success-transparent-default': string
  'color-success-transparent-active': string
  'color-success-transparent-disabled': string
  'color-success-transparent-focus-border': string
  'color-success-transparent-hover-border': string
  'color-success-transparent-default-border': string
  'color-success-transparent-active-border': string
  'color-success-transparent-disabled-border': string
  'color-info-focus': string
  'color-info-hover': string
  'color-info-default': string
  'color-info-active': string
  'color-info-disabled': string
  'color-info-focus-border': string
  'color-info-hover-border': string
  'color-info-default-border': string
  'color-info-active-border': string
  'color-info-disabled-border': string
  'color-info-transparent-focus': string
  'color-info-transparent-hover': string
  'color-info-transparent-default': string
  'color-info-transparent-active': string
  'color-info-transparent-disabled': string
  'color-info-transparent-focus-border': string
  'color-info-transparent-hover-border': string
  'color-info-transparent-default-border': string
  'color-info-transparent-active-border': string
  'color-info-transparent-disabled-border': string
  'color-warning-focus': string
  'color-warning-hover': string
  'color-warning-default': string
  'color-warning-active': string
  'color-warning-disabled': string
  'color-warning-focus-border': string
  'color-warning-hover-border': string
  'color-warning-default-border': string
  'color-warning-active-border': string
  'color-warning-disabled-border': string
  'color-warning-transparent-focus': string
  'color-warning-transparent-hover': string
  'color-warning-transparent-default': string
  'color-warning-transparent-active': string
  'color-warning-transparent-disabled': string
  'color-warning-transparent-focus-border': string
  'color-warning-transparent-hover-border': string
  'color-warning-transparent-default-border': string
  'color-warning-transparent-active-border': string
  'color-warning-transparent-disabled-border': string
  'color-danger-focus': string
  'color-danger-hover': string
  'color-danger-default': string
  'color-danger-active': string
  'color-danger-disabled': string
  'color-danger-focus-border': string
  'color-danger-hover-border': string
  'color-danger-default-border': string
  'color-danger-active-border': string
  'color-danger-disabled-border': string
  'color-danger-transparent-focus': string
  'color-danger-transparent-hover': string
  'color-danger-transparent-default': string
  'color-danger-transparent-active': string
  'color-danger-transparent-disabled': string
  'color-danger-transparent-focus-border': string
  'color-danger-transparent-hover-border': string
  'color-danger-transparent-default-border': string
  'color-danger-transparent-active-border': string
  'color-danger-transparent-disabled-border': string
  'color-control-focus': string
  'color-control-hover': string
  'color-control-default': string
  'color-control-active': string
  'color-control-disabled': string
  'color-control-focus-border': string
  'color-control-hover-border': string
  'color-control-default-border': string
  'color-control-active-border': string
  'color-control-disabled-border': string
  'color-control-transparent-focus': string
  'color-control-transparent-hover': string
  'color-control-transparent-default': string
  'color-control-transparent-active': string
  'color-control-transparent-disabled': string
  'color-control-transparent-focus-border': string
  'color-control-transparent-hover-border': string
  'color-control-transparent-default-border': string
  'color-control-transparent-active-border': string
  'color-control-transparent-disabled-border': string
  'background-basic-color-1': string
  'background-basic-color-2': string
  'background-basic-color-3': string
  'background-basic-color-4': string
  'background-alternative-color-1': string
  'background-alternative-color-2': string
  'background-alternative-color-3': string
  'background-alternative-color-4': string
  'border-basic-color-1': string
  'border-basic-color-2': string
  'border-basic-color-3': string
  'border-basic-color-4': string
  'border-basic-color-5': string
  'border-alternative-color-1': string
  'border-alternative-color-2': string
  'border-alternative-color-3': string
  'border-alternative-color-4': string
  'border-alternative-color-5': string
  'border-primary-color-1': string
  'border-primary-color-2': string
  'border-primary-color-3': string
  'border-primary-color-4': string
  'border-primary-color-5': string
  'border-success-color-1': string
  'border-success-color-2': string
  'border-success-color-3': string
  'border-success-color-4': string
  'border-success-color-5': string
  'border-info-color-1': string
  'border-info-color-2': string
  'border-info-color-3': string
  'border-info-color-4': string
  'border-info-color-5': string
  'border-warning-color-1': string
  'border-warning-color-2': string
  'border-warning-color-3': string
  'border-warning-color-4': string
  'border-warning-color-5': string
  'border-danger-color-1': string
  'border-danger-color-2': string
  'border-danger-color-3': string
  'border-danger-color-4': string
  'border-danger-color-5': string
  'text-basic-color': string
  'text-alternate-color': string
  'text-control-color': string
  'text-disabled-color': string
  'text-hint-color': string
  'text-primary-color': string
  'text-primary-focus-color': string
  'text-primary-hover-color': string
  'text-primary-active-color': string
  'text-primary-disabled-color': string
  'text-success-color': string
  'text-success-focus-color': string
  'text-success-hover-color': string
  'text-success-active-color': string
  'text-success-disabled-color': string
  'text-info-color': string
  'text-info-focus-color': string
  'text-info-hover-color': string
  'text-info-active-color': string
  'text-info-disabled-color': string
  'text-warning-color': string
  'text-warning-focus-color': string
  'text-warning-hover-color': string
  'text-warning-active-color': string
  'text-warning-disabled-color': string
  'text-danger-color': string
  'text-danger-focus-color': string
  'text-danger-hover-color': string
  'text-danger-active-color': string
  'text-danger-disabled-color': string
  'outline-color': string
}

/**
 * Color palette.
 */
export interface ColorPalette
  extends Record<string, string>,
    BasicColorPalette,
    BrandColorPalette,
    MappedColorPalette {}

/**
 * Color scheme.
 */
export type ColorScheme = 'dark' | 'light'

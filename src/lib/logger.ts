/**
 * Shared logger utility for consistent logging across the application.
 *
 * - Development: Logs all messages to console
 * - Production: Only logs errors (warnings are suppressed)
 *
 * This provides a centralized place to control logging behavior
 * and could be extended to send errors to external services.
 */

const isDev = import.meta.env.DEV

/**
 * Log a warning message (development only).
 */
export function warn(message: string, ...args: unknown[]): void {
  if (isDev) {
    console.warn(message, ...args)
  }
}

/**
 * Log an error message (always logged).
 * In production, this could be extended to send to Sentry, LogRocket, etc.
 */
export function error(message: string, ...args: unknown[]): void {
  console.error(message, ...args)
  // TODO: Add production error reporting (Sentry, LogRocket, etc.)
}

/**
 * Log an info message (development only).
 */
export function info(message: string, ...args: unknown[]): void {
  if (isDev) {
    console.info(message, ...args)
  }
}

/**
 * Log a debug message (development only).
 */
export function debug(message: string, ...args: unknown[]): void {
  if (isDev) {
    console.debug(message, ...args)
  }
}

export const logger = {
  warn,
  error,
  info,
  debug,
}

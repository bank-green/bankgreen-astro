import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { useRef, useState } from 'react'

export interface TurnstileState {
  widget: React.ReactNode

  token: string

  pending: boolean

  reset: () => void
}

export function useTurnstile(): TurnstileState {
  const ref = useRef<TurnstileInstance>(null)
  const [token, setToken] = useState('')

  const sitekey = import.meta.env.PUBLIC_CLOUDFLARE_CAPTCHA_SITEKEY
  const testMode = import.meta.env.PUBLIC_CAPTCHA_TEST_MODE === 'true'
  const enabled = !import.meta.env.DEV || testMode

  return {
    widget:
      sitekey && enabled ? (
        <Turnstile
          ref={ref}
          className="self-center"
          siteKey={sitekey}
          options={{ appearance: 'interaction-only' }}
          onSuccess={setToken}
          onExpire={() => setToken('')}
          onError={() => true}
        />
      ) : null,
    token,
    pending: Boolean(sitekey) && enabled && !token,
    reset: () => ref.current?.reset(),
  }
}

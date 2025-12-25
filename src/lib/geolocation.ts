export interface LocationData {
  country: string | null
  region: string | null
  regionCode: string | null
}

/**
 * Detect user's location (country and state/region) based on IP address
 * Uses ip-api.com free tier via server-side proxy (up to 45 requests per minute),
 * or Cloudflare's built-in geolocation headers if available.
 * Returns both country code and region/state information
 */
export async function detectUserLocation(): Promise<LocationData> {
  try {
    const response = await fetch('/api/geolocation')

    if (!response.ok) {
      console.warn('Failed to detect user location:', response.statusText)
      return { country: null, region: null, regionCode: null }
    }

    const data: LocationData = await response.json()
    return data
  } catch (error) {
    console.error('Error detecting user location:', error)
    return { country: null, region: null, regionCode: null }
  }
}

/**
 * Backwards compatible: detect user's country only
 */
export async function detectUserCountry(): Promise<string | null> {
  const location = await detectUserLocation()
  return location.country
}

export interface LocationData {
  country: string | null
  region: string | null
  regionCode: string | null
}

/**
 * Detect user's location (country and state/region) based on IP address
 * Uses ipapi.co free tier (up to 1000 requests per day)
 * Returns both country code and region/state information
 */
export async function detectUserLocation(): Promise<LocationData> {
  try {
    const response = await fetch('https://ipapi.co/json/')

    if (!response.ok) {
      console.warn('Failed to detect user location:', response.statusText)
      return { country: null, region: null, regionCode: null }
    }

    const data = await response.json()

    // ipapi.co returns:
    // - country_code: ISO 3166-1 alpha-2 format (e.g., 'US', 'GB')
    // - region: full region/state name (e.g., 'California')
    // - region_code: state/region code (e.g., 'CA' for California)
    return {
      country: data.country_code || null,
      region: data.region || null,
      regionCode: data.region_code || null,
    }
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

const BankLogo = ({
  brandDomain,
  imgClass,
  size,
}: {
  brandDomain: string
  imgClass: string
  size: number
}) => {
  /** BrandFetch requires the client ID to be directly embedded in each request, so there's no point in obfuscating it */
  const brandFetchClientId = '1idgd9eLaoZ3OpDvC0X'

  const getSrc = (brandDomain: string) => {
    switch (brandDomain) {
      case 'monzo.com':
        return '/img/logos/monzo.png'
      case 'www.jpmorganchase.com':
        return '/img/logos/chase.png'
      case 'www.db.com':
        return '/img/logos/db.png'
      case 'www.helios.do':
        return '/img/logos/helios.png'
      case 'www.flowe.com':
        return '/img/logos/flowe.png'
      case 'www.bigpathcapital.com':
        return '/img/logos/bigpath.png'
      case 'www.amalgamatedbank.com':
        return '/img/logos/amalgamated.png'
      case 'green-got.com':
        return '/img/logos/green_got.png'
    }

    return `https://cdn.brandfetch.io/${brandDomain}/icon/fallback/lettermark/h/${size * 2}/w/${size * 2}?c=${brandFetchClientId}`
  }

  return (
    <img
      src={getSrc(brandDomain)}
      className={imgClass}
      width={size}
      height={size}
      alt={brandDomain}
    />
  )
}

export default BankLogo

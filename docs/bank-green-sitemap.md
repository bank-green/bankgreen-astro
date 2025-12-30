# Bank.Green Sitemap with Content Structure

## Global Elements (Present on All Pages)

### Header
- Logo (links to homepage)
- Main Navigation:
  - Sustainable banks → `/sustainable-eco-banks`
  - Blog → `/blog`
  - FAQ → `/faq`
  - Contact us → `/contact`
  - Take Action → `/take-action`
  - Switch Survey → `/impact`
  - Donate → `/donate`

### Footer
- Logo
- Column 1: Sustainable banks, Take Action, Donate, Fossil Free Certification
- Column 2: Blog, Our Partners, Press, Volunteering
- Column 3: Who we are, Contact us, FAQ
- Legal: "Bank.Green is a project of Empowerment Works Inc. 501(c)(3)"
- Links: Disclaimer, Privacy policy

---

## Static Pages

### `/` (Homepage)
**Title:** Find Ethical & Sustainable Banks In Your Area
**Rendering**: Prerendered (Static HTML)

**Content Sections:**
1. **Hero Section**
   - Headline: "Is your money being used to fund climate chaos?"
   - Bank lookup form (Country dropdown, Bank dropdown, "Check My Bank" button)

2. **Social Proof**
   - "As featured in" logos (Forbes, The New Yorker, Independent, The Big Issue)
   - "In association with" (BankTrack logo)
   - Link to Partners page

3. **Why Bank.Green Section**
   - Mission statement about fossil fuel financing
   - Statistics ($7.9 trillion to fossil fuels since Paris Agreement)
   - Call to action messaging

4. **Newsletter Signup Form**
   - Headline: "Start to Bank Green Today"
   - Three value propositions with checkmarks
   - Form fields: First name, Email, Status dropdown
   - Checkbox: Email opt-in
   - Checkbox: Privacy policy acceptance
   - Submit button

---

### `/green-banking-guide` (Green Banking Guide)
**Title:** Green Banking Guide
**Rendering**: Prerendered (Static HTML)

**Content Sections:**
1. **Guide Content**
   - Comprehensive guide to green banking
   - Tips for choosing sustainable banks
   - Environmental impact information
   - Content from Prismic CMS SliceZone

---

### `/materials` (Materials Page)
**Title:** Materials
**Rendering**: Prerendered (Static HTML)

**Content Sections:**
1. **Materials Library**
   - Downloadable resources
   - Educational materials
   - Campaign assets
   - Content from Prismic CMS SliceZone

---

### `/one-pager` (One Pager Document)
**Title:** One Pager
**Rendering**: Prerendered (Static HTML)

**Content Sections:**
1. **Summary Document**
   - Bank.Green mission and impact summary
   - Key statistics
   - Call to action
   - Content from Prismic CMS SliceZone

---

### `/one-pager-simple` (Simplified One Pager)
**Title:** One Pager Simple
**Rendering**: Prerendered (Static HTML)

**Content Sections:**
1. **Simplified Summary**
   - Condensed version of one-pager
   - Essential information only
   - Content from Prismic CMS SliceZone

---

### `/glossary` (Glossary)
**Title:** Glossary
**Rendering**: Prerendered (Static HTML)

**Content Sections:**
1. **Terms and Definitions**
   - Banking terminology
   - Climate finance terms
   - Sustainability definitions
   - Content from Prismic CMS SliceZone

---

### `/sustainable-eco-banks` (Sustainable Banks Directory)
**Title:** Find Green & Sustainable Banks In Your Area
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Hero Section**
   - Headline: "Find the Best Green Banks in Your Area"
   - Introduction text about green banking

2. **Why Find a Green Bank**
   - Explanation of how bank deposits fund projects
   - Link to methodology page

3. **What is the Fossil Free Alliance**
   - Expandable section explaining the alliance
   - Statistics on fossil fuel financing since Paris Agreement
   - Fossil Free Alliance badge explanation
   - Contact email for banks wanting to join

4. **Bank Directory** (dynamic, filterable)
   - List of sustainable banks with ratings
   - Filter options by country/region

5. **FAQ Section** (expandable accordions)
   - How can I tell if my current bank is sustainable?
   - What is eco banking?
   - What eco-friendly banking options are available?
   - What should I look for in a sustainable bank?
   - What are the most well-known environmental certifications?
   - Difference between ethical/socially responsible and sustainable/eco bank?

6. **Happy Banking Stories**
   - Three example stories (Bank Australia, Beneficial State Bank, Triodos Bank)

---

### `/banks/[bank_slug]` (Individual Bank Score Page - BAD rating variant)
**Title:** [Bank Name]'s Climate Score
**Rendering**: SSR (Server-Rendered) - Full SSR to support unlimited banks from GraphQL database

**Content Sections:**
1. **Bank Header**
   - Bank name
   - Ranking badge (e.g., "#1 in the world for fossil fuel financing")
   - Link to methodology
   - Last rated date
   - Rating statement: "Your bank is failing on climate responsibility"

2. **Fossil Fuel Financing Stats**
   - Specific dollar amounts financed
   - Time period covered
   - Link to data source

3. **Call to Action**
   - "Move Your Money" button → `/sustainable-eco-banks`

4. **Detailed Explanation Section**
   - Specific financing activities
   - Comparison data
   - Industry rankings

5. **Paris Agreement Section**
   - Explanation of climate goals
   - IPCC warnings about warming

6. **Start to Bank Green Today**
   - Three value propositions
   - "Move Your Money Today" button

7. **Methodology Link**
   - "How do we derive our results?" with link

---

### `/banks/[bank_slug]` (Individual Bank Score Page - GOOD rating variant)
**Title:** [Bank Name]'s Climate Score
**Rendering**: SSR (Server-Rendered) - Same route as BAD variant, different content based on rating

**Content Sections:**
1. **Bank Header**
   - Bank name
   - Fossil Free Certification badge (if applicable)
   - Link to methodology
   - Last rated date
   - Rating statement: "Your bank is a leader in climate responsibility"

2. **Positive Messaging**
   - Confirmation money isn't funding fossil fuels
   - Encouragement to spread the word

3. **Join the Money Movement Section**
   - Three value propositions (Learn, Join campaigns, Discover)
   - Newsletter signup form

4. **Methodology Link**

---

### `/sustainable-eco-banks/[bank_slug]` (Sustainable Bank Profile Page)
**Title:** [Bank Name] Review and Service Offering
**Rendering**: Prerendered (Static HTML) - Uses `getStaticPaths()` to generate routes at build time

**Content Sections:**
1. **Bank Header**
   - Bank logo
   - Bank name
   - Link to methodology
   - Last rated date

2. **Our Take Section**
   - Editorial description of the bank
   - Key features and offerings

3. **Overview Tab**
   - Founded date
   - Policies (Environmental Policy, Deposit Protection badges)
   - Customers served (Retail/Individual, etc.)
   - Services (Mobile Banking, ATM Network, etc.)
   - Fees summary

4. **Service Tabs** (Personal, Nonprofit, Government, SMEs, Corporate)
   - Accounts available (Checking, Savings, Wealth management)
   - Interest rates
   - Fees
   - Loans available
   - Loan interest rates and fees

5. **Lead Generation Form**
   - "Curious about switching to a green bank?"
   - Three value propositions
   - Form: Bank interest, First name, Email, Status dropdown
   - Privacy consent checkboxes

---

### `/blog` (Blog Index)
**Title:** Bank.Green Blog: Stories and Tips for Divesting From Fossil Fuels
**Rendering**: Prerendered (Static HTML)

**Content Sections:**
1. **Page Header**
   - Title

2. **Blog Post Grid**
   - Featured image
   - Date
   - Title
   - Excerpt
   - "Read full story" link
   - (Displays ~40+ posts, paginated or infinite scroll)

---

### `/blog/[post_slug]` (Individual Blog Post)
**Rendering**: Prerendered (Static HTML) - Uses `getStaticPaths()` to generate routes from Prismic

**Content Sections:**
1. **Post Header**
   - Featured image
   - Title
   - Date
   - Author (if applicable)

2. **Post Body**
   - Rich text content from Prismic CMS
   - Embedded images
   - Links

3. **Call to Action Section**
   - "Start to Bank Green Today" or similar
   - Newsletter signup or action buttons

---

### `/team` (Who We Are)
**Title:** Bank Green Team - Who we are
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Origin Story**
   - Founding story (Albert Carter, Ilias Ism, Neil Simpson, Zak Gottlieb)
   - Mission explanation
   - Focus on fossil fuel extraction
   - Call to volunteer

2. **Our Directors Section**
   - Photo, name, country flags
   - Bio for each director

3. **Meet the Team Section**
   - Department filter (All, Product & Engineering, Other, Content, Research, Development)
   - Team member cards:
     - Photo
     - Name with country flags
     - LinkedIn link (some)
     - Role/title
     - Bio paragraph

4. **View Alumni** button

---

### `/team/alumni` (Alumni Page)
**Title:** Bank Green Alumni
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Alumni Introduction**
   - Message about past contributors
   - Link back to current team

2. **Alumni Grid**
   - Photo, name, country flags
   - Role/title during tenure
   - Bio paragraph
   - LinkedIn links (where available)

---

### `/embrace` (Embrace Page)
**Title:** Embrace
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Embrace Form**
   - Form fields for engagement
   - Content from Prismic CMS SliceZone
   - Privacy consent checkboxes
   - Submit button

---

### `/green-policy-evaluator` (Green Policy Evaluator)
**Title:** Green Policy Evaluator
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Policy Evaluation Tool**
   - Interactive tool to evaluate bank policies
   - Form inputs and criteria
   - Results display
   - Content from Prismic CMS SliceZone

---

### `/not-listed` (Bank Not Listed)
**Title:** Bank Not Listed
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Not Listed Information**
   - Explanation of why bank might not be listed
   - How to request bank addition
   - Contact information
   - Alternative actions
   - Content from Prismic CMS SliceZone

---

### `/take-action` (Take Action)
**Title:** Take action!
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Introduction**
   - Empowerment messaging
   - "What can I do about this?"

2. **Action Tabs** (Pressure, Switch, Share, Learn)

3. **Apply Pressure Section**
   - Pledge signup explanation
   - Pledge form
   - "Start a conversation with a fossil bank" guidance

4. **Contact Methods** (expandable)
   - Make a phone call
   - Send an email or letter
   - Visit a local branch

5. **Start to Bank Green Today**
   - Three value propositions
   - "Move Your Money Today" button

---

### `/faq` (Frequently Asked Questions)
**Title:** Frequently Asked Questions
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **FAQ Accordions** (expandable questions)
   - Who is behind Bank.Green?
   - How is this project funded?
   - Do any team members have financial interests?
   - How can we get in touch?
   - Link between bank account and climate change?
   - How do you know what my bank funds?
   - My bank says it is sustainable - stay or go?
   - How do you assign bank ratings?
   - How do you research banks?
   - Is switching hard work?
   - Will switching cost more?
   - Will switching affect credit score?
   - What does "sustainable" really mean?
   - What will I actually divest from?
   - Already switched - what else can I do?
   - No bank account - how can I help?
   - Why consumer pressure and not shareholder engagement?
   - Why cut funding to fossil fuel industry?

2. **Newsletter Signup Form**
   - "Take action with Bank.Green"

---

### `/certification` (Fossil Free Certification)
**Title:** Fossil Free Certification
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Hero Section**
   - Fossil Free Certified badge image
   - Headline and description

2. **View Alliance Members** button

3. **Benefits of Certification** (bullet list)
   - Attract customers and employees
   - Access networks
   - Public relations benefits
   - Join a movement

4. **Steps of Certification** (numbered list)
   - CONNECT
   - SUBMIT
   - REVIEW
   - CERTIFY

5. **Contact Information**
   - Email: hello@bank.green

6. **FAQ Accordions**
   - Who is behind Fossil Free Certification?
   - Why does fossil fuel investment matter?
   - Difference from B Corp or GABV certification?
   - Cost of certification?

---

### `/volunteers` (Volunteering)
**Title:** Volunteering at Bank.Green
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Introduction**
   - Volunteer-led organization explanation
   - Contact email: volunteers@bank.green

2. **Role Listings** (each with description and time commitment)
   - Business Accreditation Program Volunteer (5-10 hrs)
   - Data Scientist (varies)
   - Product Owner (5-10 hrs)
   - Front-End Engineers (10-20 hrs)
   - Mid/Senior Backend Engineer - Python Flask (5-20 hrs)
   - Communications Team Member (5-20 hrs)
   - Content Writer (3+ hrs)
   - Bank Research Team (10-40 hrs)

3. **Links**
   - Roadmap and culture presentation PDF

4. **Contact Instructions**
   - Email with CV and availability

---

### `/contact` (Contact Us)
**Title:** Contact Us
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Introduction Text**
   - Guidance to include country
   - Link to reach out to own bank
   - Link to volunteer page

2. **Contact Form**
   - First name (optional)
   - Email address
   - Subject
   - Message
   - Email opt-in checkbox
   - Privacy policy checkbox
   - Send button

---

### `/donate` (Donate)
**Title:** Donate Now!
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Donation Pitch**
   - Impact messaging
   - Tax-deductibility note (501(c)(3))

2. **Donation Form/Widget**
   - (Likely embedded donation processor)

---

### `/partners` (Our Partners)
**Title:** Our Partners
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Header**
   - "Below is a list of our amazing partners..."

2. **Partner Logo Grid**
   - Clickable logos linking to partner sites:
     - BankTrack
     - Reclaim Finance
     - Extinction Rebellion
     - XR Youth
     - Urgewald
     - TNI
     - Portfolio.earth
     - Greenpeace UK
     - Bank on Our Future
     - Friends of the Earth Canada
     - The Climate App
     - Koala Kollektiv
     - Earth Hero
     - Climate Pledge Collective
     - Sunrise Boston
     - Below2C
     - Compendia
     - The Carbon Almanac

3. **Newsletter Signup Form**

---

### `/press` (Press/Media)
**Title:** Stories about Bank.Green
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Media Contact**
   - Email: hello@bank.green

2. **Press Release List**
   - Date, headline, excerpt for each release
   - Links to individual press release pages

---

### `/press/[release_slug]` (Individual Press Release)
**Rendering**: Prerendered (Static HTML) - Uses `getStaticPaths()` to generate routes from Prismic

**Example URLs:**
- `/press/alliance`
- `/press/uk-banks-climate-performance-ratings`
- `/press/us-banks-climate-performance-ratings`

**Content Sections:**
1. **Press Release Header**
   - Date
   - Location
   - Headline

2. **Press Release Body**
   - Full text with quotes
   - Statistics and findings
   - About section
   - Contact information
   - Links to related resources

---

### `/impact` (Switch Survey)
**Title:** Switch Survey / Impact Calculator
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Survey Form**
   - Questions about switching behavior
   - Impact calculation

---

### `/methodology` (Ratings Methodology)
**Title:** How Bank.Green rates institutions
**Rendering**: Prerendered (Static HTML)

**Content Sections:**
1. **Methodology Explanation**
   - Rating criteria
   - Data sources
   - Rating scale explanation

---

### `/privacy` (Privacy Policy)
**Title:** Privacy
**Rendering**: Prerendered (Static HTML)

**Content Sections:**
1. **Full Privacy Policy**
   - Data collection practices
   - Cookie usage
   - Third-party services (Twitter, TikTok, Zapier, Typeform, ActiveCampaign)
   - GDPR compliance
   - User rights

---

### `/disclaimer` (Disclaimer)
**Title:** Disclaimer
**Rendering**: Prerendered (Static HTML)

**Content Sections:**
1. **Legal Disclaimer**
   - Not responsible for financial losses
   - Third-party service issues disclaimer

---

### `/join` (Join the Movement)
**Title:** Join the Money Movement
**Rendering**: SSR (Server-Rendered)

**Content Sections:**
1. **Signup Form**
   - Newsletter/pledge signup

---

### `/accreditation/[slug]` (Accreditation Pages)
**Title:** Varies by accreditation
**Rendering**: Prerendered (Static HTML) - Uses `getStaticPaths()` to generate routes from Prismic

**Content Sections:**
1. **Hero Section**
   - Title, logo, description
   - Projects list

2. **Sharing Section**
   - Step 1: Social sharing links (Facebook, Instagram, X)
   - Step 2: Additional sharing instructions

3. **About Section**
   - Description and logo

---

### `/thanks/[type]` (Consolidated Thank You Pages)
**Title:** Thank You
**Rendering**: Prerendered (Static HTML) - Uses `getStaticPaths()` with predefined thank you page types

**Supported types:**
- `thanks` - General signup thank you
- `contact` - Contact form submission
- `embrace` - Embrace form submission
- `signup-later` - Email link signup
- `confirmed` - Email confirmation
- `donate-complete` - Donation completed
- `donate-cancelled` - Donation cancelled
- `updates-yes` - Opted in to updates
- `updates-no` - Opted out of updates

**Content Sections:**
1. **Confirmation Message**
   - Dynamic title and description based on type
   - SliceZone content from Prismic

2. **Explore Section** (most types)
   - Links to sustainable banks, blog, take action

---

## API Routes

The application provides three server-side API endpoints (all use `prerender: false` for on-demand execution):

### `POST /api/contact` (Contact Form Submission)
**Purpose**: Handles contact form submissions with spam protection and CRM integration.

**Request Body**:
- `email` (required) - Contact email address
- `firstName` (optional) - First name
- `subject` (optional) - Message subject
- `message` (optional) - Message content
- `emailOptIn` (optional) - Newsletter opt-in checkbox
- `cf-turnstile-response` (optional) - Cloudflare Turnstile captcha token

**Processing**:
1. Validates email is provided
2. Verifies Cloudflare Turnstile captcha (if token provided)
3. Extracts geolocation from Cloudflare headers:
   - `cf-connecting-ip` - User's IP address
   - `cf-ipcountry` - Country code
   - `cf-ipcity` - City name
4. Sends data to ActiveCampaign CRM
5. Returns `{ success: true }` or error response

**Error Responses**:
- `400` - Missing email or captcha verification failed
- `500` - Server error during submission

---

### `GET /api/geolocation` (User Location Detection)
**Purpose**: Detects user's geographic location for bank search personalization.

**Location Detection Strategy**:

**Production (Cloudflare Workers)**:
- Uses `request.cf` geolocation headers (free, unlimited)
- Returns `country`, `region`, `regionCode` from Cloudflare edge data
- Most accurate and performant option

**Development Mode**:
- Supports query parameters: `?country=US&state=CA`
- Supports environment variables: `DEV_LOCATION_COUNTRY`, `DEV_LOCATION_STATE`
- Allows testing location-specific features locally

**Fallback (ip-api.com)**:
- Free tier: 45 requests/minute
- CORS-enabled endpoint
- Used when Cloudflare headers unavailable

**Response Format**:
```json
{
  "country": "US",
  "region": "California",
  "regionCode": "CA"
}
```

**Null Values**: Returns `null` for each field if detection fails

---

### `POST /api/graphql` (GraphQL Proxy)
**Purpose**: Proxies GraphQL queries to the Django backend, used by React components and pages.

**Endpoint**: `https://data.bank.green/graphql`

**Request**:
- Accepts POST requests with GraphQL query/mutation in body
- Forwards query to Django GraphQL endpoint
- Returns JSON response from GraphQL server

**Usage**:
- Bank data fetching (ratings, profiles, tags)
- Sustainable bank information
- Called by `graphqlFetch()` helper in Astro pages
- Called by React components via client-side fetch

**Example Queries**:
- Fetch bank by tag
- Get all sustainable banks
- Search banks by country/region
- Retrieve bank ratings and methodology

---

## Dynamic Content Notes

### Bank Database
- ~55,000 banks in database
- ~588+ visible on website
- Two page types per bank:
  - `/banks/[slug]` - Climate score/rating page
  - `/sustainable-eco-banks/[slug]` - Detailed profile (for green banks)

### Blog
- ~45+ published posts
- Content from Prismic CMS
- Topics: Bank ratings, greenwashing, switching guides, climate policy, country-specific analyses

### Press Releases
- Multiple releases for major announcements
- Alliance announcements
- Country-specific rating releases (UK, US)

---

## Technical Architecture

### Technology Stack
- **Framework**: Astro 5.x with React 19 islands architecture
- **UI Components**: Mantine 8 with Tailwind CSS 4
- **Deployment**: Cloudflare Workers (hybrid rendering: server mode with selective prerendering)
- **Package Manager**: pnpm 9+
- **Node Version**: 20+

### Rendering Strategy
The site uses **hybrid rendering** with two approaches:

**Prerendered Pages** (Static HTML, built at build time):
- Marked with `export const prerender = true`
- Built as static HTML files served from Cloudflare's edge CDN
- Fastest performance, cached globally
- Used for: Blog posts, press releases, thank you pages, content pages, sustainable bank profiles

**SSR Pages** (Server-rendered on-demand via Cloudflare Workers):
- No `export const prerender` flag (defaults to SSR)
- Rendered on-demand by Cloudflare Workers
- Fresh data on every request
- Used for: Bank profiles (`/banks/*`), interactive pages with forms, pages requiring dynamic data

**Why `/banks/*` uses full SSR**:
- Astro's prerendering with `getStaticPaths()` only serves routes known at build time
- New banks can be added to GraphQL database anytime
- Full SSR ensures every bank route works without requiring a rebuild
- Trade-off: Slightly slower than prerendered pages, but ensures data freshness

### Client Interactivity
- **Static content pages**: No `client:*` directive - pure HTML (blog posts, methodology, glossary)
- **Interactive pages**: Use `client:load` for immediate hydration (forms, accordions, state management)
- **Standalone islands**: `GdprBanner` and `ExitIntentDialog` have their own MantineProvider

### Content Management
- **Prismic CMS**: Blog posts, press releases, page content via SliceZone system
- **GraphQL API**: Bank data, ratings, sustainable bank information
- **Data Fetching**: `graphqlFetch()` in Astro pages, `getSingleSafe()`, `getByUIDSafe()`, `getAllByTypeSafe()` for Prismic
- **Images**: Hosted on Prismic CDN

### Forms & Integrations
- **Contact forms**: Submit to `/api/contact` with Cloudflare Turnstile captcha
- **Geolocation**: `/api/geolocation` detects user location using Cloudflare headers
- **CRM**: ActiveCampaign for email marketing and contact management
- **GraphQL Proxy**: `/api/graphql` proxies queries to Django backend

---

## Complete Routing Reference

### Prerendered Pages (Static HTML)

| Route | Page Type | Data Source |
|-------|-----------|-------------|
| `/` | Homepage | Astro + Prismic |
| `/404` | Error page | Astro |
| `/disclaimer` | Legal | Prismic |
| `/glossary` | Content | Prismic |
| `/green-banking-guide` | Content | Prismic |
| `/materials` | Content | Prismic |
| `/methodology` | Content | Prismic |
| `/one-pager` | Content | Prismic |
| `/one-pager-simple` | Content | Prismic |
| `/privacy` | Legal | Prismic |
| `/blog` | Blog index | Prismic |
| `/blog/[slug]` | Blog post | Prismic (getStaticPaths) |
| `/press/[slug]` | Press release | Prismic (getStaticPaths) |
| `/thanks/[type]` | Thank you pages | Prismic (getStaticPaths) |
| `/accreditation/[slug]` | Accreditation pages | Prismic (getStaticPaths) |
| `/sustainable-eco-banks/[bankTag]` | Sustainable bank profiles | GraphQL + Prismic (getStaticPaths) |

### SSR Pages (Server-Rendered)

| Route | Page Type | Data Source | Why SSR? |
|-------|-----------|-------------|----------|
| `/banks/[bankTag]` | Bank climate scores | GraphQL (dynamic) | Supports unlimited banks, no rebuild needed |
| `/sustainable-eco-banks` | Bank directory index | GraphQL + Prismic | Dynamic filtering |
| `/press` | Press index | Prismic | Interactive content |
| `/blog` | Blog index | Prismic | Interactive content |
| `/certification` | Certification info | Prismic | Form interaction |
| `/contact` | Contact form | Prismic | Form submission |
| `/donate` | Donation page | Prismic | Form/widget interaction |
| `/embrace` | Embrace form | Prismic | Form submission |
| `/faq` | FAQ page | Prismic | Interactive accordions |
| `/green-policy-evaluator` | Policy tool | Prismic | Interactive tool |
| `/impact` | Switch survey | Prismic | Form/calculator |
| `/join` | Signup page | Prismic | Form submission |
| `/not-listed` | Info page | Prismic | Form interaction |
| `/partners` | Partners page | Prismic | Interactive content |
| `/take-action` | Action page | Prismic | Interactive tabs/forms |
| `/team` | Team page | Prismic | Interactive filtering |
| `/team/alumni` | Alumni page | Prismic | Interactive content |
| `/volunteers` | Volunteering page | Prismic | Content display |

### API Routes (Server-Only)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/contact` | POST | Contact form submission with Turnstile captcha |
| `/api/geolocation` | GET | User location detection (Cloudflare headers) |
| `/api/graphql` | POST | GraphQL proxy to Django backend |

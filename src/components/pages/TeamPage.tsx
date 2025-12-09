import { PageContent } from '@components/PageContent'
import type { PrismicDocument } from '@prismicio/client'
import { SliceZone } from '@slices'

interface TeamMemberSlice {
  slice_type: string
  primary: {
    department?: string
    name?: unknown
    description?: unknown
    img?: { url?: string }
    link?: unknown
  }
}

interface Props {
  page: PrismicDocument | null
}

export function TeamPage({ page }: Props) {
  const slices = page?.data?.slices
  const slices1 = (page?.data?.slices1 || []) as TeamMemberSlice[]

  // Filter directors from slices1
  const directors = slices1.filter((member) => member.primary?.department === 'Directors')

  // Get all non-director, non-alumni team members grouped by department
  const teamMembers = slices1.filter(
    (member) =>
      member.primary?.department !== 'Directors' && member.primary?.department !== 'Alumni'
  )

  // Get unique departments
  const departments = [
    ...new Set(teamMembers.map((m) => m.primary?.department).filter(Boolean)),
  ].sort()

  return (
    <PageContent>
      <article>
        {/* Intro content from slices */}
        <section>
          {slices ? (
            <SliceZone slices={slices} />
          ) : (
            <>
              <h1>Who we are</h1>
              <p>
                Bank.Green was founded by a group of volunteers in late 2020. Each of us had been
                working on ways to raise awareness about the climate crisis, without paying much
                attention to our money.
              </p>
            </>
          )}
        </section>

        {/* Directors section */}
        {directors.length > 0 && (
          <section>
            <h2>Our Directors</h2>
            <SliceZone slices={directors} />
          </section>
        )}

        {/* Team members section */}
        <section>
          <h2>Meet the Team</h2>

          {/* Department filter - placeholder for now */}
          <nav>
            <label htmlFor="department-filter">Department:</label>
            <select id="department-filter">
              <option value="">All</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </nav>

          {/* Team member cards */}
          <SliceZone slices={teamMembers} />
        </section>

        <footer>
          <a href="/team/alumni">View Alumni</a>
        </footer>
      </article>
    </PageContent>
  )
}

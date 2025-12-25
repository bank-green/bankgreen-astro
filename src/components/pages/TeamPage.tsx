import { PageContent } from '@components/PageContent'
import { Anchor, Select, SimpleGrid, Stack, Title } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import { useState } from 'react'

interface TeamMemberSlice {
  [key: string]: unknown
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
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const slices = (page?.data?.slices || []) as Slice[]
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
    ...new Set(
      teamMembers.map((m) => m.primary?.department).filter((d): d is string => Boolean(d))
    ),
  ].sort()

  // Filter team members by selected department
  const filteredTeamMembers = selectedDepartment
    ? teamMembers.filter((member) => member.primary?.department === selectedDepartment)
    : teamMembers

  return (
    <PageContent>
      <Stack className="gap-12">
        {/* Intro content from slices */}
        <Stack className="[&_p]:text-lg">{slices && <SliceZone slices={slices} />}</Stack>

        {/* Directors section */}
        {directors.length > 0 && (
          <Stack>
            <Title order={2}>Our Directors</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
              <SliceZone slices={directors as unknown as Slice[]} />
            </SimpleGrid>
          </Stack>
        )}

        {/* Team members section */}
        <Stack>
          <Title order={2}>Meet the Team</Title>

          {/* Department filter */}
          <Stack gap="md" mb="lg">
            <Select
              id="department-filter"
              label="Department"
              placeholder="All"
              data={departments}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              clearable
              searchable
            />
          </Stack>

          {/* Team member cards */}
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            <SliceZone slices={filteredTeamMembers as unknown as Slice[]} />
          </SimpleGrid>
        </Stack>

        <Stack>
          <Anchor href="/team/alumni">View Alumni</Anchor>
        </Stack>
      </Stack>
    </PageContent>
  )
}

/**
 * NestedSliceZone - Renders slices for nested/linked content.
 *
 * This component uses the shared base registry to avoid circular dependencies.
 * It supports all slice types EXCEPT accordion_slice to prevent infinite nesting.
 *
 * Use this for rendering linked accordion content that should not contain more accordions.
 */

import type { ComponentType } from 'react'
import { baseSliceComponents, isBaseSliceType } from './registry'
import type { Slice } from './types'

interface NestedSliceZoneProps {
  slices: Slice[]
  className?: string
}

export function NestedSliceZone({ slices, className }: NestedSliceZoneProps) {
  if (!slices || !Array.isArray(slices)) {
    return null
  }

  return (
    <>
      {slices.map((slice, index) => {
        const key = `${slice.slice_type}-${index}`

        // Prevent nested accordions
        if (slice.slice_type === 'accordion_slice') {
          if (import.meta.env.DEV) {
            console.warn('Nested accordions are not supported - skipping accordion_slice')
          }
          return null
        }

        if (!isBaseSliceType(slice.slice_type)) {
          if (import.meta.env.DEV) {
            console.warn(`Unknown or unsupported nested slice type: ${slice.slice_type}`)
          }
          return (
            <div
              key={key}
              data-slice-type={slice.slice_type}
              data-unknown="true"
              className={className}
            >
              Unknown slice type: {slice.slice_type}
            </div>
          )
        }

        // Get the component for this slice type
        // The type assertion is safe here because we've validated the slice_type
        // via isBaseSliceType, and the discriminated union guarantees the slice
        // data matches the expected shape for that slice_type
        const Component = baseSliceComponents[slice.slice_type] as ComponentType<{
          slice: typeof slice
          className?: string
        }>

        return <Component key={key} slice={slice} className={className} data-slice-type={slice.slice_type} />
      })}
    </>
  )
}

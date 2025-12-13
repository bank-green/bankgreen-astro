import Fuse from 'fuse.js'

export interface Bank {
  name: string
  tag: string
  website?: string | null
  aliases?: string | null
}

export function findBanks(banks: Bank[], searchName: string): Bank[] {
  if (!searchName.trim()) {
    return banks
  }

  const fuse = new Fuse(banks, { threshold: 0.3, keys: ['name', 'aliases'] })
  const result = fuse.search(searchName)
  return result.map(x => x.item)
}

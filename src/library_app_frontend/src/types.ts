import type { Book } from '@/backend/library_app_backend.did'

export const availableGenres = [
  'comedy',
  'drama',
  'science-fiction',
  'productivity',
  'academic'
] as const

type Genre = (typeof availableGenres)[number]

export type BookData = Exclude<Book, 'id' | 'author' | 'genre'> & {
  author?: Book['author']
  authorName?: string
  genre?: Genre
}

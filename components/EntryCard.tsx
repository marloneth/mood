import { JournalEntry } from '@prisma/client'

interface Props {
  entry: JournalEntry
}

export default function EntryCard({ entry }: Props) {
  return <div>{entry.id}</div>
}

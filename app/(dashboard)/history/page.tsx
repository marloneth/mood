import React from 'react'
import { getUserByClerkId } from '../../../util/auth'
import { prisma } from '../../../util/db'
import HistoryChart from '../../../components/HistoryChart'

async function getData() {
  const user = await getUserByClerkId()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  return { analyses, avg }
}

export default async function History() {
  const { analyses, avg } = await getData()

  return (
    <div className="w-full h-full">
      <div>{`Avg. Sentiment ${avg}`}</div>
      <div className="w-full h-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

import prisma from "@/prisma/client"
import IssueSummary from "./IssueSummary"
import LatestIssues from "./LatestIssues"
import { Flex, Grid } from "@radix-ui/themes"
import IssueChart from "./IssueChart"
import { Metadata } from "next"

export type StatusValue = {
  open: number
  inProgress: number
  closed: number
}

export default async function Home() {
  const statusValues = await fetchStatusValues()

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Flex direction={"column"} gap={"5"}>
        <IssueSummary statusValues={statusValues} />
        <IssueChart statusValues={statusValues} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}

const fetchStatusValues = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } })
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  })
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } })

  return { open, inProgress, closed }
}

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Viww a summary of project issues",
}

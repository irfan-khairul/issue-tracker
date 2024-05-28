import prisma from "@/prisma/client"
import IssueSummary from "./IssueSummary"
import LatestIssues from "./LatestIssues"
import { Flex } from "@radix-ui/themes"

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } })
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  })
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } })

  return (
    <Flex direction={"column"} gap={"3"}>
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
      <LatestIssues />
    </Flex>
  )
}

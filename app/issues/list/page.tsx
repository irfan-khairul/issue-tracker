import Pagination from "@/app/components/Pagination"
import prisma from "@/prisma/client"
import { Status, User } from "@prisma/client"
import { Flex } from "@radix-ui/themes"
import { Metadata } from "next"
import IssueActions from "./IssueActions"
import IssueTable, { columnNames, IssueQuery } from "./IssueTable"

// Fix:   IssueTable sorting is not properly sorted
// Todo:  add logic of desc sort order in 'issues'
// Todo:  ✅ add assigned avatar,
//        ❓ prisma.user fetching could be optimized

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const users = await prisma.user.findMany()

  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const issueCount = await prisma.issue.count({ where: { status: status } })

  return (
    <Flex direction={"column"} gap={"3"}>
      <IssueActions />
      {issueCount !== 0 && (
        <IssueTable searchParams={searchParams} issues={issues} users={users} />
      )}
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  )
}

export default IssuesPage

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
}

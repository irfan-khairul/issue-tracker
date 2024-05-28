import Pagination from "@/app/components/Pagination"
import prisma from "@/prisma/client"
import { Status } from "@prisma/client"
import IssueActions from "./IssueActions"
import IssueTable, { IssueQuery } from "./IssueTable"
import { columnNames } from "./IssueTable"
import { Flex } from "@radix-ui/themes"

// Additional: add logic of desc sort order in 'issues'

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
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  )
}

// export const revalidate = 0
export const dynamic = "force-dynamic"

export default IssuesPage

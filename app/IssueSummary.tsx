import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import React from "react"
import { Status } from "@prisma/client"
import Link from "next/link"
import { StatusValue } from "./page"

interface Props {
  statusValues: StatusValue
}

const IssueSummary = ({
  statusValues: { open, inProgress, closed },
}: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ]

  return (
    <Flex gap={"1"}>
      {containers.map((container) => (
        <Link
          key={container.label}
          href={`/issues/list?status=${container.status}`}
        >
          <Card>
            <Flex direction={"column"}>
              <Text className="text-sm font-medium">{container.label}</Text>
              <Text size={"5"} className="font-bold">
                {container.value}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  )
}

export default IssueSummary

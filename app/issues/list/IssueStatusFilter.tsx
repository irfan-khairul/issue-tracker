"use client"
import { Select } from "@radix-ui/themes"
import { Status } from "@prisma/client"
import React from "react"
import { useRouter } from "next/navigation"

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In progress", value: "IN_PROGRESS" },
]

const IssueStatusFilter = () => {
  const router = useRouter()

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status === "ALL" ? "" : `?status=${status}`
        router.push("/issues/list" + query)
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value ?? "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter

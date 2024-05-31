"use client"
import { Select } from "@radix-ui/themes"
import React from "react"
import toast, { Toaster } from "react-hot-toast"
import { Status, Issue } from "@prisma/client"
import axios from "axios"

const statuses: { label: string; value: Status; color?: string }[] = [
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In progress", value: "IN_PROGRESS" },
]

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const handleChange = (status: Status) => {
    toast.promise(axios.patch("/api/issues/" + issue.id, { status: status }), {
      loading: "Loading",
      success: "Status changed",
      error: "Error when changing status",
    })
  }

  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={handleChange}>
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            {statuses?.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default StatusSelect

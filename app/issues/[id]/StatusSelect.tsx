"use client"
import { IconWithText } from "@/app/components/"
import { Issue, Status } from "@prisma/client"
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons"
import { Select } from "@radix-ui/themes"
import axios from "axios"
import { ReactElement } from "react"
import toast, { Toaster } from "react-hot-toast"

const statuses: { label: string; value: Status; icon: ReactElement }[] = [
  { label: "Open", value: "OPEN", icon: <ExclamationTriangleIcon /> },
  { label: "Closed", value: "CLOSED", icon: <CheckCircledIcon /> },
  {
    label: "In progress",
    value: "IN_PROGRESS",
    icon: <QuestionMarkCircledIcon />,
  },
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
        <Select.Content position="popper">
          <Select.Group>
            <Select.Label>Issue status</Select.Label>
            {statuses?.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                <IconWithText text={status.label} icon={status.icon} />
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

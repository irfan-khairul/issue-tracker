"use client"
import { IconWithText, Skeleton } from "@/app/components"
import { useUsers } from "@/app/hooks"
import { Issue } from "@prisma/client"
import { MinusCircledIcon, PersonIcon } from "@radix-ui/react-icons"
import { Select } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading, refetch } = useUsers()
  const router = useRouter()

  const assignIssue = (userId: string) => {
    toast.promise(
      axios
        .patch("/api/issues/" + issue.id, {
          assignedToUserId: userId === "unassign" ? null : userId,
        })
        .then(() => router.refresh()),
      {
        loading: "Assigning...",
        success: "Assignee changed",
        error: "Error. Unable to assign",
      }
    )
  }

  if (error)
    return (
      <Select.Root>
        <Select.Trigger
          variant="classic"
          onClick={() => refetch()}
          placeholder="> Retry?"
        />
      </Select.Root>
    )

  if (isLoading) return <Skeleton height={"2rem"} />

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassign"}
        onValueChange={assignIssue}
      >
        <Select.Trigger />
        <Select.Content position="popper">
          <Select.Group>
            <Select.Item value="unassign">
              <IconWithText text="Unassigned" icon={<MinusCircledIcon />} />
            </Select.Item>
          </Select.Group>
          <Select.Group>
            <Select.Label>
              <IconWithText text="Assignee" icon={<PersonIcon />} />
            </Select.Label>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default AssigneeSelect

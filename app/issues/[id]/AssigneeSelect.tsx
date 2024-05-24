"use client"
import { User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Skeleton } from "@/app/components"
import { Issue } from "@prisma/client"

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 1,
  })

  if (error)
    return (
      <Select.Root>
        <Select.Trigger
          variant="classic"
          onClick={() => refetch()}
          title="Click to retry"
          placeholder="Display failed. Retry?"
        />
      </Select.Root>
    )

  if (isLoading) return <Skeleton height={"2rem"} />

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "unassign"}
      onValueChange={(userId) => {
        axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: userId === "unassign" ? null : userId,
        })
      }}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassign">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect

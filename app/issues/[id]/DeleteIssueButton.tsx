import { Button } from "@radix-ui/themes"
import React from "react"
import { TrashIcon } from "@radix-ui/react-icons"
import { Issue } from "@prisma/client"

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red">
      <TrashIcon />
      Delete Issue
    </Button>
  )
}

export default DeleteIssueButton

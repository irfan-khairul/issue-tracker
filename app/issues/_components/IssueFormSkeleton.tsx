import { Box } from "@radix-ui/themes"
import React from "react"
import { Skeleton } from "@/app/components"

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height={"2rem"} className="mb-2" />
      <Skeleton height={"23rem"} />
    </Box>
  )
}

export default IssueFormSkeleton

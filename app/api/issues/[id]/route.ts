import { patchIssueSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import authOptions from "../../auth/[...nextauth]/authOptions"
import { Issue } from "@prisma/client"

interface Props {
  params: { params: { id: string } }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const body: Issue = await request.json()
  const validation = patchIssueSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { assignedToUserId, title, description, status } = body

  if (body.assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    })
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 })
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!issue)
    return NextResponse.json({ error: "Invalid issue." }, { status: 400 })

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
      status,
    },
  })
  return NextResponse.json(updatedIssue)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!issue)
    return NextResponse.json({ error: "Invalid issue." }, { status: 400 })

  await prisma.issue.delete({
    where: { id: issue.id },
  })

  return NextResponse.json({})
}

"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { AiFillBug } from "react-icons/ai"
import classnames from "classnames"
import { Box } from "@radix-ui/themes"
import { useSession } from "next-auth/react"

const NavBar = () => {
  const currentPath = usePathname()
  const { status, data: session } = useSession()

  const links = [
    { label: "Dasboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ]

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classnames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <Box>
          {status === "unauthenticated" && (
            <Link href={"/api/auth/signin"}>Log in</Link>
          )}
          {status === "authenticated" && (
            <Link href={"/api/auth/signout"}>Log out</Link>
          )}
        </Box>
      </ul>
    </nav>
  )
}

export default NavBar

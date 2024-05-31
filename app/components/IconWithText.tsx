import { Flex, Text } from "@radix-ui/themes"
import { ReactElement } from "react-markdown/lib/react-markdown"

interface Props {
  text: string
  icon: ReactElement
}

const IconWithText = ({ text, icon }: Props) => {
  return (
    <Flex align={"center"}>
      {icon}
      <Text ml={"2"}>{text}</Text>
    </Flex>
  )
}

export default IconWithText

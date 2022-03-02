import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { userSidebarDrawer } from "../../contexts/SidebarContext";
import { Logo } from "./Logo";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {

  const { onOpen } = userSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,  //por padrão os dados não estão visíveis
    lg: true //quando tiver no tamanho large, coloca os dados visíveis
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"  //20 * 4 = 80
      mx="auto"
      mt="4"
      align="center"
      px="6"
    >
      {!isWideVersion &&
        <IconButton aria-label="Open navigation" mr="2" icon={<Icon as={RiMenuLine} fontSize="24" />} variant="unstyled" onClick={onOpen} />}

      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex
        align="center"
        ml="auto"
      >
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>

    </Flex >
  )
}
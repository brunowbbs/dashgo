import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Wesley Bruno</Text>
        <Text color="gray.300" fontSize="small">engwesleybruno@gmail.com</Text>
      </Box>
      <Avatar size="md" name="Wesley Bruno" src="https://github.com/brunowbbs.png" />
    </Flex>
  )
}
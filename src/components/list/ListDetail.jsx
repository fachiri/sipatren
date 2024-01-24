import { Box, Flex, Text } from "@chakra-ui/react";

export default function ListDetail({ items }) {
  return (
    <>
      <Flex flexDirection="column" gap={2}>
        {items.map((item, idx) => (
          <Box key={idx}>
            <Flex justifyContent="space-between">
              <Text>{item.label}</Text>
              <Text fontWeight="bold">{item.value}</Text>
            </Flex>
          </Box>
        ))}
      </Flex>
    </>
  )
}
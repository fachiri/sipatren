import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import IconNotFound from "../../components/icon/IconNotFound";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDirection="column"
        gap={5}
      >
        <IconNotFound
          width={250}
        />
        <Heading size="md">Halaman Tidak Ditemukan</Heading>
        <Link to="/dashboard">
          <Button colorScheme="teal">Dashboard</Button>
        </Link>
      </Flex>
    </>
  );
}
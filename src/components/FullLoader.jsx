import { Center, Spinner } from "@chakra-ui/react";

export default function FullLoader() {
  return (
    <Center h="100vh">
      <Spinner size="lg" color="teal.400" />
    </Center>
  );
}

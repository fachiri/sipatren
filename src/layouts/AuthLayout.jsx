import {
  Box,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import bg from '../assets/images/bg.png'

export default function AuthLayout({ children }) {
  return (
    <Box
      bgColor="black"
    >
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        bgImage={bg}
        bgPosition="center"
        bgRepeat="no-repeat"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading color="teal.300" mb={0}>SIPATREN</Heading>
          <Heading color="teal.300" size="md" mb={5} textAlign="center">Sistem Informasi Presensi dan Administrasi Pasantren</Heading>
          {children}
        </Stack>
      </Flex>
    </Box>
  );
};

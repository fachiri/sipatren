import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Text } from "@chakra-ui/react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { FaFingerprint } from "react-icons/fa";
import fetcher from "../../../utils/fetcher";
import useSWR from "swr";

export default function Presensi() {
  const { data: scheduleData, error: scheduleError, isLoading: scheduleIsLoading } = useSWR(`/schedules`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Presensi"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '/dashboard'
          },
          {
            label: 'Presensi',
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader>
            <Heading size='md'>Jadwal Saya</Heading>
          </CardHeader>
          <CardBody>
            {scheduleData?.data && Object.keys(scheduleData.data).map((day) => (
              <Box key={day} mb={10}>
                <Heading size='sm' mb={5}>
                  {day}
                </Heading>
                {scheduleData?.data[day]?.map((item, idx) => (
                  <Flex key={idx} justifyContent="space-between" mb={5}>
                    <Flex>
                      <Text as="b">{item.subject?.name}</Text>
                      <Text ml={2}>{item.start} - {item.end}</Text>
                    </Flex>
                    <Link to={`mark/${item.uuid}`}>
                      <Button
                        leftIcon={<FaFingerprint />}
                        colorScheme='teal'
                        variant='solid'
                        size='sm'
                      >
                        Tandai Kehadiran
                      </Button>
                    </Link>
                  </Flex>
                ))}
              </Box>
            ))}
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
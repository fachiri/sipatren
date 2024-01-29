import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Text } from "@chakra-ui/react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import fetcher from "../../../utils/fetcher";
import useSWR from "swr";
import { FaList } from "react-icons/fa";
import { days } from "../../../utils/constants";
import { Fragment } from "react";

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
            {days.map((day) => (
              <Fragment key={day}>
                {scheduleData?.data[day] ? (
                  <Box mb={10}>
                    <Heading size='sm' mb={5}>
                      {day}
                    </Heading>
                    {scheduleData.data[day].map((item, idx) => (
                      <Flex key={idx} justifyContent="space-between" mb={5}>
                        <Flex flexWrap="wrap" gap={2}>
                          <Text as="b">{item.start} - {item.end}</Text>
                          <Text>|</Text>
                          <Text>{item.class?.name}</Text>
                          <Text>|</Text>
                          <Text>{item.subject?.name}</Text>
                        </Flex>
                        <Link to={`detail/${item.uuid}`}>
                          <Button
                            leftIcon={<FaList />}
                            width={75}
                            colorScheme='teal'
                            variant='solid'
                            size='sm'
                          >
                            Detail
                          </Button>
                        </Link>
                      </Flex>
                    ))}
                  </Box>
                ) : null}
              </Fragment>
            ))}

          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
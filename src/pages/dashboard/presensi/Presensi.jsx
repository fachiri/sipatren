import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Text } from "@chakra-ui/react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Link, useNavigate } from "react-router-dom";
import fetcher from "../../../utils/fetcher";
import useSWR from "swr";
import { FaList } from "react-icons/fa";
import { days } from "../../../utils/constants";
import { Fragment, useEffect, useState } from "react";
import { MultiSelect } from "chakra-multiselect";
import { formatDate, getWeek, getWeeks, transformDates } from "../../../utils";

export default function Presensi() {
  const today = new Date();
  const navigate = useNavigate();

  const thisWeek = getWeeks().find(week => {
    return today >= week.start && today <= week.end;
  });

  const [selectedWeek, setSelectedWeek] = useState(thisWeek ? JSON.stringify(thisWeek) : {})
  const [formatedDays, setFormatedDays] = useState(thisWeek ?? {})

  const { data: scheduleData, error: scheduleError, isLoading: scheduleIsLoading } = useSWR(`/schedules`, fetcher)

  useEffect(() => {
    if (selectedWeek && Object.keys(selectedWeek).length !== 0) {
      const weeks = JSON.parse(selectedWeek)
      setFormatedDays(transformDates(getWeek(weeks)))
    }
  }, [selectedWeek])

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
        <Card mb={5}>
          <CardHeader pb={0}>
            <Heading size='md'>Filter</Heading>
          </CardHeader>
          <CardBody>
            <MultiSelect
              value={selectedWeek}
              placeholder="Pilih Minggu"
              onChange={setSelectedWeek}
              options={getWeeks().map(e => ({
                value: JSON.stringify(e),
                label: `${formatDate(e.start)} - ${formatDate(e.end)}`
              }))}
              filterFn={(options, searchText) =>
                options.filter(option =>
                  option.label.toLowerCase().includes(searchText.toLowerCase())
                )
              }
              single
            />
          </CardBody>
        </Card>
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
                        <Button
                          leftIcon={<FaList />}
                          width={75}
                          colorScheme='teal'
                          variant='solid'
                          size='sm'
                          isDisabled={Object.keys(selectedWeek).length == 0}
                          onClick={() => navigate(`detail/${item.uuid}/${encodeURIComponent(formatedDays[day])}`)}
                        >
                          Detail
                        </Button>
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
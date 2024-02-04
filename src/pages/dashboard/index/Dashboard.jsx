import { Button, Card, CardBody, CardHeader, Flex, Grid, Heading, Menu, MenuButton, MenuItem, MenuList, Stack } from "@chakra-ui/react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import IconStudent from "../../../components/icon/IconStudent";
import StatCount from "../../../components/stat/StatCount";
import IconTeacher from "../../../components/icon/IconTeacher";
import IconAdmin from "../../../components/icon/IconAdmin";
import { MenuLists } from "../../../components/MenuLists";
import { Link } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import { format3Digit } from "../../../utils";
import { FaChevronDown, FaDatabase } from "react-icons/fa";
import { Fragment } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { data: userData, error: userError, isLoading: userIsLoading } = useSWR(`/auth/verify-token`, fetcher)
  const { data: dashboardData, error: dashboardError, isLoading: dashboardIsLoading } = useSWR(`/dashboard`, fetcher)

  const getGraph = (role) => {
    return {
      labels: dashboardData?.data?.graph[role]?.label,
      datasets: [
        {
          label: '# of Admin',
          data: dashboardData?.data?.graph[role]?.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
  }

  return (
    <>
      <DashboardLayout
        title="Dashboard"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '#'
          },
        ]}
      >
        <Grid templateColumns='repeat(3, 1fr)' gap={5} mb={5}>
          <StatCount
            label="Admin"
            number={format3Digit(dashboardData?.data?.stats?.admin)}
            icon={<IconAdmin width={75} height={75} />}
          />
          <StatCount
            label="Guru"
            number={format3Digit(dashboardData?.data?.stats?.teacher)}
            icon={<IconTeacher width={75} height={75} />}
          />
          <StatCount
            label="Santri"
            number={format3Digit(dashboardData?.data?.stats?.student)}
            icon={<IconStudent width={75} height={75} />}
          />
        </Grid>
        <Card mb={5}>
          <CardHeader pb={0}>
            <Heading size='md'>Menu</Heading>
          </CardHeader>
          <CardBody>
            {['ADMIN'].includes(userData?.data?.role) && (
              <Stack direction='row' spacing={4}>
                {MenuLists.ADMIN.map((item, index) => (
                  <Fragment key={index}>
                    {item.subItems ? (
                      <Menu>
                        <MenuButton as={Button} colorScheme="teal" leftIcon={<item.icon />} rightIcon={<FaChevronDown />}>
                          {item.label}
                        </MenuButton>
                        <MenuList>
                          {item.subItems.map((subItem, subIndex) => (
                            <Link key={subIndex} to={subItem.link}>
                              <MenuItem>{subItem.label}</MenuItem>
                            </Link>
                          ))}
                        </MenuList>
                      </Menu>
                    ) : (
                      item.link && (
                        <Link key={index} to={item.link}>
                          <Button leftIcon={<item.icon />} colorScheme='teal' variant='solid'>
                            {item.label}
                          </Button>
                        </Link>
                      )
                    )}
                  </Fragment>
                ))}
              </Stack>
            )}

            {['GURU'].includes(userData?.data?.role) &&
              <Stack direction='row' spacing={4}>
                {MenuLists.GURU.map((item, index) => (
                  <Link key={index} to={item.link}>
                    <Button leftIcon={<item.icon />} colorScheme='teal' variant='solid'>
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </Stack>
            }
          </CardBody>
        </Card>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={5}>
          <Card>
            <CardHeader pb={0}>
              <Heading size='md'>Grafik Admin berdasarkan Jenis Kelamin</Heading>
            </CardHeader>
            <CardBody>
              <Flex>
                <Pie data={getGraph('admin')} />
              </Flex>
            </CardBody>
          </Card>
          <Card>
            <CardHeader pb={0}>
              <Heading size='md'>Grafik Guru berdasarkan Jenis Kelamin</Heading>
            </CardHeader>
            <CardBody>
              <Flex>
                <Pie data={getGraph('teacher')} />
              </Flex>
            </CardBody>
          </Card>
          <Card>
            <CardHeader pb={0}>
              <Heading size='md'>Grafik Santri berdasarkan Jenis Kelamin</Heading>
            </CardHeader>
            <CardBody>
              <Flex>
                <Pie data={getGraph('student')} />
              </Flex>
            </CardBody>
          </Card>
        </Grid>
      </DashboardLayout>
    </>
  )
}
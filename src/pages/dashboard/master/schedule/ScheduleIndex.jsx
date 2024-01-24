import { FaList, FaPlus } from "react-icons/fa";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import fetcher from "../../../../utils/fetcher"
import useSWR from 'swr'

export default function ScheduleIndex() {
  const { data: scheduleData, error: scheduleError, isLoading: scheduleIsLoading } = useSWR(`/master/schedules`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Master Jadwal"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '/dashboard'
          },
          {
            label: 'Master',
            link: '#'
          },
          {
            label: 'Jadwal',
            link: '#'
          },
        ]}
        actions={[
          {
            label: 'Tambah Data',
            icon: <FaPlus />,
            color: 'teal',
            link: 'create'
          }
        ]}
      >
        <Card>
          <CardHeader>
            <Heading size='md'>Daftar Jadwal</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped' colorScheme='gray'>
                <Thead>
                  <Tr>
                    <Th>Hari</Th>
                    <Th>Mulai</Th>
                    <Th>Selesai</Th>
                    <Th>Kelas</Th>
                    <Th>Mata Pelajaran</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {scheduleData?.data?.rows.map((item, idx) => (
                    <Tr key={idx}>
                      <Td>{item.day}</Td>
                      <Td>{item.start}</Td>
                      <Td>{item.end}</Td>
                      <Td>{item.class?.name}</Td>
                      <Td>{item.subject?.name}</Td>
                      <Td>
                        <Link to={"detail/" + item.uuid}>
                          <Button leftIcon={<FaList />} colorScheme='teal' variant='solid' size='sm'>Detail</Button>
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
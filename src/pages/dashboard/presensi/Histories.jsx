import { FaList } from "react-icons/fa";
import DashboardLayout from "../../../layouts/DashboardLayout";
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
import fetcher from "../../../utils/fetcher"
import useSWR from 'swr'
import { formatDate } from "../../../utils";

export default function Histories() {
  const { data: absenceData, error: absenceError, isLoading: absenceIsLoading } = useSWR(`/absences/history`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Riwayat"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '/dashboard'
          },
          {
            label: 'Riwayat',
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader>
            <Heading size='md'>Riwayat Presensi</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped' colorScheme='gray'>
                <Thead>
                  <Tr>
                    <Th>Tanggal</Th>
                    <Th>Mata Pelajaran</Th>
                    <Th>Status</Th>
                    {/* <Th>Aksi</Th> */}
                  </Tr>
                </Thead>
                <Tbody>
                  {absenceData?.data?.map((item, idx) => (
                    <Tr key={idx}>
                      <Td>{formatDate(item.created_at)}</Td>
                      <Td>{item.schedule?.subject?.name}</Td>
                      <Td>{item.status}</Td>
                      {/* <Td>
                        <Link to={"detail/" + item.uuid}>
                          <Button leftIcon={<FaList />} colorScheme='teal' variant='solid' size='sm'>Detail</Button>
                        </Link>
                      </Td> */}
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
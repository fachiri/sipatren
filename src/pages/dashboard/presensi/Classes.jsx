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

export default function Classes() {
  const { data: classData, error: classError, isLoading: classIsLoading } = useSWR(`/teacher/classes`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Kelas"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '/dashboard'
          },
          {
            label: 'Kelas',
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader>
            <Heading size='md'>Daftar Kelas</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped' colorScheme='gray'>
                <Thead>
                  <Tr>
                    <Th>Kelas</Th>
                    <Th>Jumlah Siswa</Th>
                    <Th>Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {classData?.data?.map((item, idx) => (
                    <Tr key={idx}>
                      <Td>{item.name}</Td>
                      <Td>{item.students?.length ?? 0}</Td>
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
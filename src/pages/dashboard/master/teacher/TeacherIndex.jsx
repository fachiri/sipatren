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

export default function TeacherIndex() {
  const { data: teacherData, error: teacherError, isLoading: teacherIsLoading } = useSWR(`/master/teachers`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Master Guru"
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
            label: 'Guru',
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
            <Heading size='md'>Daftar Guru</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped' colorScheme='gray'>
                <Thead>
                  <Tr>
                    <Th>Nama</Th>
                    <Th>NUPTK</Th>
                    <Th>Jenis Kelamin</Th>
                    <Th>Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {teacherData?.data?.rows.map((item, idx) => (
                    <Tr key={idx}>
                      <Td>{item.user.nama}</Td>
                      <Td>{item.nuptk?.length == 0 ? '-' : item.nuptk}</Td>
                      <Td>{item.jk}</Td>
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
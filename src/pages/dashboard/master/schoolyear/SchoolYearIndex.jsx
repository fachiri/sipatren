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

export default function SchoolYear() {
  const { data: schoolYearData, error: schoolYearError, isLoading: schoolYearIsLoading } = useSWR(`/master/school_years`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Master Tahun Ajaran"
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
            label: 'Tahun Ajaran',
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
            <Heading size='md'>Daftar Tahun Ajaran</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped' colorScheme='gray'>
                <Thead>
                  <Tr>
                    <Th>Tahun Ajaran</Th>
                    <Th>Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {schoolYearData?.data?.rows.map((item, idx) => (
                    <Tr key={idx}>
                      <Td>{item.name}</Td>
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
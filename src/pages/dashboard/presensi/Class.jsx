import { Button, Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import fetcher from "../../../utils/fetcher";
import useSWR from "swr";
import ListDetail from "../../../components/list/ListDetail";
import { FaList } from "react-icons/fa";
import DataNotFound from "../../../components/DataNotFound";

export default function Class() {
  const { uuid } = useParams()
  const { data: classData, error: classError, isLoading: classIsLoading } = useSWR(`/teacher/classes/${uuid}`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Detail Kelas"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '/dashboard'
          },
          {
            label: 'Kelas',
            link: '/dashboard/classes'
          },
          {
            label: `Detail Kelas`,
            link: '#'
          },
        ]}
      >
        <Card mb={5}>
          <CardHeader display="flex" justifyContent="space-between" pb={0}>
            <Heading size='md'>Detail Kelas</Heading>
          </CardHeader>
          <CardBody>
            <ListDetail
              items={[
                { label: 'Nama Kelas', value: classData?.data?.name },
                { label: 'Jumlah Siswa', value: classData?.data?.students?.length ?? 0}
              ]}
            />
          </CardBody>
        </Card>
        <Card mb={5}>
          <CardHeader display="flex" justifyContent="space-between" pb={0}>
            <Heading size='md'>Daftar Siswa</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped' colorScheme='gray'>
                <Thead>
                  <Tr>
                    <Th>Nama</Th>
                    <Th>NIS</Th>
                    <Th>Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {classData?.data?.students?.map((item, idx) => (
                    <Tr key={idx}>
                      <Td>{item.nama}</Td>
                      <Td>{item.nis}</Td>
                      <Td>
                        <Link to={"/dashboard/students/detail/" + item.uuid}>
                          <Button leftIcon={<FaList />} colorScheme='teal' variant='solid' size='sm'>Detail</Button>
                        </Link>
                      </Td>
                    </Tr>
                  )) ?? 
                  <Tr>
                    <Td colSpan={3}>
                      <DataNotFound />
                    </Td>
                  </Tr>
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
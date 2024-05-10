import { FaList, FaPlus, FaSearch } from "react-icons/fa";
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
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Select,
} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import fetcher from "../../../../utils/fetcher"
import useSWR from 'swr'
import { useState } from "react";

export default function SantriIndex() {
  const [query, setQuery] = useState('');
  const { data: studentData, error: studentError, isLoading: studentIsLoading } = useSWR(`/master/students?search=${query}`, fetcher)
  const { data: classData, error: classError, isLoading: classIsLoading } = useSWR(`/master/classes`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Master Santri"
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
            label: 'Santri',
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
            <Flex justifyContent="space-between" align="center">
              <Heading size="md">Daftar Santri</Heading>
              <Flex gap={3}>
                <Select width={300} placeholder='Pilih Kelas' onChange={(e) => setQuery(e.target.value)}>
                  {classData?.data?.rows.map((item, idx) => (
                    <option key={idx} value={item.name}>{item.name}</option>
                  ))}
                </Select>
                <InputGroup width={300}>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaSearch color="gray.300" />}
                  />
                  <Input onChange={(e) => setQuery(e.target.value)} placeholder="Cari santri..." />
                </InputGroup>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped' colorScheme='gray'>
                <Thead>
                  <Tr>
                    <Th>Nama</Th>
                    <Th>NIS</Th>
                    <Th>Kelas</Th>
                    <Th>Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {studentData?.data?.rows.map((item, idx) => (
                    <Tr key={idx}>
                      <Td>{item.nama}</Td>
                      <Td>{item.nis}</Td>
                      <Td>{item.class?.name ?? '-'}</Td>
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
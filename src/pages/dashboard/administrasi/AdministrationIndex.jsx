import { FaPlus } from "react-icons/fa";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from '@chakra-ui/react'
import fetcher from "../../../utils/fetcher"
import useSWR from 'swr'
import { NumericFormat } from "react-number-format";

export default function AdministrationIndex() {
  const { data: administrationData, error: administrationError, isLoading: administrationIsLoading } = useSWR(`/school_fees`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Administrasi"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '/dashboard'
          },
          {
            label: 'Administrasi',
            link: '#'
          }
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
            <Heading size='md'>Riwayat Pembayaran SPP</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped' colorScheme='gray'>
                <Thead>
                  <Tr>
                    <Th>Nama</Th>
                    <Th>Tanggal</Th>
                    <Th>Nominal</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {administrationData?.data?.rows?.map((item, idx) => (
                    <Tr key={idx}>
                      <Td>{item.student?.nama}</Td>
                      <Td>{item.tanggal.replaceAll('-', '/')}</Td>
                      <Td>
                        <NumericFormat
                          value={item.nominal}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'Rp. '}
                        />
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
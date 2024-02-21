import { FaList, FaPlus } from "react-icons/fa";
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
  useDisclosure,
  Flex,
  Input,
  Box,
  Text,
  Button,
} from '@chakra-ui/react'
import fetcher from "../../../utils/fetcher"
import useSWR, { mutate } from 'swr'
import { NumericFormat } from "react-number-format";
import FormEdit from "../../../components/form/FormEdit";
import { validateSchoolFee } from "../../../utils/validation";
import SchoolFeeForm from "./SchoolFeeForm";
import { toast } from "react-toastify";
import axios from "../../../utils/axios"
import { Link } from "react-router-dom";

export default function AdministrationIndex() {
  // const { data: administrationData, error: administrationError, isLoading: administrationIsLoading } = useSWR(`/school_fees`, fetcher)
  const { data: studentData, error: studentError, isLoading: studentIsLoading } = useSWR(`/master/students`, fetcher)
  const { data: schoolFeeData, error: schoolFeeError, isLoading: schoolFeeIsLoading } = useSWR(`/school_fees/fixed`, fetcher)
  const modalEdit = useDisclosure()

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
            <Heading size='md' mb={5}>Riwayat Pembayaran SPP</Heading>
            <Flex gap={5} float="right">
              <Flex border="1px solid rgba(0, 0, 0, 0.2)" px={5} borderRadius={5} gap={5}>
                <Text>Nominal Tetap : </Text>
                <NumericFormat
                  value={schoolFeeData?.nominal}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rp. '}
                />
                <Text> / Bulan </Text>
              </Flex>
              <FormEdit
                modal={modalEdit}
                initialValues={{ nominal: schoolFeeData?.nominal }}
                validate={validateSchoolFee}
                onSubmit={async (values, actions) => {
                  try {
                    const { data: response } = await axios.put(`/school_fees/fixed`, {
                      nominal: +values.nominal
                    });

                    toast.success(response.message)
                    modalEdit.onClose(true)
                    mutate(`/school_fees/fixed`)
                  } catch (error) {
                    if (error.name != 'AxiosError') {
                      toast.error(error.message)
                    }
                  } finally {
                    actions.setSubmitting(false)
                  }
                }}
              >
                <SchoolFeeForm />
              </FormEdit>
            </Flex>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped' colorScheme='gray'>
                <Thead>
                  <Tr>
                    <Th>Nama</Th>
                    <Th>Tahun Ajaran</Th>
                    <Th>Nominal</Th>
                    <Th>Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {studentData?.data?.rows?.map((item, idx) =>
                    item.school_fees &&
                    <Tr key={idx}>
                      <Td>{item.nama}</Td>
                      <Td>{item.school_fees && item.school_fees[item.school_fees.length - 1]?.school_year?.name}</Td>
                      <Td>
                        <NumericFormat
                          value={item.school_fees && item.school_fees[item.school_fees.length - 1].nominal}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'Rp. '}
                        />
                      </Td>
                      <Td>
                        <Link to={"detail/" + item.uuid}>
                          <Button leftIcon={<FaList />} colorScheme='teal' variant='solid' size='sm'>Detail</Button>
                        </Link>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
import { Form, Formik } from "formik";
import DashboardLayout from "../../../layouts/DashboardLayout";
import axios from "../../../utils/axios"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { toast } from "react-toastify";
import { validateAdministration } from "../../../utils/validation";
import AdministrationForm from "./AdministrationForm";
import fetcher from "../../../utils/fetcher";
import useSWR, { mutate } from "swr";
import { Link, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { FaList, FaTrash } from "react-icons/fa";
import FormSelect from "../../../components/form/FormSelect";
import { formatDate } from "../../../utils";

export default function AdministrationDetail() {
  const { uuid } = useParams()
  const { data: administrationData, error: administrationError, isLoading: administrationIsLoading } = useSWR(`/school_fees/student/${uuid}`, fetcher)
  const modalEdit = useDisclosure()

  const handleChangeStatus = async (e, item) => {
    try {
      const { tanggal, month, nominal, student, school_year } = item;
      const status = e.target.value;
      const date = tanggal.split('-')
      const { data: response } = await axios.put(`/school_fees/${item.uuid}`, {
        date: `${date[2]}-${date[1]}-${date[0]}`,
        month,
        status,
        nominal,
        student_uuid: student.uuid,
        school_year_uuid: school_year.uuid
      });
  
      toast.success(response.message);
      mutate(`/school_fees/student/${item.student.uuid}`)
    } catch (error) {
      if (error.name !== 'AxiosError') {
        toast.error(error.message);
      }
    }
  }

  const handleDelete = async (item) => {
    try {
      const { data: response } = await axios.delete(`/school_fees/${item.uuid}`);
  
      toast.success(response.message);
      mutate(`/school_fees/student/${item.student.uuid}`)
    } catch (error) {
      if (error.name !== 'AxiosError') {
        toast.error(error.message);
      }
    }
  }

  return (
    <>
      <DashboardLayout
        title="Detail Administrasi"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '/dashboard'
          },
          {
            label: 'Administrasi',
            link: '/dashboard/administration'
          },
          {
            label: 'Detail Data',
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader>
            <Heading as='h4' size='md'>Detail Administrasi</Heading>
            <Text>Nama: {administrationData?.data[0]?.student.nama}</Text>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped' colorScheme='gray'>
                <Thead>
                  <Tr>
                    <Th>Tanggal Pembayaran</Th>
                    <Th>Kelas</Th>
                    <Th>Bulan</Th>
                    <Th>Nominal</Th>
                    <Th>Status</Th>
                    <Th>Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {administrationData?.data?.map((item, idx) =>
                    <Tr key={idx}>
                      <Td>{item.tanggal}</Td>
                      <Td>{item.student.class.name}</Td>
                      <Td>{item.month}</Td>
                      <Td>
                        <NumericFormat
                          value={item.nominal}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'Rp. '}
                        />
                      </Td>
                      <Td>
                        <Select onChange={(e) => handleChangeStatus(e, item)} value={item.status}>
                          <option value='Belum Lunas'>Belum Lunas</option>
                          <option value='Lunas'>Lunas</option>
                        </Select>
                      </Td>
                      <Td>
                        <Button onClick={() => handleDelete(item)} colorScheme='red' variant='solid' size='sm'>
                          <FaTrash />
                        </Button>
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
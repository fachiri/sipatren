import { Button, Card, CardBody, CardHeader, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import { MultiSelect } from "chakra-multiselect";
import { useState } from "react";
import { FaPrint } from "react-icons/fa";
import axios from "../../../utils/axios"
import { currentDateUnique, getMonthId } from "../../../utils";
import { NumericFormat } from "react-number-format";
import DataNotFound from "../../../components/DataNotFound";
import { toast } from "react-toastify";

export default function LaporanSPP() {
  const [selectedStudent, setSelectedStudent] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)

  const { data: studentData, error: studentError, isLoading: studentIsLoading } = useSWR(`/master/students`, fetcher)
  // const { data: schoolYearData, error: schoolYearError, isLoading: schoolYearIsLoading } = useSWR(`/master/school_years`, fetcher)
  const { data: schoolFeeData, error: schoolFeeError, isLoading: schoolFeeIsLoading } = useSWR(`/school_fees/student/${selectedStudent}`, fetcher)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)

      const response = await axios.get(`/pdf/school-fees/${selectedStudent}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Laporan-Pembayaran-SPP-${selectedStudent}-${currentDateUnique()}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <>
      <DashboardLayout
        title="Laporan SPP"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '/dashboard'
          },
          {
            label: 'Laporan',
            link: '#'
          },
          {
            label: 'SPP',
            link: '#'
          }
        ]}
      >
        <Card mb={5}>
          <CardHeader pb={0}>
            <Heading size='md'>Filter</Heading>
          </CardHeader>
          <CardBody>
            <MultiSelect
              value={selectedStudent}
              placeholder="Pilih Siswa"
              onChange={setSelectedStudent}
              options={studentData?.data?.rows?.map((item) => ({
                value: item.uuid,
                label: `${item.nama} (${item.nis})`,
              }))}
              isSearchable
              filterFn={(options, searchText) =>
                options.filter(option =>
                  option.label.toLowerCase().includes(searchText.toLowerCase())
                )
              }
              single
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader pb={0}>
            <Flex justifyContent="space-between">
              <Heading size='md'>Laporan SPP</Heading>
              <Button
                onClick={handleDownload}
                leftIcon={<FaPrint />}
                colorScheme="teal"
                isLoading={isDownloading}
                isDisabled={!schoolFeeData?.data}
              >
                Download
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th>No. </Th>
                  <Th>Tanggal Pembayaran</Th>
                  <Th>Bulan</Th>
                  <Th>Nominal</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {schoolFeeData?.data?.map((item, idx) => (
                  <Tr key={idx}>
                    <Td>{idx + 1}</Td>
                    <Td>{item.tanggal.replaceAll('-', '/')}</Td>
                    <Td>{item.month}</Td>
                    <Td>
                      <NumericFormat
                        value={item.nominal}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp. '}
                      />
                    </Td>
                    <Td>{item.status}</Td>
                  </Tr>
                )) ??
                  <Tr>
                    <Td colSpan={4}>
                      <DataNotFound />
                    </Td>
                  </Tr>
                }
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
import { Button, Card, CardBody, CardHeader, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import { MultiSelect } from "chakra-multiselect";
import { useEffect, useState } from "react";
import { FaPrint } from "react-icons/fa";
import axios from "../../../utils/axios"
import { currentDateUnique, formatDate, getWeek, getWeeks, transformDates } from "../../../utils";
import { toast } from "react-toastify";
import { days } from "../../../utils/constants";

export default function LaporanPresensi() {
  const today = new Date();

  const thisWeek = getWeeks().find(week => {
    return today >= week.start && today <= week.end;
  });

  const [selectedWeek, setSelectedWeek] = useState(thisWeek ? JSON.stringify(thisWeek) : {})
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedSchoolYear, setSelectedSchoolYear] = useState('')
  const [formatedDays, setFormatedDays] = useState(thisWeek ?? {})
  const [isDownloading, setIsDownloading] = useState(false)

  const { data: scheduleData, isLoading: scheduleIsLoading } = useSWR(`/schedules`, fetcher)
  const { data: schoolYearData, isLoading: schoolYearIsLoading } = useSWR(`/master/school_years`, fetcher)

  useEffect(() => {
    if (selectedWeek && Object.keys(selectedWeek).length !== 0) {
      const weeks = JSON.parse(selectedWeek)
      setFormatedDays(transformDates(getWeek(weeks)))
    }
  }, [selectedWeek])

  const handleDownload = async (uuid) => {
    try {
      setIsDownloading(true)
      const scheduleUuid = uuid

      const response = await axios.get(`/pdf/absences/${scheduleUuid}/${selectedSchoolYear}/${selectedMonth}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Laporan-Presensi-${scheduleUuid}-${currentDateUnique()}.pdf`);
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
        title="Laporan Presensi"
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
            label: 'Presensi',
            link: '#'
          }
        ]}
      >
        <Card mb={5}>
          <CardHeader pb={0}>
            <Heading size='md'>Filter</Heading>
          </CardHeader>
          <CardBody>
            {/* <MultiSelect
              value={selectedWeek}
              placeholder="Pilih Minggu"
              onChange={setSelectedWeek}
              options={getWeeks().map(e => ({
                value: JSON.stringify(e),
                label: `${formatDate(e.start)} - ${formatDate(e.end)}`
              }))}
              filterFn={(options, searchText) =>
                options.filter(option =>
                  option.label.toLowerCase().includes(searchText.toLowerCase())
                )
              }
              single
            /> */}
            <Flex gap={5}>
              <MultiSelect
                value={selectedMonth}
                placeholder="Pilih Bulan"
                onChange={setSelectedMonth}
                options={[
                  { value: '1', label: 'JANUARI' },
                  { value: '2', label: 'FEBRUARI' },
                  { value: '3', label: 'MARET' },
                  { value: '4', label: 'APRIL' },
                  { value: '5', label: 'MEI' },
                  { value: '6', label: 'JUNI' },
                  { value: '7', label: 'JULI' },
                  { value: '8', label: 'AGUSTUS' },
                  { value: '9', label: 'SEPTEMBER' },
                  { value: '10', label: 'OKTOBER' },
                  { value: '11', label: 'NOVEMBER' },
                  { value: '12', label: 'DESEMBER' },
                ]}
                single
              />
              <MultiSelect
                value={selectedSchoolYear}
                placeholder="Pilih Tahun Ajaran"
                onChange={setSelectedSchoolYear}
                options={schoolYearData?.data?.rows?.map(e => ({
                  value: e.uuid,
                  label: e.name
                }))}
                filterFn={(options, searchText) =>
                  options.filter(option =>
                    option.label.toLowerCase().includes(searchText.toLowerCase())
                  )
                }
                single
              />
            </Flex>
          </CardBody>
        </Card>
        <Card>
          <CardHeader pb={0}>
            <Flex justifyContent="space-between">
              <Heading size='md'>Laporan Presensi</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th>Hari</Th>
                  <Th>Jam</Th>
                  <Th>Kelas</Th>
                  <Th>Mata Pelajaran</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {days.map((day, idx) =>
                  scheduleData?.data[day]?.map((item, idx) =>
                    <Tr key={idx}>
                      <Td>{day}</Td>
                      <Td>{item.start} - {item.end}</Td>
                      <Td>{item.class?.name}</Td>
                      <Td>{item.subject?.name}</Td>
                      <Td>
                        <Button
                          leftIcon={<FaPrint />}
                          width={75}
                          colorScheme='teal'
                          variant='solid'
                          size='sm'
                          isDisabled={!selectedMonth || !selectedSchoolYear}
                          isLoading={isDownloading}
                          onClick={() => handleDownload(item.uuid)}
                        >
                          Unduh
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import fetcher from "../../../utils/fetcher";
import useSWR from "swr";
import ListDetail from "../../../components/list/ListDetail";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import axios from "../../../utils/axios"

export default function History() {
  const { uuid } = useParams()
  // const { data: scheduleData, error: scheduleError, isLoading: scheduleIsLoading } = useSWR(`/master/schedules/${uuid}`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Detail Presensi"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '/dashboard'
          },
          {
            label: 'Riwayat',
            link: '/dashboard/histories'
          },
          {
            label: `Detail Presensi`,
            link: '#'
          },
        ]}
      >
        <Card mb={5}>
          <CardHeader display="flex" justifyContent="space-between">
            <Heading size='md'>Detail Presensi</Heading>
          </CardHeader>
          <CardBody>
            {/* <ListDetail
              items={[
                { label: 'Hari', value: scheduleData?.data?.day },
                { label: 'Tanggal', value: getDateNow() },
                { label: 'Jam Mulai', value: scheduleData?.data?.start },
                { label: 'Jam Selesai', value: scheduleData?.data?.end },
                {
                  label: 'Kelas',
                  value:
                    <Link to={`/dashboard/master/classes/detail/${scheduleData?.data?.class?.uuid}`} style={{ color: 'teal' }}>
                      {scheduleData?.data?.class?.name}
                    </Link>
                },
                {
                  label: 'Mata Pelajaran',
                  value:
                    <Link to={`/dashboard/master/subjects/detail/${scheduleData?.data?.subject?.uuid}`} style={{ color: 'teal' }}>
                      {scheduleData?.data?.subject?.name}
                    </Link>
                },
                {
                  label: 'Tahun Ajaran',
                  value:
                    <Link to={`/dashboard/master/schoolyears/detail/${scheduleData?.data?.school_year?.uuid}`} style={{ color: 'teal' }}>
                      {scheduleData?.data?.school_year?.name}
                    </Link>
                },
              ]}
            /> */}
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
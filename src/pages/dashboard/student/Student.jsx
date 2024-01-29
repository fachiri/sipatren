import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useParams } from "react-router-dom";
import fetcher from "../../../utils/fetcher";
import useSWR from "swr";
import ListDetail from "../../../components/list/ListDetail";

export default function Student() {
  const { uuid } = useParams()
  const { data: studentData, error: studentError, isLoading: studentIsLoading } = useSWR(`/master/students/${uuid}`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Detail Santri"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '/dashboard'
          },
          {
            label: 'Santri',
            link: '/dashboard/students'
          },
          {
            label: `Detail Santri`,
            link: '#'
          },
        ]}
      >
        <Card mb={5}>
          <CardHeader display="flex" justifyContent="space-between" pb={0}>
            <Heading size='md'>Detail Santri</Heading>
          </CardHeader>
          <CardBody>
            <ListDetail
              items={[
                { label: 'Tanggal Masuk', value: studentData?.data?.tanggal_masuk },
                { label: 'Nama', value: studentData?.data?.nama },
                { label: 'NIS', value: studentData?.data?.nis },
                { label: 'Jenis Kelamin', value: studentData?.data?.jk },
                { label: 'Tempat Lahir', value: studentData?.data?.tempat_lahir },
                { label: 'Tanggal Lahir', value: studentData?.data?.tanggal_lahir },
                { label: 'Alamat', value: studentData?.data?.alamat },
                { label: 'Kelas', value: studentData?.data?.class?.name },
              ]}
            />
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
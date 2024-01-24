import { Box, Button, Card, CardBody, CardHeader, Flex, Heading } from "@chakra-ui/react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import fetcher from "../../../utils/fetcher";
import useSWR from "swr";
import ListDetail from "../../../components/list/ListDetail";
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../utils/axios"
import { FaHistory } from "react-icons/fa";
import { dataURItoBlob, formatDate } from "../../../utils";

export default function TandaiKehadiran() {
  const { uuid } = useParams()
  const { data: scheduleData, error: scheduleError, isLoading: scheduleIsLoading } = useSWR(`/schedules/${uuid}`, fetcher)
  const [ isLoading, setIsLoading ] = useState(false)

  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    setIsLoading(true)
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      try {
        // Convert base64 to Blob
        const blobData = dataURItoBlob(imageSrc);

        // Create a File object from Blob
        const imageFile = new File([blobData], 'image.png', { type: 'image/png' });

        const formData = new FormData();
        formData.append('schedule_uuid', uuid);
        formData.append('face_image', imageFile);

        const response = await axios.post('/absence', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.success(response.message)
      } catch (error) {
        if (error.name != 'AxiosError') {
          toast.error(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }
  }, [webcamRef]);

  const getDateNow = () => {
    return new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', })
  }

  return (
    <>
      <DashboardLayout
        title="Tandai Kehadiran"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '/dashboard'
          },
          {
            label: 'Presensi',
            link: '/dashboard/presence'
          },
          {
            label: `Tandai Kehadiran`,
            link: '#'
          },
        ]}
      >
        <Card mb={5}>
          <CardHeader display="flex" justifyContent="space-between">
            <Heading size='md'>Detail Jadwal</Heading>
            <Flex gap={2}>
              <Link to={`/dashboard/presence/history/${uuid}`}>
                <Button leftIcon={<FaHistory />} colorScheme="teal" size="sm">Riwayat</Button>
              </Link>
            </Flex>
          </CardHeader>
          <CardBody>
            <ListDetail
              items={[
                { label: 'Hari', value: scheduleData?.data?.day },
                { label: 'Tanggal', value: formatDate(scheduleData?.data?.absence?.created_at) ?? getDateNow() },
                { label: 'Jam Mulai', value: scheduleData?.data?.start },
                { label: 'Jam Selesai', value: scheduleData?.data?.end },
                {
                  label: 'Kelas',
                  value: scheduleData?.data?.class?.name
                },
                {
                  label: 'Mata Pelajaran',
                  value: scheduleData?.data?.subject?.name
                },
                {
                  label: 'Tahun Ajaran',
                  value: scheduleData?.data?.school_year?.name
                },
                {
                  label: 'Status',
                  value: scheduleData?.data?.absence?.status ?? "-"
                },
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading size='md'>Tandai Kehadiran</Heading>
          </CardHeader>
          <CardBody>
            <Box mb={5}>
              <Webcam height={500} width={500} ref={webcamRef} />
            </Box>
            <Button onClick={capture} isLoading={isLoading} isDisabled={scheduleData?.data?.absence?.status != null ? true : false} colorScheme="teal">
              {scheduleData?.data?.absence?.status ?? "Tandai Kehadiran"}
            </Button>
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
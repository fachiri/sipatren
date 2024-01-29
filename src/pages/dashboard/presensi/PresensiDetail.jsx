import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, useDisclosure } from "@chakra-ui/react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import fetcher from "../../../utils/fetcher";
import useSWR from "swr";
import ListDetail from "../../../components/list/ListDetail";
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../utils/axios"
import { FaCamera, FaHistory, FaPlay, FaStarHalfAlt } from "react-icons/fa";
import { dataURItoBlob, formatDate } from "../../../utils";
import DataNotFound from "../../../components/DataNotFound";

export default function PresensiDetail() {
  const { uuid } = useParams()
  const modalPresensi = useDisclosure()
  const { data: scheduleData, error: scheduleError, isLoading: scheduleIsLoading } = useSWR(`/schedules/${uuid}`, fetcher)
  console.log(scheduleData)
  const [isCapturing, setIsCapturing] = useState(false)
  const selectRef = useRef();

  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    setIsCapturing(true)
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      try {
        const blobData = dataURItoBlob(imageSrc);
        const imageFile = new File([blobData], 'image.png', { type: 'image/png' });

        const formData = new FormData();
        formData.append('student_uuid', selectRef.current.value);
        formData.append('schedule_uuid', uuid);
        formData.append('face_image', imageFile);

        for (const pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }

        const {data: response} = await axios.post(`/absence`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.success(response.message)
        // modalPresensi.onClose(true)
      } catch (error) {
        if (error.name != 'AxiosError') {
          toast.error(error.message)
        }
      } finally {
        setIsCapturing(false)
      }
    }
  }, [webcamRef]);

  return (
    <>
      <DashboardLayout
        title="Detail"
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
            label: `Detail`,
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
                { label: 'Tanggal', value: formatDate(scheduleData?.data?.absence?.created_at) ?? "-" },
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
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader display="flex" justifyContent="space-between">
            <Heading size='md'>Detail Kehadiran (?/{scheduleData?.data?.students?.length ?? 0})</Heading>
            <Button leftIcon={<FaPlay />} onClick={modalPresensi.onOpen} colorScheme="teal" size="sm">
              Mulai Presensi
            </Button>
          </CardHeader>
          <CardBody>
            <Flex flexDirection="column" gap={2} flexBasis="50%">
              {scheduleData?.data?.students?.map((item, idx) => (
                <Flex key={idx} justifyContent="space-between">
                  <Text as="span">{item.nama} </Text>
                  {/* <Text as="b">{item.absence[0]?.status ?? "-"}</Text> */}
                  {/* <Button
                    onClick={() => {
                      setCurrentUuid(item.uuid);
                      modalPresensi.onOpen()
                    }}
                    colorScheme="teal"
                    size="sm"
                  >
                    <FaCamera />
                  </Button> */}
                </Flex>
              )) ?? <DataNotFound />}
            </Flex>
          </CardBody>
        </Card>
        {/* Modal */}
        <Modal isOpen={modalPresensi.isOpen} onClose={modalPresensi.onClose} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Presensi</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Select ref={selectRef} mb={5}>
                <option value="" hidden>Pilih Siswa</option>
                {scheduleData?.data?.students?.map((item, idx) => (
                  <option key={idx} value={item.uuid}>{item.nama}</option>
                ))}
              </Select>
              <Webcam ref={webcamRef} />
            </ModalBody>
            <ModalFooter>
              {/* <Button colorScheme='red' isDisabled={true} me={2.5}>Stop</Button> */}
              <Button onClick={capture} colorScheme='teal' isLoading={isCapturing}>Tandai Kehadiran</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </DashboardLayout>
    </>
  )
}
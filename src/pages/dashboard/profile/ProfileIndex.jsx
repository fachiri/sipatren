import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import fetcher from "../../../utils/fetcher"
import useSWR, { mutate } from 'swr'
import ListDetail from "../../../components/list/ListDetail";
import { serverUrl } from "../../../utils/constants";
import axios from "../../../utils/axios"
import { toast } from "react-toastify";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { dataURItoBlob } from "../../../utils";

export default function ProfileIndex() {
  const { data: userData, error: userError, isLoading: userIsLoading } = useSWR(`/auth/verify-token`, fetcher)
  const [isLoading, setIsLoading] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const modal = useDisclosure()

  const webcamRef = useRef(null);

  const handleChangePict = async (event) => {
    setIsLoading(true)
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("avatar", selectedFile);

        const { data: response } = await axios.patch("/users/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(response.message)
        mutate(`/auth/verify-token`)
      } catch (error) {
        if (error.name != 'AxiosError') {
          toast.error(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  const capture = useCallback(async () => {
    setIsCapturing(true)
    modal.onClose(true)
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      try {
        const blobData = dataURItoBlob(imageSrc);
        const imageFile = new File([blobData], 'image.png', { type: 'image/png' });

        const formData = new FormData();
        formData.append("avatar", imageFile);

        const { data: response } = await axios.patch("/users/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(response.message)
        mutate(`/auth/verify-token`)
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
        title="Profil"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '/dashboard'
          },
          {
            label: 'Profil',
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader>
            <Heading size='md'>Informasi</Heading>
          </CardHeader>
          <CardBody>
            <Flex
              flexDirection={{ base: "column", sm: "row" }}
              gap={5}
            >
              <Flex
                flexDirection={{ base: "row", sm: "column" }}
                gap={5}
              >
                <Box
                  border="2px solid teal"
                  borderRadius={5}
                  width="fit-content"
                  padding={.5}
                >
                  <Image
                    boxSize='150px'
                    objectFit='cover'
                    borderRadius={3}
                    src={serverUrl + userData?.data?.avatar}
                    alt={userData?.data?.nama}
                  />
                </Box>
                <FormControl>
                  <FormLabel htmlFor="change-pict">
                    <Button as="label" colorScheme="teal" htmlFor="change-pict" cursor="pointer" isLoading={isLoading}>
                      Pilih Foto
                      <Input
                        type="file"
                        id="change-pict"
                        display="none"
                        onChange={handleChangePict}
                      />
                    </Button>
                  </FormLabel>
                  <Button onClick={modal.onOpen} isLoading={isCapturing} colorScheme="teal">Ambil Foto</Button>
                  <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Ambil Foto</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Webcam height={500} width={500} ref={webcamRef} />
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={capture} colorScheme='teal' isLoading={isCapturing}>Cekrek</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </FormControl>
              </Flex>
              <Box width="100%">
                <ListDetail
                  items={[
                    { label: 'Nama', value: userData?.data?.nama },
                    { label: 'Username', value: userData?.data?.username },
                  ]}
                />
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
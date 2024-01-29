import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import { dataURItoBlob } from "../../utils";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "../../utils/axios"
import { mutate } from "swr";

export default function FormCapture({ modal, uuid }) {
  const [isCapturing, setIsCapturing] = useState(false)
  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    setIsCapturing(true)
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      try {
        const blobData = dataURItoBlob(imageSrc);
        const imageFile = new File([blobData], 'image.png', { type: 'image/png' });

        const formData = new FormData();
        formData.append("image", imageFile);
        
        for (const pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }

        const { data: response } = await axios.patch(`/students/${uuid}/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(response.message)
        mutate(`/master/students/${uuid}`)
        modal.onClose(true)
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
      <Button onClick={modal.onOpen} leftIcon={<FaCamera />} isLoading={isCapturing} colorScheme="teal" size="sm">Foto</Button>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ambil Foto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Webcam height={500} width={500} ref={webcamRef} />
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={modal.onClose}>
              Batal
            </Button>
            <Button onClick={capture} colorScheme='teal' isLoading={isCapturing}>Capture</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
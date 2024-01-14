import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

export default function FormDelete({ modal, data, onClick }) {
  return (
    <>
      <Button onClick={modal.onOpen} leftIcon={<FaTrash />} colorScheme="red" size="sm">Hapus</Button>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Peringatan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Anda akan menghapus data <Text as="b">{data}</Text>. 
            Data yang telah terhapus tidak dapat dikembalikan. 
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={modal.onClose}>
              Batal
            </Button>
            <Button onClick={onClick} colorScheme='red'>Hapus</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
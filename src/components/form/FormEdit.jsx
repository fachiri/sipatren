import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { FaPencilAlt } from "react-icons/fa";

export default function FormEdit({ modal, onSubmit, initialValues, children, validate }) {
  return (
    <>
      <Button onClick={modal.onOpen} leftIcon={<FaPencilAlt />} colorScheme="green" size="sm">Edit</Button>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <ModalContent>
                <ModalHeader>Edit Data</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {children}
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" colorScheme='teal' isLoading={props.isSubmitting}>Submit</Button>
                </ModalFooter>
              </ModalContent>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}
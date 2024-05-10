import DashboardLayout from "../../../../layouts/DashboardLayout";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  useDisclosure,
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import fetcher from "../../../../utils/fetcher"
import useSWR, { mutate } from 'swr'
import { useParams } from "react-router-dom";
import ListDetail from "../../../../components/list/ListDetail";
import { toast } from "react-toastify";
import FormDelete from "../../../../components/form/FormDelete";
import axios from "../../../../utils/axios"
import FormEdit from "../../../../components/form/FormEdit";
import FormInput from "../../../../components/form/FormInput";
import FormSelect from "../../../../components/form/FormSelect";
import { validateSantri } from "../../../../utils/validation";
import FormCapture from "../../../../components/form/FormCapture";
import { serverUrl } from "../../../../utils/constants";
import { useCallback, useRef, useState } from "react";
import { dataURItoBlob } from "../../../../utils";

export default function SantriDetail() {
  const modalDelete = useDisclosure()
  const modalEdit = useDisclosure()
  const modalCapture = useDisclosure()
  const { uuid } = useParams()
  const navigate = useNavigate()
  const { data: studentData, error: studentError, isLoading: studentIsLoading } = useSWR(`/master/students/${uuid}`, fetcher)
  const { data: classData, error: classError, isLoading: classIsLoading } = useSWR(`/master/classes`, fetcher)
  const webcamRef = useRef(null);
  const { isCapturing, setIsCapturing } = useState(false)

  const getClassOptions = () => {
    let classes = [];

    if (classData?.data?.rows) {
      classes = classData.data.rows.map((classItem) => ({
        value: classItem.uuid,
        label: classItem.name,
      }));
    }

    return classes;
  };

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
            label: 'Master',
            link: '#'
          },
          {
            label: 'Santri',
            link: '/dashboard/master/santri'
          },
          {
            label: studentData?.data?.nis,
            link: '#'
          },
        ]}
      >
        <Card mb={5}>
          <CardHeader display="flex" justifyContent="space-between">
            <Heading size='md'>Detail {studentData?.data?.nama.split(' ')[0]}</Heading>
            <Flex gap={2}>
              <FormCapture
                modal={modalCapture}
                uuid={uuid}
              />
              <FormEdit
                modal={modalEdit}
                initialValues={{
                  tanggal_masuk: studentData?.data?.tanggal_masuk,
                  nama: studentData?.data?.nama,
                  nis: studentData?.data?.nis,
                  jk: studentData?.data?.jk,
                  tempat_lahir: studentData?.data?.tempat_lahir,
                  tanggal_lahir: studentData?.data?.tanggal_lahir,
                  alamat: studentData?.data?.alamat,
                  class_uuid: studentData?.data?.class?.uuid
                }}
                validate={validateSantri}
                onSubmit={async (values, actions) => {
                  try {
                    const { data: response } = await axios.put(`/master/students/${uuid}`, values);

                    toast.success(response.message)
                    modalEdit.onClose(true)
                    mutate(`/master/students/${uuid}`)
                  } catch (error) {
                    if (error.name != 'AxiosError') {
                      toast.error(error.message)
                    }
                  } finally {
                    actions.setSubmitting(false)
                  }
                }}
              >
                <FormInput
                  label="Tanggal Masuk"
                  name="tanggal_masuk"
                  placeholder="Tanggal Masuk"
                  type="date"
                />
                <FormInput
                  label="Nama Lengkap"
                  name="nama"
                  placeholder="Nama Lengkap"
                />
                <FormInput
                  label="Nomor Induk Siswa"
                  name="nis"
                  placeholder="NIS (Nomor Induk Siswa)"
                />
                <FormSelect
                  label="Jenis Kelamin"
                  name="jk"
                  placeholder="Pilih jenis kelamin"
                  options={[
                    { value: 'Laki-laki', label: 'Laki-laki' },
                    { value: 'Perempuan', label: 'Perempuan' }
                  ]}
                />
                <FormInput
                  label="Tempat Lahir"
                  name="tempat_lahir"
                  placeholder="Tempat Lahir"
                />
                <FormInput
                  label="Tanggal Lahir"
                  name="tanggal_lahir"
                  placeholder="Tanggal Lahir"
                  type="date"
                />
                <FormInput
                  label="Alamat"
                  name="alamat"
                  placeholder="Alamat Lengkap"
                  type="textarea"
                />
                <FormSelect
                  label="Kelas"
                  name="class_uuid"
                  placeholder="Pilih kelas"
                  options={getClassOptions()}
                />
              </FormEdit>
              <FormDelete
                modal={modalDelete}
                data={studentData?.data?.nama}
                onClick={async () => {
                  try {
                    const { data: response } = await axios.delete(`/master/students/${uuid}`)

                    toast.success(response.message)
                    navigate('/dashboard/master/santri')
                  } catch (error) {
                    if (error.name != 'AxiosError') {
                      toast.error(error.message)
                    }
                  }
                }}
              />
            </Flex>
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
        <Card mb={5}>
          <CardHeader display="flex" justifyContent="space-between" pb={0}>
            <Heading size='md'>Foto Siswa</Heading>
          </CardHeader>
          <CardBody>
            <Image
              boxSize='150px'
              objectFit='cover'
              borderRadius={3}
              src={`${serverUrl}/public/avatar/${studentData?.data?.image}`}
              alt={studentData?.data?.nama}
              onClick={() => {
                window.open(`${serverUrl}/public/avatar/${studentData?.data?.image}`, '_blank');
              }}
              cursor="pointer"
            />
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
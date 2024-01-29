import DashboardLayout from "../../../../layouts/DashboardLayout";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
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
import { validateTeacher } from "../../../../utils/validation";
import TeacherForm from "./TeacherForm";

export default function TeacherDetail() {
  const modalDelete = useDisclosure()
  const modalEdit = useDisclosure()
  const { uuid } = useParams()
  const navigate = useNavigate()
  const { data: teacherData, error: teacherError, isLoading: teacherIsLoading } = useSWR(`/master/teachers/${uuid}`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Detail Guru"
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
            label: 'Guru',
            link: '/dashboard/master/teachers'
          },
          {
            label: '@' + teacherData?.data?.user?.username,
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader display="flex" justifyContent="space-between">
            <Heading size='md'>Detail {teacherData?.data?.user?.nama.split(' ')[0]}</Heading>
            <Flex gap={2}>
              <FormEdit
                modal={modalEdit}
                initialValues={{
                  nama: teacherData?.data?.user?.nama,
                  username: teacherData?.data?.user?.username,
                  nuptk: teacherData?.data?.nuptk,
                  nip: teacherData?.data?.nip,
                  jabatan: teacherData?.data?.jabatan,
                  total_jtm: teacherData?.data?.total_jtm,
                  jk: teacherData?.data?.jk,
                  tempat_lahir: teacherData?.data?.tempat_lahir,
                  tanggal_lahir: teacherData?.data?.tanggal_lahir,
                  alamat: teacherData?.data?.alamat,
                  no_hp: teacherData?.data?.no_hp,
                  status_pegawai: teacherData?.data?.status_pegawai,
                }}
                validate={validateTeacher}
                onSubmit={async (values, actions) => {
                  try {
                    const { data: response } = await axios.put(`/master/teachers/${uuid}`, values);

                    toast.success(response.message)
                    modalEdit.onClose(true)
                    mutate(`/master/teachers/${uuid}`)
                  } catch (error) {
                    if (error.name != 'AxiosError') {
                      toast.error(error.message)
                    }
                  } finally {
                    actions.setSubmitting(false)
                  }
                }}
              >
                <TeacherForm />
              </FormEdit>
              <FormDelete
                modal={modalDelete}
                data={teacherData?.data?.user?.nama}
                onClick={async () => {
                  try {
                    const { data: response } = await axios.delete(`/master/teachers/${uuid}`)

                    toast.success(response.message)
                    navigate('/dashboard/master/teachers')
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
                { label: 'Nama', value: teacherData?.data?.user?.nama },
                { label: 'NUPTK', value: teacherData?.data?.nuptk },
                { label: 'NIP', value: teacherData?.data?.nip },
                { label: 'Jabatan', value: teacherData?.data?.jabatan },
                { label: 'Total JTM', value: teacherData?.data?.total_jtm },
                { label: 'Jenis Kelamin', value: teacherData?.data?.jk },
                { label: 'Tempat Lahir', value: teacherData?.data?.tempat_lahir },
                { label: 'Tanggal Lahir', value: teacherData?.data?.tanggal_lahir },
                { label: 'Alamat', value: teacherData?.data?.alamat },
                { label: 'Nomor HP', value: teacherData?.data?.no_hp },
                { label: 'Status Pegawai', value: teacherData?.data?.status_pegawai },
              ]}
            />
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
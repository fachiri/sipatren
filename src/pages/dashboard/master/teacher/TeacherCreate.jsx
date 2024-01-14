import { Form, Formik } from "formik";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import fetcher from "../../../../utils/fetcher"
import axios from "../../../../utils/axios"
import useSWR from 'swr'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from '@chakra-ui/react'
import FormInput from "../../../../components/form/FormInput";
import FormSelect from "../../../../components/form/FormSelect";
import { toast } from "react-toastify";

export default function TeacherCreate() {
  const { data: classData, error: classError, isLoading: classIsLoading } = useSWR(`/master/classes`, fetcher)

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
        title="Tambah Guru"
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
            label: 'Tambah Data',
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader>
            <Heading as='h4' size='md'>Form Tambah Guru</Heading>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={{ nama: '', nuptk: '', nip: '', jabatan: '', total_jtm: '', jk: '', tempat_lahir: '', tanggal_lahir: '', alamat: '', no_hp: '' }}
              validate={values => {
                const errors = {};

                if (!values.nama) {
                  errors.nama = 'Nama harus diisi';
                }

                if (!values.nuptk) {
                  errors.nuptk = 'NUPTK harus diisi';
                } else if (!/^\d+$/.test(values.nuptk)) {
                  errors.nuptk = 'NUPTK harus berupa angka tanpa spasi';
                }

                if (!values.nip) {
                  errors.nip = 'NIP harus diisi';
                } else if (!/^\d+$/.test(values.nip)) {
                  errors.nip = 'NIP harus berupa angka tanpa spasi';
                }

                if (!values.jabatan) {
                  errors.jabatan = 'Jabatan harus diisi';
                }

                if (!values.total_jtm) {
                  errors.total_jtm = 'Total JTM harus diisi';
                } else if (!/^\d+$/.test(values.total_jtm)) {
                  errors.total_jtm = 'Total JTM tidak valid';
                }

                if (!values.jk) {
                  errors.jk = 'Jenis Kelamin harus diisi';
                }

                if (!values.tempat_lahir) {
                  errors.tempat_lahir = 'Tempat Lahir harus diisi';
                }

                if (!values.tanggal_lahir) {
                  errors.tanggal_lahir = 'Tanggal Lahir harus diisi';
                }

                if (!values.alamat) {
                  errors.alamat = 'Alamat harus diisi';
                }

                if (!values.no_hp) {
                  errors.no_hp = 'Nomor HP harus diisi';
                } else if (!/^\d+$/.test(values.no_hp)) {
                  errors.no_hp = 'Nomor HP tidak valid';
                }

                return errors;
              }}
              onSubmit={async (values, actions) => {
                try {
                  values.username = values.nip
                  values.status_pegawai = "AKTIF"

                  const { data: response } = await axios.post('/master/teachers', values);

                  toast.success(response.message)
                  actions.resetForm()
                } catch (error) {
                  if (error.name != 'AxiosError') {
                    toast.error(error.message)
                  }
                } finally {
                  actions.setSubmitting(false)
                }
              }}
            >
              {(props) => (
                <Form>
                  <FormInput
                    label="Nama Lengkap"
                    name="nama"
                    placeholder="Nama Lengkap"
                  />
                  <FormSelect
                    label="Jabatan"
                    name="jabatan"
                    placeholder="Pilih Jabatan"
                    options={[
                      { value: 'Kepala Sekolah', label: 'Kepala Sekolah' },
                      { value: 'Wakil Kepala Sekolah', label: 'Wakil Kepala Sekolah' },
                      { value: 'Guru', label: 'Guru' },
                      { value: 'Staf', label: 'Staf' },
                    ]}
                  />
                  <FormInput
                    label="NUPTK"
                    name="nuptk"
                    placeholder="(NUPTK) Nomor Unik Pendidik dan Tenaga Kependidikan"
                  />
                  <FormInput
                    label="NIP"
                    name="nip"
                    placeholder="NIP (Nomor Induk Pegawai)"
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
                  <FormInput
                    label="Nomor HP"
                    name="no_hp"
                    placeholder="Nomor HP"
                  />
                  <FormInput
                    label="Total JTM"
                    name="total_jtm"
                    placeholder="Total JTM"
                  />
                  <Button
                    mt={4}
                    colorScheme='teal'
                    isLoading={props.isSubmitting}
                    type='submit'
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
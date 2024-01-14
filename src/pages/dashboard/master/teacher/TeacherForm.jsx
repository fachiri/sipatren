import FormInput from "../../../../components/form/FormInput";
import FormSelect from "../../../../components/form/FormSelect";

export default function TeacherForm() {
  return (
    <>
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
      <FormSelect
        label="Status Pegawai"
        name="status_pegawai"
        placeholder="Pilih Status Pegawai"
        options={[
          { value: 'AKTIF', label: 'AKTIF' },
          { value: 'NONAKTIF', label: 'NONAKTIF' },
        ]}
      />
    </>
  )
}
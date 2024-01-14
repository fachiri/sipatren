export default function validateSantri(values) {
  const errors = {};

  if (!values.nama) {
    errors.nama = 'Nama harus diisi';
  }

  if (!values.nis) {
    errors.nis = 'NIS harus diisi';
  } else if (!/^\d+$/.test(values.nis)) {
    errors.nis = 'NIS harus berupa angka tanpa spasi';
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

  if (!values.class_uuid) {
    errors.class_uuid = 'Kelas harus diisi';
  }

  return errors;
}
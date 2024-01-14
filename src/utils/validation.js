export function validateSantri(values) {
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

export function validateTeacher(values) {
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

  if (!values.status_pegawai) {
    errors.status_pegawai = 'Status Pegawai harus diisi';
  }

  return errors;
}
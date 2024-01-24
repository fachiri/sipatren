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

export function validateClass(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Nama Kelas harus diisi';
  }

  if (!values.teacher_uuid) {
    errors.teacher_uuid = 'Wali Kelas harus diisi';
  }

  return errors;
}

export function validateSubject(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Nama Mata Pelajaran harus diisi';
  }

  if (!values.teacher_uuid) {
    errors.teacher_uuid = 'Guru Mata Pelajaran harus diisi';
  }

  return errors;
}

export function validateSchoolYear(values) {
  const errors = {};

  if (!values.start_year) {
    errors.start_year = 'Tahun Mulai harus diisi';
  } else if (!/^\d+$/.test(values.start_year)) {
    errors.start_year = 'Tahun Mulai harus berupa angka';
  }

  if (!values.end_year) {
    errors.end_year = 'Tahun Selesai harus diisi';
  } else if (!/^\d+$/.test(values.end_year)) {
    errors.end_year = 'Tahun Selesai harus berupa angka';
  }

  if (values.start_year === values.end_year) {
    errors.end_year = 'Tahun Selesai harus berbeda dengan Tahun Mulai';
  }

  return errors;
}

export function validateSchedule(values) {
  const errors = {};

  if (!values.day) {
    errors.day = 'Pilih Hari';
  }

  if (!values.start) {
    errors.start = 'Pilih Jam Mulai';
  }

  if (!values.end) {
    errors.end = 'Pilih Jam Selesai';
  }

  if (!values.class_uuid) {
    errors.class_uuid = 'Pilih Kelas';
  }

  if (!values.subject_uuid) {
    errors.subject_uuid = 'Pilih Mata Pelajaran';
  }

  if (!values.school_year_uuid) {
    errors.school_year_uuid = 'Pilih Tahun Ajaran';
  }

  return errors;
}
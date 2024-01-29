import { FaCalendarCheck, FaChartPie, FaDatabase, FaFile, FaHistory, FaUsers } from "react-icons/fa";

export const MenuLists = {
  ADMIN: [
    {
      label: 'Master',
      icon: FaDatabase,
      subItems: [
        {
          link: '/dashboard/master/santri',
          label: 'Santri'
        },
        {
          link: '/dashboard/master/teachers',
          label: 'Guru'
        },
        {
          link: '/dashboard/master/classes',
          label: 'Kelas'
        },
        {
          link: '/dashboard/master/subjects',
          label: 'Mata Pelajaran'
        },
        {
          link: '/dashboard/master/schoolyears',
          label: 'Tahun Ajaran'
        },
        {
          link: '/dashboard/master/schedules',
          label: 'Jadwal'
        },
      ]
    },
    {
      label: 'Laporan',
      icon: FaChartPie,
      subItems: [
        {
          link: '/dashboard/reports/presence',
          label: 'Presensi'
        },
        {
          link: '/dashboard/reports/spp',
          label: 'SPP'
        },
      ]
    }
  ],
  GURU: [
    {
      link: '/dashboard/classes',
      label: 'Kelas',
      icon: FaUsers
    },
    {
      link: '/dashboard/administration',
      label: 'Administrasi',
      icon: FaFile
    },
    {
      link: '/dashboard/presence',
      label: 'Presensi',
      icon: FaCalendarCheck
    },
    {
      link: '/dashboard/histories',
      label: 'Riwayat',
      icon: FaHistory
    },
  ]
}
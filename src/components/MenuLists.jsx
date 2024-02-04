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
          link: '/dashboard/master/schedules',
          label: 'Jadwal'
        },
        {
          link: '/dashboard/master/schoolyears',
          label: 'Tahun Ajaran'
        },
      ]
    },
    {
      link: '/dashboard/administration',
      label: 'Administrasi',
      icon: FaFile
    },
    {
      link: '/dashboard/reports/spp',
      label: 'Laporan',
      icon: FaChartPie
    }
  ],
  GURU: [
    {
      link: '/dashboard/classes',
      label: 'Kelas',
      icon: FaUsers
    },
    {
      link: '/dashboard/presence',
      label: 'Presensi',
      icon: FaCalendarCheck
    },
    // {
    //   link: '/dashboard/histories',
    //   label: 'Riwayat',
    //   icon: FaHistory
    // },
    {
      link: '/dashboard/reports/presence',
      label: 'Laporan',
      icon: FaChartPie
    }
  ]
}
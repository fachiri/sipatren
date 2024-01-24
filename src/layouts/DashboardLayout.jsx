import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Image,
  Heading,
  Drawer,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from '@chakra-ui/react';
import { FaCalendarCheck, FaChartPie, FaDatabase, FaFile, FaHistory, FaHome } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import { Fragment } from 'react';
import fetcher from "../utils/fetcher"
import useSWR, { mutate } from 'swr'
import { serverUrl } from '../utils/constants';

export default function DashboardLayout({ children, breadcrumbs, title, actions }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data: userData, error: userError, isLoading: userIsLoading } = useSWR(`/auth/verify-token`, fetcher)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('accessToken');

    navigate('/login')
  }

  return (
    <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh">
      <SidebarContent userdata={userData} display={{ base: 'none', md: 'unset' }} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent userdata={userData} w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justifyContent={{ base: 'space-between', md: 'flex-end' }}
          w="full"
          px="4"
          borderBottomWidth="1px"
          borderColor={useColorModeValue('inherit', 'gray.700')}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="sm"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onOpen}
            icon={<FiMenu />}
            size="md"
          />

          <Flex align="center">
            <Flex flexDirection="column" alignItems="end">
              <Text as="small" fontWeight="bold" mb={-1}>{userData?.data?.nama}</Text>
              <Text as="small">@{userData?.data?.username}</Text>
            </Flex>
            <Menu>
              <MenuButton ml="4">
                <Avatar
                  size="sm"
                  name={userData?.data?.nama}
                  src={serverUrl + userData?.data?.avatar}
                  cursor="pointer"
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/dashboard/profile')}>Profil</MenuItem>
                <MenuItem>Keamanan</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>
                  Keluar
                </MenuItem>
              </MenuList>
            </Menu>

          </Flex>
        </Flex>

        <Box as="main" p={6} minH="25rem" bg={useColorModeValue('auto', 'gray.800')}>
          <Flex flexDirection={{ base: "column", md: "row" }} justifyContent={{ md: "space-between" }} alignItems="flex-start" mb={5}>
            <Flex flexDirection="column">
              <Heading as='h3' size='lg'>
                {title}
              </Heading>
              <Breadcrumb spacing='8px'>
                {breadcrumbs.map((item, idx) => (
                  <BreadcrumbItem key={idx} isCurrentPage={breadcrumbs.length - 1 === idx}>
                    <BreadcrumbLink as={Link} to={item.link}>{item.label}</BreadcrumbLink>
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
            </Flex>
            {actions && (
              <Flex mt={{ base: 3, md: 0 }} gap={2}>
                {actions.map((item, idx) => (
                  <Fragment key={idx}>
                    {item.link && (
                      <Link to={item.link}>
                        <Button leftIcon={item.icon} colorScheme={item.color} variant='solid' size={{ base: "sm", md: "md" }}>
                          {item.label}
                        </Button>
                      </Link>
                    )}
                    {item.onClick && (
                      <Button onClick={item.onClick} leftIcon={item.icon} colorScheme={item.color} variant='solid' size="sm">
                        {item.label}
                      </Button>
                    )}
                  </Fragment>
                ))}
              </Flex>
            )}
          </Flex>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ ...props }) => (
  <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    zIndex="sticky"
    h="full"
    pb="10"
    overflowX="hidden"
    overflowY="auto"
    bg={useColorModeValue('white', 'gray.800')}
    borderColor={useColorModeValue('inherit', 'gray.700')}
    borderRightWidth="1px"
    w="60"
    {...props}
  >
    <Flex px="4" py="5" alignItems="center">
      <Image src={logo} alt='Logo' h={8} mb={2} />
      <Text
        fontSize="2xl"
        ml="3"
        color="teal.500"
        fontWeight="semibold"
      >
        SIPATREN
      </Text>
    </Flex>
    <Flex direction="column" as="nav" fontSize="md" color="gray.600" aria-label="Main Navigation">
      <Link to="/dashboard">
        <NavItem icon={FaHome} label="Dashboard" />
      </Link>
      {['ADMIN'].includes(props.userdata?.data?.role) &&
        <NavSubItem
          label="Master"
          icon={FaDatabase}
          items={[
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
          ]}
        />
      }
      {['GURU'].includes(props.userdata?.data?.role) &&
        <Link to="/dashboard/administrasi">
          <NavItem icon={FaFile} label="Administrasi" />
        </Link>
      }
      {['SANTRI'].includes(props.userdata?.data?.role) &&
        <>
          <Link to="/dashboard/presence">
            <NavItem icon={FaCalendarCheck} label="Presensi" />
          </Link>
          <Link to="/dashboard/histories">
            <NavItem icon={FaHistory} label="Riwayat" />
          </Link>
        </>
      }
      {['ADMIN'].includes(props.userdata?.data?.role) &&
        <NavSubItem
          label="Laporan"
          icon={FaChartPie}
          items={[
            {
              link: '/dashboard/reports/presence',
              label: 'Presensi'
            },
            {
              link: '/dashboard/reports/spp',
              label: 'SPP'
            },
          ]}
        />
      }
    </Flex>
  </Box>
);

const NavItem = ({ icon, label }) => {
  const color = useColorModeValue('gray.600', 'gray.300');
  return (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue('inherit', 'gray.400')}
      _hover={{
        bg: useColorModeValue('gray.100', 'gray.900'),
        color: useColorModeValue('gray.900', 'gray.200')
      }}
      w="100%"
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: color
          }}
          as={icon}
        />
      )}
      {label}
    </Flex>
  );
};

const NavSubItem = ({ icon, label, items }) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem border="0px">
        <AccordionButton p={0}>
          <NavItem icon={icon} label={<Flex w="100%" alignItems="center" justifyContent="space-between">{label} <AccordionIcon /></Flex>} />
        </AccordionButton>
        <AccordionPanel p={0}>
          {items.map((item, index) => (
            <Link to={item.link} key={index}>
              <NavItem label={<Text pl={8}>{item.label}</Text>} />
            </Link>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
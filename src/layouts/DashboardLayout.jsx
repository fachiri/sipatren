import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Stack,
  Image,
  Button,
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
  MenuGroup,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';
import { FaArrowCircleRight, FaBell, FaCalendarCheck, FaChartPie, FaDatabase, FaFile, FaHome } from 'react-icons/fa';
import { AiOutlineTeam, AiOutlineHome } from 'react-icons/ai';
import { BsFolder2, BsCalendarCheck } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { RiFlashlightFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'

export default function DashboardLayout({ children }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh">
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
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
            <Flex borderRadius="50%" border="2px" borderColor="gray.500" w={8} h={8} alignItems="center" justifyContent="center">
              <Icon color="gray.500" as={FaBell} cursor="pointer" />
            </Flex>
            <Menu>
              <MenuButton ml="4">
                <Avatar
                  size="sm"
                  name="Ahmad"
                  src="https://avatars2.githubusercontent.com/u/37842853?v=4"
                  cursor="pointer"
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Profil</MenuItem>
                <MenuItem>Keamanan</MenuItem>
                <MenuDivider />
                <MenuItem>Keluar</MenuItem>
              </MenuList>
            </Menu>

          </Flex>
        </Flex>

        <Box as="main" p={6} minH="25rem" bg={useColorModeValue('auto', 'gray.800')}>
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
      <NavSubItem
        label="Master Data"
        icon={FaDatabase}
        items={[
          {
            link: '/dashboard/master/users',
            label: 'Pengguna'
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
        ]}
      />
      <NavItem icon={FaFile} label="Administrasi" />
      <Link to="/dashboard/presence">
        <NavItem icon={FaCalendarCheck} label="Absensi" />
      </Link>
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
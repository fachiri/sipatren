import { Card, CardBody, CardHeader, Grid, Heading, Text } from "@chakra-ui/react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import IconStudent from "../../../components/icon/IconStudent";
import StatCount from "../../../components/stat/StatCount";
import IconUser from "../../../components/icon/IconUser";
import IconTeacher from "../../../components/icon/IconTeacher";
import IconAdmin from "../../../components/icon/IconAdmin";

export default function Dashboard() {
  return (
    <>
      <DashboardLayout
        title="Dashboard"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '#'
          },
        ]}
      >
        <Grid templateColumns='repeat(3, 1fr)' gap={5} mb={5}>
          <StatCount
            label="Admin"
            number="10"
            icon={<IconAdmin width={75} height={75} />}
          />
          <StatCount
            label="Guru"
            number="50"
            icon={<IconTeacher width={75} height={75} />}
          />
          <StatCount
            label="Siswa"
            number="500"
            icon={<IconStudent width={75} height={75} />}
          />
        </Grid>
        <Card>
          <CardHeader>
            <Heading size='md'>Menu</Heading>
          </CardHeader>
          <CardBody>
            <Text>Menus</Text>
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}
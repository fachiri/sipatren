import DashboardLayout from "../../../layouts/DashboardLayout";

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
        Dashboard test
      </DashboardLayout>
    </>
  )
}
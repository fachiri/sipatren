import { Card, CardBody, Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

export default function StatCount({ label, number, icon }) {
  return (
    <Card>
      <CardBody>
        <Flex>
          <Stat>
            <StatLabel fontSize={15}>{label}</StatLabel>
            <StatNumber fontSize={40}>{number}</StatNumber>
          </Stat>
          {icon}
        </Flex>
      </CardBody>
    </Card>
  )
}
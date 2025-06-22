import DriverDashboard from "@/features/driver/components/DriverDashboard";
import { DriverTable } from "@/features/driver/components/DriverTable";
import { DriverForm } from "@/features/driver/components/DriverForm";
import { driversMock } from "@/mock/drivers.mock";
import { Button, Container, Flex } from "@mantine/core";
import { Plus } from "phosphor-react";
import { useState } from "react";
import { BaseModal } from "@/shared/components/Modal/BaseModal";

const DriverPage = () => {
	const [opened, setOpened] = useState(false);

	const handleSubmit = async () => {
		try {
			setTimeout(() => {}, 2000);

			setOpened(false);
		} catch (error) {
			console.error(error);
		} finally {
		}
	};

	return (
		<Container fluid>
			<DriverDashboard></DriverDashboard>
			<Flex justify="flex-end">
				<Button
					leftSection={<Plus size={18} weight="bold" />}
					onClick={() => setOpened(true)}
				>
					Novo Motorista
				</Button>
			</Flex>

			<DriverTable drivers={driversMock} />
						<BaseModal
							opened={opened}
							onClose={() => setOpened(false)}
							title="Cadastrar Motorista"
						>
							<DriverForm onSubmit={handleSubmit} />
						</BaseModal>
		</Container>
	);
};

export default DriverPage;

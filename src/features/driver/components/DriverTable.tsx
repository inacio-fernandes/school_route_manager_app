import { EntityTable } from "@/shared/components/EntityTable/EntityTable";
import { Driver } from "@/features/driver/model/driver.schema";
import { Link } from 'react-router-dom';

type DriverTableProps = {
	drivers: Driver[];
};

export const DriverTable: React.FC<DriverTableProps> = ({ drivers }) => {
	return (
		<EntityTable
			records={drivers}
			defaultSortColumn="name"
			columns={[
				{
					accessor: "name",
					title: "Nome",
					sortable: true,
					render: (driver) => (
						<Link to={`/drivers/${driver.id}`}>{driver.name}</Link>
					),
				},
				{ accessor: "phone", title: "Telefone", sortable: true },
				{
					accessor: "cpf",
					title: "CPF",
					sortable: true,
					render: (driver) => (
						<Link to={`/drivers/${driver.id}`}>{driver.cpf}</Link>
					),
				},
			]}
		/>
	);
};

import { useState, useMemo, useEffect } from "react";
import {
	DataTable,
	type DataTableSortStatus,
	type DataTableColumn,
} from "mantine-datatable";

type EntityTableProps<T> = {
	records: T[];
	columns: DataTableColumn<T>[];
	defaultSortColumn: keyof T;
};

export const EntityTable = <T extends Record<string, any>>({
	records: initialRecords,
	columns,
	defaultSortColumn,
}: EntityTableProps<T>) => {
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
		columnAccessor: defaultSortColumn as string,
		direction: "asc",
	});

	const [records, setRecords] = useState(initialRecords);
	const [search, setSearch] = useState("");

	const sortedRecords = useMemo(() => {
		return [...records].sort((a, b) => {
			const { columnAccessor, direction } = sortStatus;
			const aValue = a[columnAccessor as keyof T];
			const bValue = b[columnAccessor as keyof T];

			if (typeof aValue === "string" && typeof bValue === "string") {
				return direction === "asc"
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			} else if (typeof aValue === "number" && typeof bValue === "number") {
				return direction === "asc" ? aValue - bValue : bValue - aValue;
			} else {
				return 0;
			}
		});
	}, [records, sortStatus]);

	useEffect(() => {
		if (search === "") {
			setRecords(initialRecords);
		} else {
			const filteredRecords = initialRecords.filter((record) => {
				return Object.values(record).some((value) => {
					if (typeof value === "string") {
						return value.toLowerCase().includes(search.toLowerCase());
					}
					return false;
				});
			});
			setRecords(filteredRecords);
		}
	}, [search, initialRecords]);

	return (
		<DataTable
			striped
			highlightOnHover
			sortStatus={sortStatus}
			onSortStatusChange={setSortStatus}
			columns={columns as DataTableColumn<Record<string, unknown>>[]}
			records={sortedRecords}
		/>
	);
};

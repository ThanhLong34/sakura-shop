import React, { useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";

function ImageFile() {
	const [customers, setCustomers] = useState([
		{
			id: 1,
			avatar: "https://www.primefaces.org/apollo-react/demo/images/avatar/amyelsner.png",
			fullname: "Nguyễn Thành Long",
			age: 21,
			status: "Online",
		},
		{
			id: 2,
			avatar: "https://www.primefaces.org/apollo-react/demo/images/avatar/amyelsner.png",
			fullname: "Nguyễn Thị Huế",
			age: 21,
			status: "Offline",
		},
		{
			id: 3,
			avatar: "https://www.primefaces.org/apollo-react/demo/images/avatar/amyelsner.png",
			fullname: "Dương Mỹ Lộc",
			age: 22,
			status: "Offline",
		},
		{
			id: 4,
			avatar: "https://www.primefaces.org/apollo-react/demo/images/avatar/amyelsner.png",
			fullname: "Trần Thị Ngọc Ánh",
			age: 20,
			status: "Online",
		},
	]);

	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const statuses = ["Online", "Offline"];

	const getSeverity = (status) => {
		switch (status) {
			case "Online":
				return "success";

			case "Offline":
				return "warning";
		}
	};

	const customerBodyTemplate = (rowData) => {
		return (
			<div className="flex align-items-center gap-2">
				<img className="w-3rem mr-2" alt={rowData.fullname} src={rowData.avatar} width="32" />
				<span>{rowData.fullname}</span>
			</div>
		);
	};

	const statusBodyTemplate = (rowData) => {
		return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
	};

	const renderHeader = () => {
		return (
			<span className="p-input-icon-left">
				<i className="pi pi-search" />
				<InputText type="search" placeholder="Nhập thông tin cần tìm" />
			</span>
		);
	};

	const header = renderHeader();

	return (
		<div>
			<div className="card">
				<DataTable
					value={customers}
					rows={10}
					header={header}
					selection={selectedCustomer}
					onSelectionChange={(e) => setSelectedCustomer(e.value)}
					selectionMode="single"
					dataKey="id"
					emptyMessage="Không có kết quả"
					tableStyle={{ minWidth: "50rem" }}
				>
					<Column
						field="fullname"
						header="Ảnh & Họ tên"
						style={{ minWidth: '55%' }}
						body={customerBodyTemplate}
					></Column>
					<Column field="age" header="Tuổi" style={{ width: "25%" }}></Column>
					<Column field="status" header="Status" style={{ minWidth: "20%" }} body={statusBodyTemplate} />
				</DataTable>
			</div>
		</div>
	);
}

export default ImageFile;

import { useState, useRef } from "react";

import TableSearch from "@/admin/components/TableSearch";
import TableFilterPopup from "@/admin/components/TableFilterPopup";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Dropdown } from "primereact/dropdown";

function ImageFile() {
	//? Variables
	const statuses = ["Hoạt động", "Bị khóa"];
	const actions = [
		{
			label: "Xem chi tiết",
			icon: "pi pi-eye",
			command: () => {
				console.log("Xem chi tiết");
			},
		},
		{
			label: "Xóa tài khoản",
			icon: "pi pi-trash",
			command: () => {
				console.log("Xóa tài khoản");
			},
		},
	];
	const searchType = useRef(null);
	const searchOptions = [
		{
			title: "Tên người chơi",
			value: "nickname",
		},
		{
			title: "Số điện thoại",
			value: "phoneNumber",
		},
		{
			title: "Email",
			value: "email",
		},
	];
	const fillValue = useRef(null);

	//? States

	const [customers, setCustomers] = useState([
		{
			id: 1,
			avatar: "https://www.primefaces.org/apollo-react/demo/images/avatar/amyelsner.png",
			fullname: "Nguyễn Thành Long",
			age: 21,
			status: "Hoạt động",
		},
		{
			id: 2,
			avatar: "https://www.primefaces.org/apollo-react/demo/images/avatar/amyelsner.png",
			fullname: "Nguyễn Thị Huế",
			age: 21,
			status: "Bị khóa",
		},
		{
			id: 3,
			avatar: "https://www.primefaces.org/apollo-react/demo/images/avatar/amyelsner.png",
			fullname: "Dương Mỹ Lộc",
			age: 22,
			status: "Hoạt động",
		},
		{
			id: 4,
			avatar: "https://www.primefaces.org/apollo-react/demo/images/avatar/amyelsner.png",
			fullname: "Trần Thị Ngọc Ánh",
			age: 20,
			status: "Hoạt động",
		},
	]);
	const [selectedCustomer, setSelectedCustomer] = useState(null);

	//? Functions

	function getSeverity(status) {
		switch (status) {
			case "Hoạt động":
				return "success";
			case "Bị khóa":
				return "danger";
		}
	}

	//? Handles
	function handleSearch(searchData) {
		console.log(searchData);
	}

	function handleSort({ field }) {
		console.log(field);
	}

	function handleApplyFilter({ field }) {
		console.log({
			fillType: field,
			fillValue: fillValue.current,
		});
	}

	function handleClearFilter() {
		console.log("Clear");
	}

	//? Templates

	const headerTemplate = () => {
		return (
			<div className="grid">
				<div className="col-12">
					<TableSearch searchOptions={searchOptions} onSearch={handleSearch} />
				</div>
				<div className="col-12">
					
				</div>
			</div>
		);
	};

	const playerTemplate = (rowData) => {
		return <span>{rowData.fullname}</span>;
	};

	const statusTemplate = (rowData) => {
		return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
	};

	const statusFilterTemplate = (options) => {
		return (
			<TableFilterPopup
				label="Chọn trạng thái"
				options={statuses}
				getSeverity={getSeverity}
				onChange={(value) => (fillValue.current = value)}
			/>
		);
	};

	const filterApplyButtonTemplate = (filter) => {
		return <Button icon="pi pi-check" onClick={() => handleApplyFilter(filter)} />;
	};

	const filterClearButtonTemplate = () => {
		return <Button icon="pi pi-refresh" severity="warning" onClick={handleClearFilter} />;
	};

	const actionTemplate = (rowData) => {
		return (
			<SplitButton label="Tùy chọn" icon="pi pi-th-large" model={actions} severity="info" size="small" outlined />
		);
	};

	return (
		<div>
			<div className="card">
				<h3 className="mb-3">Danh sách người chơi</h3>
				<DataTable
					value={customers}
					rows={10}
					header={headerTemplate}
					stripedRows
					showGridlines
					removableSort
					scrollable
					selection={selectedCustomer}
					onSelectionChange={(e) => setSelectedCustomer(e.value)}
					selectionMode="single"
					dataKey="id"
					emptyMessage="Không có kết quả"
					tableStyle={{ minWidth: "100rem" }}
				>
					<Column
						field="fullname"
						header="Tên người chơi"
						body={playerTemplate}
						frozen
						sortable
						sortFunction={handleSort}
					/>
					<Column field="fullname" header="Số điện thoại" body={playerTemplate} />
					<Column field="fullname" header="Email" body={playerTemplate} />
					<Column field="age" header="Sức khỏe" sortable sortFunction={handleSort} />
					<Column field="age" header="Sao" sortable sortFunction={handleSort} />
					<Column field="age" header="Kim cương" sortable sortFunction={handleSort} />
					<Column field="age" header="Kinh nghiệm" sortable sortFunction={handleSort} />
					<Column field="age" header="Cấp độ" sortable sortFunction={handleSort} />
					<Column
						field="status"
						header="Trạng thái"
						body={statusTemplate}
						filter
						filterElement={statusFilterTemplate}
						filterApply={filterApplyButtonTemplate}
						filterClear={filterClearButtonTemplate}
						showFilterMatchModes={false}
						showFilterOperator={false}
						showFilterMenuOptions={false}
						filterMatchMode="equals"
					/>
					<Column
						headerStyle={{ textAlign: "center" }}
						bodyStyle={{ textAlign: "center", overflow: "visible" }}
						body={actionTemplate}
						frozen
						alignFrozen="right"
					/>
				</DataTable>
			</div>
		</div>
	);
}

export default ImageFile;

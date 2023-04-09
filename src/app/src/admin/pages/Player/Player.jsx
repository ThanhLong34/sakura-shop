import { useState, useRef, useEffect } from "react";

import playerApi from "@/apis/playerApi";

import TableHeader from "@/admin/components/TableHeader";
import TableSearch from "@/admin/components/TableSearch";
import TableFilterPopup from "@/admin/components/TableFilterPopup";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";

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

	const [players, setPlayers] = useState([]);
	const [selectedCustomer, setSelectedCustomer] = useState(null);

	//? Effects
	useEffect(() => {
		playerApi.getAll().then((response) => {
			const data = response.data.map(player => ({
				...player,
				id: +player.id,
				health: +player.health,
				star: +player.star,
				diamond: +player.diamond,
				experience: +player.experience,
				level: +player.level,
				status: player.lockedAt ? 'Bị khóa' : 'Hoạt động'
			}));

			setPlayers(data);
		});
	}, []);

	//? Functions

	function getSeverity(status) {
		switch (status) {
			case "Bị khóa":
				return "danger";
			case "Hoạt động":
				return "success";
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
					<TableHeader showAddItemButton={false} />
				</div>
				<div className="col-12">
					<TableSearch searchOptions={searchOptions} onSearch={handleSearch} />
				</div>
			</div>
		);
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
					value={players}
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
					tableStyle={{ minWidth: "max-content" }}
				>
					<Column
						field="nickname"
						header="Tên người chơi"
						frozen
						sortable
						sortFunction={handleSort}
					/>
					<Column field="phoneNumber" header="Số điện thoại"/>
					<Column field="email" header="Email"/>
					<Column field="health" header="Sức khỏe" sortable sortFunction={handleSort} />
					<Column field="star" header="Sao" sortable sortFunction={handleSort} />
					<Column field="diamond" header="Kim cương" sortable sortFunction={handleSort} />
					<Column field="experience" header="Kinh nghiệm" sortable sortFunction={handleSort} />
					<Column field="level" header="Cấp độ" sortable sortFunction={handleSort} />
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

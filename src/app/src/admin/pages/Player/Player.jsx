import { useState, useRef, useEffect, useCallback, useMemo } from "react";

import playerApi from "@/apis/playerApi";

import TableHeader from "@/admin/components/TableHeader";
import TableSearch from "@/admin/components/TableSearch";
import TableFilterPopup from "@/admin/components/TableFilterPopup";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Paginator } from "primereact/paginator";

//? Variables
const statuses = ["Hoạt động", "Bị khóa"];
const rowsPerPageOptions = [10, 20, 30];
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

//? Component
function Player() {
	//? Variables
	const fillValue = useRef(null);

	//? States
	const [totalItem, setTotalItem] = useState(0);
	const [tableData, setTableData] = useState([]);
	const [tableParams, setTableParams] = useState({
		limit: 10,
		offset: 0,
		searchType: null,
		searchValue: null,
		fillType: null,
		fillValue: null,
		orderby: null,
		reverse: null,
	});

	const [selectedItem, setSelectedItem] = useState(null);

	//? Effects
	// Get table data
	useEffect(() => {
		playerApi.getAll(tableParams).then((response) => {
			const data = response.data.map((player) => ({
				...player,
				id: +player.id,
				health: +player.health,
				star: +player.star,
				diamond: +player.diamond,
				experience: +player.experience,
				level: +player.level,
				status: player.lockedAt ? "Bị khóa" : "Hoạt động",
			}));

			setTableData(data);
			setTotalItem(response.totalItem);
		});
	}, [
		tableParams.limit,
		tableParams.offset,
		tableParams.searchType,
		tableParams.searchValue,
		tableParams.fillType,
		tableParams.fillValue,
		tableParams.orderby,
		tableParams.reverse,
	]);

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
	const handleSearch = useCallback((searchData) => {
		console.log(searchData);
	}, []);
	const handleSort = ({ field }) => {
		console.log(field);
	};
	const handleChangeFilter = useCallback(
		(value) => {
			fillValue.current = value;
		},
		[fillValue]
	);
	const handleApplyFilter = ({ field }) => {
		console.log({
			fillType: field,
			fillValue: fillValue.current,
		});
	};
	const handleClearFilter = () => {
		console.log("Clear");
	};
	const handleChangePage = (e) => {
		setTableParams((prevState) => ({
			...prevState,
			limit: e.rows,
			offset: e.first,
		}));
	};
	const handleReload = useCallback(() => {}, []);

	//? Templates
	const headerTemplate = () => {
		return (
			<div className="grid">
				<div className="col-12">
					<TableHeader showAddItemButton={false} onReload={handleReload} />
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
				onChange={handleChangeFilter}
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
				<div className="grid mb-3">
					<div className="col-6">
						<h3 className="">Danh sách người chơi</h3>
					</div>
					<div className="col-6 text-right">
						<h3>{`(${tableData.length} trên tổng ${totalItem})`}</h3>
					</div>
				</div>
				<DataTable
					value={tableData}
					rows={10}
					header={headerTemplate}
					stripedRows
					showGridlines
					removableSort
					scrollable
					selection={selectedItem}
					onSelectionChange={(e) => setSelectedItem(e.value)}
					selectionMode="single"
					dataKey="id"
					emptyMessage="Không có kết quả"
					tableStyle={{ minWidth: "max-content" }}
				>
					<Column field="nickname" header="Tên người chơi" frozen sortable sortFunction={handleSort} />
					<Column field="phoneNumber" header="Số điện thoại" />
					<Column field="email" header="Email" />
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
				<Paginator
					className="mt-4"
					first={tableParams.offset}
					rows={tableParams.limit}
					totalRecords={totalItem}
					rowsPerPageOptions={rowsPerPageOptions}
					onPageChange={handleChangePage}
				/>
			</div>
		</div>
	);
}

export default Player;

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import playerApi from "@/apis/playerApi";

import TableHeader from "@/admin/components/TableHeader";
import TableSearch from "@/admin/components/TableSearch";
import TableFilterPopup from "@/admin/components/TableFilterPopup";

// Icons
import HealthIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";
import ExperienceIcon from "@/assets/images/ExperienceIcon.png";
import LevelIcon from "@/assets/images/LevelIcon.png";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Paginator } from "primereact/paginator";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";

//? Variables
const initialTableParams = {
	limit: 10,
	offset: 0,
	searchType: null,
	searchValue: null,
	fillType: null,
	fillValue: null,
	orderby: null,
	reverse: null,
};
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
const statuses = ["Hoạt động", "Bị khóa"];

//? Functions
function getSeverity(status) {
	switch (status) {
		case "Bị khóa":
			return "danger";
		case "Hoạt động":
			return "success";
	}
}
function getFillValue(status) {
	switch (status) {
		case "Bị khóa":
			return "not_null";
		case "Hoạt động":
			return "is_null";
	}
}

TableData.propTypes = {
	onOpenDialog: PropTypes.func,
};

TableData.defaultProps = {
	onOpenDialog: () => {},
};

//? Component
function TableData({ onOpenDialog }) {
	//? Variables
	const fillValue = useRef(null);

	//? Refs
	const tableSearchRef = useRef(null);
	const toastRef = useRef(null);

	//? States
	const [totalItem, setTotalItem] = useState(0);
	const [tableData, setTableData] = useState([]);
	const [tableParams, setTableParams] = useState(initialTableParams);
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
		
	}, [tableParams]);

	//? Functions
	function getSortedTableData(e) {
		return tableData;
	}

	//? Handles
	const handleReload = useCallback(() => {
		setTableParams({ ...initialTableParams });
		tableSearchRef.current?.onReset();
	}, []);
	const handleSearch = useCallback(({ searchValue, searchType }) => {
		if (searchValue && searchType) {
			setTableParams((prevState) => ({
				...prevState,
				searchValue,
				searchType,
			}));
		}
	}, []);
	const handleSort = ({ sortField, sortOrder }) => {
		setTableParams((prevState) => ({
			...prevState,
			orderby: sortField,
			reverse: sortOrder === -1,
		}));
	};
	const handleChangeFilter = useCallback(
		(value) => {
			fillValue.current = value;
		},
		[]
	);
	const handleApplyFilter = ({ field }) => {
		setTableParams((prevState) => ({
			...prevState,
			fillType: field === "status" ? "lockedAt" : field,
			fillValue: getFillValue(fillValue.current),
		}));
	};
	const handleClearFilter = () => {
		handleReload();
	};
	const handleChangePage = (e) => {
		setTableParams((prevState) => ({
			...prevState,
			limit: e.rows,
			offset: e.first,
		}));
	};
	const handleDeleteItem = (item) => {
		playerApi.trashById(item.id).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({ severity: "success", summary: "Thành công", detail: "Xóa thành công", life: 3000 });
				handleRefreshPage();
			} else {
				toastRef.current.show({ severity: "error", summary: "Lỗi", detail: response.message, life: 3000 });
			}
		});
	};
	const handleRefreshPage = () => {
		setTableParams((prevState) => ({ ...prevState }));
	};
	const handleLockAccount = (item) => {
		playerApi.lockById(item.id).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành công",
					detail: "Khóa tài khoản thành công",
					life: 3000,
				});
				handleRefreshPage();
			} else {
				toastRef.current.show({ severity: "error", summary: "Lỗi", detail: response.message, life: 3000 });
			}
		});
	};
	const handleUnlockAccount = (item) => {
		playerApi.unlockById(item.id).then((response) => {
			if (response.code === 1) {
				toastRef.current.show({
					severity: "success",
					summary: "Thành công",
					detail: "Mở khóa tài khoản thành công",
					life: 3000,
				});
				handleRefreshPage();
			} else {
				toastRef.current.show({
					severity: "error",
					summary: "Lỗi",
					detail: response.message,
					life: 3000,
				});
			}
		});
	};

	//? Templates
	const headerTemplate = () => {
		return (
			<div className="grid">
				<div className="col-12">
					<TableHeader showAddItemButton={false} onReload={handleReload} />
				</div>
				<div className="col-12">
					<TableSearch ref={tableSearchRef} searchOptions={searchOptions} onSearch={handleSearch} />
				</div>
			</div>
		);
	};
	const levelDataTemplate = (rowData) => {
		return (
			<span className="data-template">
				<span className="data-template-value">{rowData.level}</span>
				<img className="data-template-icon" src={LevelIcon} alt="level icon" />
			</span>
		);
	};
	const experienceDataTemplate = (rowData) => {
		return (
			<span className="data-template">
				<span className="data-template-value">{rowData.experience}</span>
				<img className="data-template-icon" src={ExperienceIcon} alt="experience icon" />
			</span>
		);
	};
	const healthDataTemplate = (rowData) => {
		return (
			<span className="data-template">
				<span className="data-template-value">{rowData.health}</span>
				<img className="data-template-icon" src={HealthIcon} alt="health icon" />
			</span>
		);
	};
	const starDataTemplate = (rowData) => {
		return (
			<span className="data-template">
				<span className="data-template-value">{rowData.star}</span>
				<img className="data-template-icon" src={StarIcon} alt="star icon" />
			</span>
		);
	};
	const diamondDataTemplate = (rowData) => {
		return (
			<span className="data-template">
				<span className="data-template-value">{rowData.diamond}</span>
				<img className="data-template-icon" src={DiamondIcon} alt="diamond icon" />
			</span>
		);
	};
	const statusDataTemplate = (rowData) => {
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
	const actionsTemplate = (rowData) => {
		const actions = [
			{
				label: "Xem thông tin",
				icon: "pi pi-eye",
				command: () => {
					onOpenDialog('ViewItemDialog', rowData);
				},
			},
			{
				label: "Xem LS đổi thưởng",
				icon: "pi pi-calendar",
				command: () => {
					onOpenDialog('ViewRewardHistoryDialog', rowData);
				},
			},
			{
				label: rowData.lockedAt ? "Mở khóa" : "Khóa tài khoản",
				icon: "pi pi-lock",
				command: (e) => {
					confirmPopup({
						target: e.originalEvent.currentTarget,
						message: `Bạn có chắn chắc muốn ${rowData.lockedAt ? "mở khóa" : "khóa"} tài khoản người chơi này?`,
						icon: "pi pi-info-circle",
						acceptClassName: "p-button-danger",
						acceptLabel: "Có",
						rejectLabel: "Không",
						accept: rowData.lockedAt ? () => handleUnlockAccount(rowData) : () => handleLockAccount(rowData),
					});
				},
			},
			{
				label: "Xóa tài khoản",
				icon: "pi pi-trash",
				command: (e) => {
					confirmPopup({
						target: e.originalEvent.currentTarget,
						message: "Bạn có chắn chắc muốn xóa?",
						icon: "pi pi-info-circle",
						acceptClassName: "p-button-danger",
						acceptLabel: "Có",
						rejectLabel: "Không",
						accept: () => handleDeleteItem(rowData),
					});
				},
			},
		];

		return (
			<SplitButton label="Tùy chọn" icon="pi pi-th-large" model={actions} severity="info" size="small" outlined />
		);
	};

	return (
		<div>
			{createPortal(<Toast ref={toastRef} />, document.body)}
			<ConfirmPopup />
			<div className="grid mb-3">
				<div className="col-6">
					<h3 className="">DANH SÁCH NGƯỜI CHƠI</h3>
				</div>
				<div className="col-6 text-right">
					<h3 className="text-400 text-sm">{`(${tableData.length} trên tổng ${totalItem})`}</h3>
				</div>
			</div>
			<DataTable
				value={tableData}
				rows={10}
				header={headerTemplate}
				stripedRows
				showGridlines
				scrollable
				selection={selectedItem}
				onSelectionChange={(e) => setSelectedItem(e.value)}
				selectionMode="single"
				dataKey="id"
				removableSort
				sortField={tableParams.orderby}
				sortOrder={tableParams.reverse ? -1 : 1}
				onSort={handleSort}
				emptyMessage="Không có kết quả"
				tableStyle={{ minWidth: "max-content" }}
			>
				<Column field="nickname" header="Tên người chơi" frozen sortable sortFunction={getSortedTableData} />
				<Column field="phoneNumber" header="Số điện thoại" />
				<Column field="email" header="Email" sortable sortFunction={getSortedTableData} />
				<Column
					field="health"
					header="Sức khỏe"
					body={healthDataTemplate}
					sortable
					sortFunction={getSortedTableData}
				/>
				<Column field="star" header="Sao" body={starDataTemplate} sortable sortFunction={getSortedTableData} />
				<Column
					field="diamond"
					header="Kim cương"
					body={diamondDataTemplate}
					sortable
					sortFunction={getSortedTableData}
				/>
				<Column
					field="experience"
					header="Kinh nghiệm"
					body={experienceDataTemplate}
					sortable
					sortFunction={getSortedTableData}
				/>
				<Column field="level" header="Cấp độ" sortable body={levelDataTemplate} sortFunction={getSortedTableData} />
				<Column
					field="status"
					header="Trạng thái"
					body={statusDataTemplate}
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
					body={actionsTemplate}
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
	);
}

export default memo(TableData);

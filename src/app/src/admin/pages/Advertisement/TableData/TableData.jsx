import { useState, useRef, useEffect, useCallback, useImperativeHandle, memo, forwardRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import advertisementTypeApi from "@/apis/advertisementTypeApi";
import advertisementApi from "@/apis/advertisementApi";

import TableHeader from "@/admin/components/TableHeader";
import TableSearch from "@/admin/components/TableSearch";
import TableFilterPopup from "@/admin/components/TableFilterPopup";

// Icons
import HealthIcon from "@/assets/images/HeartIcon.png";
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
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
		title: "Tiêu đề",
		value: "title",
	},
];

//? Component
const TableData = forwardRef(({ onOpenDialog }, ref) => {
	//? Imperative
	useImperativeHandle(
		ref,
		() => ({
			onRefreshPage() {
				handleRefreshPage();
			},
		}),
		[]
	);

	//? Variables
	const fillValue = useRef(null);
	const advertisementTypes = useRef([]);
	const advertisementTypeOptions = useRef([]);

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
		(async () => {
			const getAdvertisementTypeResponse = await advertisementTypeApi.getAll();
			advertisementTypes.current = getAdvertisementTypeResponse.data;
			advertisementTypeOptions.current = advertisementTypes.current.map((i) => i.name);

			const response = await advertisementApi.getAll(tableParams);
			const data = response.data.map((advertisement) => ({
				...advertisement,
				id: +advertisement.id,
				imageId: +advertisement.imageId,
				videoId: +advertisement.videoId,
				duration: +advertisement.duration,
				healthReward: +advertisement.healthReward,
				starReward: +advertisement.starReward,
				diamondReward: +advertisement.diamondReward,
				occurrenceRate: +advertisement.occurrenceRate,
				advertisementTypeId: +advertisement.advertisementTypeId,
			}));

			setTableData(data);
			setTotalItem(response.totalItem);
		})();
	}, [tableParams]);

	//? Functions
	function getSortedTableData(e) {
		return tableData;
	}
	function getFillValue(option) {
		return parseInt(advertisementTypes.current.find((advertisementType) => advertisementType.name === option).id);
	}

	//? Handles
	const handleReload = useCallback(() => {
		setTableParams({ ...initialTableParams });
		tableSearchRef.current?.onReset();
	}, []);
	const handleAddItem = useCallback(() => {
		onOpenDialog("AddItemDialog");
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
			fillType: field === "advertisementTypeName" ? "advertisementTypeId" : field,
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
		advertisementApi.trashById(item.id).then((response) => {
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

	//? Templates
	const headerTemplate = () => {
		return (
			<div className="grid">
				<div className="col-12">
					<TableHeader addItemButtonLabel="Thêm quảng cáo" onReload={handleReload} onAddItem={handleAddItem} />
				</div>
				<div className="col-12">
					<TableSearch ref={tableSearchRef} searchOptions={searchOptions} onSearch={handleSearch} />
				</div>
			</div>
		);
	};
	const durationDataTemplate = (rowData) => {
		return <span>{rowData.duration} s</span>;
	};
	const healthRewardDataTemplate = (rowData) => {
		return (
			<span className="data-template">
				<span className="data-template-value">{rowData.healthReward}</span>
				<img className="data-template-icon" src={HealthIcon} alt="health icon" />
			</span>
		);
	};
	const starRewardDataTemplate = (rowData) => {
		return (
			<span className="data-template">
				<span className="data-template-value">{rowData.starReward}</span>
				<img className="data-template-icon" src={StarIcon} alt="star icon" />
			</span>
		);
	};
	const diamondRewardDataTemplate = (rowData) => {
		return (
			<span className="data-template">
				<span className="data-template-value">{rowData.diamondReward}</span>
				<img className="data-template-icon" src={DiamondIcon} alt="diamond icon" />
			</span>
		);
	};
	const occurrenceRateDataTemplate = (rowData) => {
		return <span>{rowData.occurrenceRate}%</span>;
	};
	const advertisementTypeFilterTemplate = (options) => {
		return (
			<TableFilterPopup
				label="Chọn loại quảng cáo"
				options={advertisementTypeOptions.current}
				isText
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
				label: "Thay đổi",
				icon: "pi pi-file-edit",
				command: () => {
					onOpenDialog("UpdateItemDialog", rowData);
				},
			},
			{
				label: "Xóa quảng cáo",
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
					<h3 className="">DANH SÁCH QUẢNG CÁO</h3>
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
				<Column
					field="title"
					header="Tiêu đề"
					sortable
					sortFunction={getSortedTableData}
					style={{
						maxWidth: "420px",
					}}
					frozen
				/>
				<Column
					field="duration"
					header="Thời gian quảng cáo"
					body={durationDataTemplate}
					sortable
					sortFunction={getSortedTableData}
				/>
				<Column
					field="healthReward"
					header="Thưởng sức khỏe"
					body={healthRewardDataTemplate}
					sortable
					sortFunction={getSortedTableData}
				/>
				<Column
					field="starReward"
					header="Thưởng sao"
					body={starRewardDataTemplate}
					sortable
					sortFunction={getSortedTableData}
				/>
				<Column
					field="diamondReward"
					header="Thưởng kim cương"
					body={diamondRewardDataTemplate}
					sortable
					sortFunction={getSortedTableData}
				/>
				<Column
					field="occurrenceRate"
					header="Tỉ lệ xuất hiện"
					body={occurrenceRateDataTemplate}
					sortable
					sortFunction={getSortedTableData}
				/>
				<Column
					field="advertisementTypeName"
					header="Loại quảng cáo"
					filter
					filterElement={advertisementTypeFilterTemplate}
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
});

TableData.propTypes = {
	onOpenDialog: PropTypes.func,
};

TableData.defaultProps = {
	onOpenDialog: () => {},
};

export default memo(TableData);

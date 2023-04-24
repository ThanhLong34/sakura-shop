import { useState, useRef, useEffect, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import videoFileApi from "@/apis/videoFileApi";
import { getMbFromFileSize } from "@/helpers/converter";

import TableHeader from "@/admin/components/TableHeader";
import TableSearch from "@/admin/components/TableSearch";
import TableFilterPopup from "@/admin/components/TableFilterPopup";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SplitButton } from "primereact/splitbutton";
import { Paginator } from "primereact/paginator";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
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
	target: "all",
};
const rowsPerPageOptions = [10, 20, 30];
const searchOptions = [
	{
		title: "Tên tệp",
		value: "filename",
	},
];
const statuses = ["Đang sử dụng", "Không sử dụng"];

//? Functions
function getSeverity(status) {
	switch (status) {
		case "Đang sử dụng":
			return "success";
		case "Không sử dụng":
			return "danger";
	}
}
function getFillValue(status) {
	switch (status) {
		case "Đang sử dụng":
			return "using";
		case "Không sử dụng":
			return "dont_using";
	}
}

//? Component
const TableData = ({ onOpenDialog }) => {
	//? Variables
	const fillValue = useRef(null);
	const videoFileDontUsingIds = useRef([]);

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
			// Only get video files dont using
			const getVideoFileDontUsingResponse = await videoFileApi.getAll({ target: "dont_using" });
			videoFileDontUsingIds.current = getVideoFileDontUsingResponse.data.map((i) => +i.id);

			// Get all video files
			const response = await videoFileApi.getAll(tableParams);
			const data = response.data.map((videoFile) => ({
				...videoFile,
				id: +videoFile.id,
				size: +videoFile.size,
				status: videoFileDontUsingIds.current.find((id) => id === +videoFile.id) ? "Không sử dụng" : "Đang sử dụng",
			}));

			setTableData(data);
			setTotalItem(response.totalItem);
		})();
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
		if (field === "status") {
			setTableParams((prevState) => ({
				...prevState,
				target: getFillValue(fillValue.current),
			}));
		} else {
			setTableParams((prevState) => ({
				...prevState,
				fillType: field,
				fillValue: getFillValue(fillValue.current),
			}));
		}
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
	const handleRefreshPage = () => {
		setTableParams((prevState) => ({ ...prevState }));
	};
	const handleDeleteVideoFilesDontUsing = (e) => {
		confirmPopup({
			target: e.currentTarget,
			message: "Bạn có chắn chắc muốn xóa?",
			icon: "pi pi-info-circle",
			acceptClassName: "p-button-danger",
			acceptLabel: "Có",
			rejectLabel: "Không",
			accept: () => {
				videoFileDontUsingIds.current.forEach(async (id, idx, array) => {
					await videoFileApi.deleteById(id);

					if (idx >= array.length - 1) {
						toastRef.current.show({
							severity: "success",
							summary: "Thành công",
							detail: "Xóa thành công",
							life: 3000,
						});
						handleRefreshPage();
					}
				});
			},
		});
	};

	//? Templates
	const headerTemplate = () => {
		return (
			<div className="grid">
				<div className="col-12">
					<TableHeader
						showAddItemButton={false}
						showCustomizeButton={videoFileDontUsingIds.current.length > 0}
						customizeButtonLabel="Xóa các video không sử dụng"
						customizeButtonSeverity="warning"
						customizeButtonIcon="pi pi-trash"
						onReload={handleReload}
						onCustomizeButtonClick={handleDeleteVideoFilesDontUsing}
					/>
				</div>
				<div className="col-12">
					<TableSearch ref={tableSearchRef} searchOptions={searchOptions} onSearch={handleSearch} />
				</div>
			</div>
		);
	};
	const sizeDataTemplate = (rowData) => {
		return <span>{getMbFromFileSize(rowData.size)} MB</span>;
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
				label: "Xem video",
				icon: "pi pi-eye",
				command: () => {
					onOpenDialog("PreviewVideoDialog", rowData.link);
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
					<h3 className="">DANH SÁCH TỆP VIDEO LƯU TRÊN MÁY CHỦ</h3>
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
				<Column field="filename" header="Tên tệp" sortable sortFunction={getSortedTableData} />
				<Column
					field="size"
					header="Kích thước tệp"
					body={sizeDataTemplate}
					sortable
					sortFunction={getSortedTableData}
				/>
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
};

TableData.propTypes = {
	onOpenDialog: PropTypes.func,
};

TableData.defaultProps = {
	onOpenDialog: () => {},
};

export default memo(TableData);

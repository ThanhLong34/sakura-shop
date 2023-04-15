import { useState, useRef, useEffect, useCallback, useImperativeHandle, memo, forwardRef } from "react";
import PropTypes from "prop-types";

import advertisementTypeApi from "@/apis/advertisementTypeApi";
import advertisementApi from "@/apis/advertisementApi";

import TableHeader from "@/admin/components/TableHeader";
import TableSearch from "@/admin/components/TableSearch";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
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
		title: "Tên loại quảng cáo",
		value: "name",
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
		advertisementTypeApi.getAll(tableParams).then((response) => {
			const data = response.data.map((advertisementType) => ({
				...advertisementType,
				id: +advertisementType.id,
				quantityAdvertisement: +advertisementType.quantityAdvertisement,
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
	const handleChangePage = (e) => {
		setTableParams((prevState) => ({
			...prevState,
			limit: e.rows,
			offset: e.first,
		}));
	};
	const handleDeleteItem = (item) => {
		(async () => {
			const response = await advertisementTypeApi.trashById(item.id);
			if (response.code === 1) {
				// Trash advertisements of the advertisementType
				const trashAdvertisementsByAdvertisementTypeId = await advertisementApi.trashByAdvertisementTypeId(item.id);
				if (trashAdvertisementsByAdvertisementTypeId.code === 1) {
					toastRef.current.show({
						severity: "success",
						summary: "Thành công",
						detail: "Xóa thành công",
						life: 3000,
					});
					handleRefreshPage();
				} else {
					toastRef.current.show({ severity: "error", summary: "Lỗi", detail: response.message, life: 3000 });
				}
			} else {
				toastRef.current.show({ severity: "error", summary: "Lỗi", detail: response.message, life: 3000 });
			}
		})();
	};
	const handleRefreshPage = () => {
		setTableParams((prevState) => ({ ...prevState }));
	};

	//? Templates
	const headerTemplate = () => {
		return (
			<div className="grid">
				<div className="col-12">
					<TableHeader addItemButtonLabel="Thêm loại quảng cáo" onReload={handleReload} onAddItem={handleAddItem} />
				</div>
				<div className="col-12">
					<TableSearch ref={tableSearchRef} searchOptions={searchOptions} onSearch={handleSearch} />
				</div>
			</div>
		);
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
				label: "Xóa loại QC",
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
			<Toast ref={toastRef} />
			<ConfirmPopup />
			<div className="grid mb-3">
				<div className="col-6">
					<h3 className="">DANH SÁCH LOẠI QUẢNG CÁO</h3>
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
				<Column field="name" header="Tên loại quảng cáo" sortable sortFunction={getSortedTableData} frozen />
				<Column field="quantityAdvertisement" header="Số lượng quảng cáo" />
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

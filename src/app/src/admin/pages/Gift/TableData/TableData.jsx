import { useState, useRef, useEffect, useCallback, useImperativeHandle, memo, forwardRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import giftApi from "@/apis/giftApi";

import TableHeader from "@/admin/components/TableHeader";
import TableSearch from "@/admin/components/TableSearch";
import TableFilterPopup from "@/admin/components/TableFilterPopup";

// Icons
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Paginator } from "primereact/paginator";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { Tag } from "primereact/tag";

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
		title: "Tên phần thưởng",
		value: "name",
	},
	{
		title: "Thương hiệu",
		value: "brand",
	},
];
const allowToReceiveOnlineOptions = ["Có", "Không"];
const isSpecialOptions = ["Có", "Không"];
const isShowOptions = ["Hiển thị", "Ẩn"];

//? Functions
function getIsShowSeverity(option) {
	switch (option) {
		case "Hiển thị":
			return "success";
		case "Ẩn":
			return "danger";
	}
}
function getFillValue(option) {
	switch (option) {
		// allowToReceiveOnlineOptions & isSpecialOptions
		case "Có":
			return 1;
		case "Không":
			return 0;
		// isShowOptions
		case "Hiển thị":
			return 1;
		case "Ẩn":
			return 0;
	}
}

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
			const response = await giftApi.getAll(tableParams);
			const data = response.data.map((gift) => ({
				...gift,
				id: +gift.id,
				imageId: +gift.imageId,
				starCost: +gift.starCost,
				diamondCost: +gift.diamondCost,
				isPurchaseRequired: +gift.isPurchaseRequired === 1,
				isSpecial: +gift.isSpecial === 1,
				isShow: +gift.isShow === 1,
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
	const handleChangeFilter = useCallback((value) => {
		fillValue.current = value;
	}, []);
	const handleApplyFilter = ({ field }) => {
		setTableParams((prevState) => ({
			...prevState,
			fillType: field,
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
		giftApi.trashById(item.id).then((response) => {
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
					<TableHeader addItemButtonLabel="Thêm phần thưởng" onReload={handleReload} onAddItem={handleAddItem} />
				</div>
				<div className="col-12">
					<TableSearch ref={tableSearchRef} searchOptions={searchOptions} onSearch={handleSearch} />
				</div>
			</div>
		);
	};
	const imageDataTemplate = (rowData) => {
		return (
			<div className="w-5rem">
				<img src={rowData.imageUrl} alt="image url" />
			</div>
		);
	};
	const starCostDataTemplate = (rowData) => {
		return (
			<span className="data-template">
				<span className="data-template-value">{rowData.starCost}</span>
				<img className="data-template-icon" src={StarIcon} alt="star icon" />
			</span>
		);
	};
	const diamondCostDataTemplate = (rowData) => {
		return (
			<span className="data-template">
				<span className="data-template-value">{rowData.diamondCost}</span>
				<img className="data-template-icon" src={DiamondIcon} alt="diamond icon" />
			</span>
		);
	};
	const allowToReceiveOnlineDataTemplate = (rowData) => {
		return <span>{rowData.isPurchaseRequired ? "Có" : "Không"}</span>;
	};
	const isSpecialDataTemplate = (rowData) => {
		return <span>{rowData.isSpecial ? "Có" : "Không"}</span>;
	};
	const isShowDataTemplate = (rowData) => {
		return (
			<Tag
				value={rowData.isShow ? "Hiển thị" : "Ẩn"}
				severity={getIsShowSeverity(rowData.isShow ? "Hiển thị" : "Ẩn")}
			/>
		);
	};
	const allowToReceiveOnlineFilterTemplate = (options) => {
		return (
			<TableFilterPopup
				label="Chọn trạng thái"
				options={allowToReceiveOnlineOptions}
				isText
				onChange={handleChangeFilter}
			/>
		);
	};
	const isSpecialFilterTemplate = (options) => {
		return (
			<TableFilterPopup label="Chọn trạng thái" options={isSpecialOptions} isText onChange={handleChangeFilter} />
		);
	};
	const isShowFilterTemplate = (options) => {
		return (
			<TableFilterPopup
				label="Chọn trạng thái"
				options={isShowOptions}
				getSeverity={getIsShowSeverity}
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
				label: "Xóa phần thưởng",
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
					<h3 className="">DANH SÁCH PHẦN THƯỞNG</h3>
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
				<Column field="imageUrl" header="Hình ảnh" body={imageDataTemplate} frozen />
				<Column
					field="name"
					header="Tên phần thưởng"
					sortable
					sortFunction={getSortedTableData}
					frozen
					style={{
						maxWidth: "420px",
					}}
				/>
				<Column field="brand" header="Thương hiệu" sortable sortFunction={getSortedTableData} />
				<Column
					field="starCost"
					header="Chi phí sao"
					body={starCostDataTemplate}
					sortable
					sortFunction={getSortedTableData}
				/>
				<Column
					field="diamondCost"
					header="Chi phí kim cương"
					body={diamondCostDataTemplate}
					sortable
					sortFunction={getSortedTableData}
				/>
				<Column
					field="isPurchaseRequired"
					header="Yêu cầu mua hàng"
					body={allowToReceiveOnlineDataTemplate}
					filter
					filterElement={allowToReceiveOnlineFilterTemplate}
					filterApply={filterApplyButtonTemplate}
					filterClear={filterClearButtonTemplate}
					showFilterMatchModes={false}
					showFilterOperator={false}
					showFilterMenuOptions={false}
					filterMatchMode="equals"
				/>
				<Column
					field="isSpecial"
					header="Đặc biệt"
					body={isSpecialDataTemplate}
					filter
					filterElement={isSpecialFilterTemplate}
					filterApply={filterApplyButtonTemplate}
					filterClear={filterClearButtonTemplate}
					showFilterMatchModes={false}
					showFilterOperator={false}
					showFilterMenuOptions={false}
					filterMatchMode="equals"
				/>
				<Column
					field="isShow"
					header="Hiển thị"
					body={isShowDataTemplate}
					filter
					filterElement={isShowFilterTemplate}
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

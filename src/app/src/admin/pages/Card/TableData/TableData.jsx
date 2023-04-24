import { useState, useRef, useEffect, useCallback, useImperativeHandle, memo, forwardRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import topicApi from "@/apis/topicApi";
import cardApi from "@/apis/cardApi";

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
	{
		title: "Thương hiệu",
		value: "brand",
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
	const topics = useRef([]);
	const topicOptions = useRef([]);

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
			const getTopicResponse = await topicApi.getAll();
			topics.current = getTopicResponse.data;
			topicOptions.current = topics.current.map((i) => i.name);

			const response = await cardApi.getAll(tableParams);
			const data = response.data.map((card) => ({
				...card,
				id: +card.id,
				imageId: +card.imageId,
				healthReward: +card.healthReward,
				starReward: +card.starReward,
				diamondReward: +card.diamondReward,
				occurrenceRate: +card.occurrenceRate,
				topicId: +card.topicId,
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
		return parseInt(topics.current.find((topic) => topic.name === option).id);
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
			fillType: field === "topicName" ? "topicId" : field,
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
		cardApi.trashById(item.id).then((response) => {
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
					<TableHeader addItemButtonLabel="Thêm thẻ bài" onReload={handleReload} onAddItem={handleAddItem} />
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
	const topicFilterTemplate = (options) => {
		return (
			<TableFilterPopup label="Chọn chủ đề" options={topicOptions.current} isText onChange={handleChangeFilter} />
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
				label: "Xóa thẻ bài",
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
					<h3 className="">DANH SÁCH THẺ BÀI</h3>
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
					field="title"
					header="Tiêu đề"
					sortable
					sortFunction={getSortedTableData}
					frozen
					style={{
						maxWidth: "420px",
					}}
				/>
				<Column field="brand" header="Thương hiệu" sortable sortFunction={getSortedTableData} />
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
					field="topicName"
					header="Chủ đề"
					filter
					filterElement={topicFilterTemplate}
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

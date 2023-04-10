import { useState, useRef, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";

import levelApi from "@/apis/levelApi";

import TableHeader from "@/admin/components/TableHeader";
import TableSearch from "@/admin/components/TableSearch";

// Icons
import HealthIcon from "@/assets/images/heart.png";
import StarIcon from "@/assets/images/star.png";
import DiamondIcon from "@/assets/images/diamond.png";
import ExperienceIcon from "@/assets/images/experience.png";
import LevelIcon from "@/assets/images/level.png";

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
		title: "Cấp độ",
		value: "levelNumber",
	},
];

TableData.propTypes = {
	onAddItem: PropTypes.func,
	onUpdateItem: PropTypes.func,
};

TableData.defaultProps = {
	onAddItem: () => {},
	onUpdateItem: () => {},
};

//? Component
function TableData({ onAddItem, onUpdateItem }) {
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
		levelApi.getAll(tableParams).then((response) => {
			const data = response.data.map((level) => ({
				...level,
				id: +level.id,
				levelNumber: +level.levelNumber,
				experienceRequired: +level.experienceRequired,
				healthReward: +level.healthReward,
				starReward: +level.starReward,
				diamondReward: +level.diamondReward,
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
		// ...
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
		levelApi.trashById(item.id).then((response) => {
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
					<TableHeader addItemButtonLabel="Thêm cấp độ" onReload={handleReload} onAddItem={handleAddItem} />
				</div>
				<div className="col-12">
					<TableSearch ref={tableSearchRef} searchOptions={searchOptions} onSearch={handleSearch} />
				</div>
			</div>
		);
	};
	const levelNumberDataTemplate = (rowData) => {
		return (
			<span className="data-template">
				<span className="data-template-value">{rowData.levelNumber}</span>
				<img className="data-template-icon" src={LevelIcon} alt="level icon" />
			</span>
		);
	};
	const experienceRequiredDataTemplate = (rowData) => {
		return (
			<span className="data-template">
				<span className="data-template-value">{rowData.experienceRequired}</span>
				<img className="data-template-icon" src={ExperienceIcon} alt="experience icon" />
			</span>
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
	const actionsTemplate = (rowData) => {
		const actions = [
			{
				label: "Thay đổi",
				icon: "pi pi-eye",
				command: () => {
					onUpdateItem(rowData);
				},
			},
			{
				label: "Xóa cấp độ",
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
					<h3 className="">DANH SÁCH CẤP ĐỘ</h3>
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
					field="levelNumber"
					header="Cấp độ"
					body={levelNumberDataTemplate}
					sortable
					sortFunction={getSortedTableData}
					frozen
				/>
				<Column
					field="experienceRequired"
					header="Yêu cầu kinh nghiệm"
					body={experienceRequiredDataTemplate}
					sortable
					sortFunction={getSortedTableData}
				/>
				<Column
					field="healthReward"
					header="Sức khỏe"
					body={healthRewardDataTemplate}
					sortable
					sortFunction={getSortedTableData}
				/>
				<Column
					field="starReward"
					header="Sao"
					body={starRewardDataTemplate}
					sortable
					sortFunction={getSortedTableData}
				/>
				<Column
					field="diamondReward"
					header="Kim cương"
					body={diamondRewardDataTemplate}
					sortable
					sortFunction={getSortedTableData}
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

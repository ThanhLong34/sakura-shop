import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import rewardApi from "@/apis/rewardApi";

// Icons
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";

import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";

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

ViewRewardHistoryDialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	playerAccount: PropTypes.object,
};

ViewRewardHistoryDialog.defaultProps = {
	playerAccount: {},
};

function ViewRewardHistoryDialog({ visible, setVisible, playerAccount }) {
	//? States
	const [totalItem, setTotalItem] = useState(0);
	const [tableData, setTableData] = useState([]);
	const [tableParams, setTableParams] = useState(initialTableParams);
	const [selectedItem, setSelectedItem] = useState(null);

	//? Effects
	// Get table data
	useEffect(() => {
		handleGetTableData();
	}, [tableParams]);

	//? Functions
	function getSortedTableData(e) {
		return tableData;
	}

	//? Handles
	const handleSort = ({ sortField, sortOrder }) => {
		setTableParams((prevState) => ({
			...prevState,
			orderby: sortField,
			reverse: sortOrder === -1,
		}));
	};
	const handleGetTableData = () => {
		if (playerAccount) {
			(async () => {
				const response = await rewardApi.getAllByPlayerId(tableParams, playerAccount.id);
				const data = response.data.map((reward) => ({
					...reward,
					id: +reward.id,
					giftId: +reward.giftId,
					playerId: +reward.playerId,
					starCost: +reward.starCost,
					diamondCost: +reward.diamondCost,
				}));

				setTableData(data);
				setTotalItem(response.totalItem);
			})();
		}
	};
	const handleBeforeShowDialog = () => {
		handleGetTableData();
	};
	const handleChangePage = (e) => {
		setTableParams((prevState) => ({
			...prevState,
			limit: e.rows,
			offset: e.first,
		}));
	};

	//? Templates
	const imageDataTemplate = (rowData) => {
		return (
			<div className="w-5rem">
				<img src={rowData.giftImageUrl} alt="image url" />
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

	return (
		<Dialog
			header="LỊCH SỬ ĐỔI THƯỞNG CỦA NGƯỜI CHƠI"
			visible={visible}
			style={{ width: "1000px" }}
			onHide={() => setVisible(false)}
			onShow={handleBeforeShowDialog}
		>
			<div className="grid mb-3">
				<div className="col-6">
					<h3 className="">DANH SÁCH ĐỔI THƯỞNG</h3>
				</div>
				<div className="col-6 text-right">
					<h3 className="text-400 text-sm">{`(${tableData.length} trên tổng ${totalItem})`}</h3>
				</div>
			</div>
			<DataTable
				value={tableData}
				rows={10}
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
				<Column field="giftImageUrl" header="Hình ảnh phần thưởng" body={imageDataTemplate} frozen />
				<Column
					field="giftName"
					header="Tên phần thưởng"
					frozen
					style={{
						maxWidth: "420px",
					}}
				/>
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
			</DataTable>
			<Paginator
				className="mt-4"
				first={tableParams.offset}
				rows={tableParams.limit}
				totalRecords={totalItem}
				rowsPerPageOptions={rowsPerPageOptions}
				onPageChange={handleChangePage}
			/>
		</Dialog>
	);
}

export default ViewRewardHistoryDialog;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./RewardHistory.module.scss";

import rewardApi from "@/apis/rewardApi";

// Icons
import StarIcon from "@/assets/images/StarIcon.png";
import DiamondIcon from "@/assets/images/DiamondIcon.png";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";

const cx = classNames.bind(styles);

//? Variables
const initialTableParams = {
	limit: 5,
	offset: 0,
	searchType: null,
	searchValue: null,
	fillType: null,
	fillValue: null,
	orderby: null,
	reverse: null,
};
const rowsPerPageOptions = [5, 10, 15];

function RewardHistory() {
	const playerAccount = useSelector((state) => state.player.account);

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
				const response = await rewardApi.getAllByPlayerId(tableParams, +playerAccount.id);
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
		<div className={cx("wrapper")}>
			<div className="card">
				<h3 className={cx("heading")}>LỊCH SỬ ĐỔI THƯỞNG</h3>
				<h3 className={cx('total-text', 'mb-3')}>{`(${tableData.length} trên tổng ${totalItem})`}</h3>
				<DataTable
					value={tableData}
					rows={5}
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
						field="giftImageUrl"
						header="Hình ảnh phần thưởng"
						body={imageDataTemplate}
						style={{
							fontSize: "0.6rem",
						}}
					/>
					<Column
						field="giftName"
						header="Tên phần thưởng"
						style={{
							maxWidth: "150px",
							fontSize: "0.6rem",
						}}
					/>
					<Column
						field="starCost"
						header="Chi phí sao"
						body={starCostDataTemplate}
						sortable
						sortFunction={getSortedTableData}
						style={{
							fontSize: "0.6rem",
						}}
					/>
					<Column
						field="diamondCost"
						header="Chi phí kim cương"
						body={diamondCostDataTemplate}
						sortable
						sortFunction={getSortedTableData}
						style={{
							fontSize: "0.6rem",
						}}
					/>
					<Column
						field="createdAt"
						header="Thời gian nhận"
						style={{
							fontSize: "0.6rem",
						}}
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
				<p className={cx('text-center')}>Số phần thưởng trên mỗi trang</p>
			</div>
		</div>
	);
}

export default RewardHistory;

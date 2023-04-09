import PropTypes from "prop-types";

import { Button } from "primereact/button";

TableSearch.propTypes = {
	addItemButtonLabel: PropTypes.string,
	showAddItemButton: PropTypes.bool,
	onReload: PropTypes.func,
	onAddItem: PropTypes.func,
};

TableSearch.defaultProps = {
	addItemButtonLabel: "Thêm",
	showAddItemButton: true,
	onReload: () => {},
	onAddItem: () => {},
};

function TableSearch({ addItemButtonLabel, showAddItemButton, onReload, onAddItem }) {
	return (
		<div className="grid">
			<div className="col-6 md:col-8">
				<Button label="Tải lại danh sách" icon="pi pi-refresh" onClick={onReload} severity="info" outlined />
			</div>
			<div className="col-6 md:col-4 text-right">
				{showAddItemButton && <Button label={addItemButtonLabel} icon="pi pi-plus" severity="info" onClick={onAddItem} />}
			</div>
		</div>
	);
}

export default TableSearch;

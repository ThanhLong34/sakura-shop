import { memo } from "react";
import PropTypes from "prop-types";

import { Button } from "primereact/button";

TableHeader.propTypes = {
	addItemButtonLabel: PropTypes.string,
	showAddItemButton: PropTypes.bool,
	onReload: PropTypes.func,
	onAddItem: PropTypes.func,
};

TableHeader.defaultProps = {
	addItemButtonLabel: "Thêm",
	showAddItemButton: true,
	onReload: () => {},
	onAddItem: () => {},
};

function TableHeader({ addItemButtonLabel, showAddItemButton, onReload, onAddItem }) {
	return (
		<div className="grid">
			<div className="col-6 md:col-8">
				<Button label="Tải lại danh sách" icon="pi pi-refresh" onClick={onReload} severity="info" outlined />
			</div>
			<div className="col-6 md:col-4 text-right">
				{showAddItemButton && (
					<Button label={addItemButtonLabel} icon="pi pi-plus" severity="info" onClick={onAddItem} />
				)}
			</div>
		</div>
	);
}

export default memo(TableHeader);

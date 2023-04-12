import { memo } from "react";
import PropTypes from "prop-types";

import { Button } from "primereact/button";

TableHeader.propTypes = {
	addItemButtonLabel: PropTypes.string,
	customizeButtonLabel: PropTypes.string,
	showAddItemButton: PropTypes.bool,
	showCustomizeButton: PropTypes.bool,
	customizeButtonIcon: PropTypes.string,
	customizeButtonSeverity: PropTypes.string,
	onReload: PropTypes.func,
	onAddItem: PropTypes.func,
	onCustomizeButtonClick: PropTypes.func,
};

TableHeader.defaultProps = {
	addItemButtonLabel: "Thêm",
	customizeButtonLabel: "Nút tùy chỉnh",
	showAddItemButton: true,
	showCustomizeButton: false,
	customizeButtonIcon: "pi-cog",
	customizeButtonSeverity: "info",
	onReload: () => {},
	onAddItem: () => {},
	onCustomizeButtonClick: () => {},
};

function TableHeader({
	addItemButtonLabel,
	customizeButtonLabel,
	showAddItemButton,
	showCustomizeButton,
	customizeButtonIcon,
	customizeButtonSeverity,
	onReload,
	onAddItem,
	onCustomizeButtonClick,
}) {
	return (
		<div className="grid">
			<div className="col-6 md:col-8">
				<Button label="Tải lại danh sách" icon="pi pi-refresh" onClick={onReload} severity="info" outlined />
			</div>
			<div className="col-6 md:col-4 text-right">
				{showAddItemButton && (
					<Button label={addItemButtonLabel} icon="pi pi-plus" severity="info" onClick={onAddItem} />
				)}
				{showCustomizeButton && (
					<Button
						label={customizeButtonLabel}
						icon={customizeButtonIcon}
						severity={customizeButtonSeverity}
						onClick={onCustomizeButtonClick}
					/>
				)}
			</div>
		</div>
	);
}

export default memo(TableHeader);

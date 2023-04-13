import { useState, memo } from "react";
import PropTypes from "prop-types";

import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";

TableFilterPopup.propTypes = {
	label: PropTypes.string,
	options: PropTypes.array,
	getSeverity: PropTypes.func,
	isText: PropTypes.bool,
	onChange: PropTypes.func,
};

TableFilterPopup.defaultProps = {
	label: "Chọn",
	options: [],
	isText: false,
	getSeverity: () => {},
	onChange: () => {},
};

function TableFilterPopup({ label, options, getSeverity, isText, onChange }) {
	const [value, setValue] = useState(null);

	const selectItemTemplate = (option) => {
		if (isText) {
			return <span>{option}</span>;
		} else {
			return <Tag value={option} severity={getSeverity(option)} />;
		}
	};

	function handleChange(e) {
		setValue(e.value);
		onChange(e.value);
	}

	return (
		<Dropdown
			value={value}
			options={options}
			onChange={handleChange}
			itemTemplate={selectItemTemplate}
			placeholder={label}
			className="p-column-filter"
			showClear
			emptyMessage="Không có dữ liệu"
		/>
	);
}

export default memo(TableFilterPopup);

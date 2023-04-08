import { useState } from "react";
import PropTypes from 'prop-types';

import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";

FilterPopup.propTypes = {
	label: PropTypes.string,
	options: PropTypes.array,
	getSeverity: PropTypes.func,
	onChange: PropTypes.func,
}

FilterPopup.defaultProps = {
	label: "Chọn",
	options: [],
	getSeverity: () => {},
	onChange: () => {},
}

function FilterPopup({ label, options, getSeverity, onChange }) {
	const [value, setValue] = useState(null);

	const statusItemTemplate = (option) => {
		return <Tag value={option} severity={getSeverity(option)} />;
	};

	function handleChange(e) {
		setValue(e.value)
		onChange(e.value);
	}

	return (
		<Dropdown
			value={value}
			options={options}
			onChange={handleChange}
			itemTemplate={statusItemTemplate}
			placeholder={label}
			className="p-column-filter"
			showClear
		/>
	);
}

export default FilterPopup;

import { useRef, useState, memo } from "react";
import PropTypes from "prop-types";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

TableSearch.propTypes = {
	searchPlaceholder: PropTypes.string,
	searchOptions: PropTypes.array,
	onSearch: PropTypes.func,
};

TableSearch.defaultProps = {
	searchPlaceholder: "Nhập thông tin cần tìm",
	searchOptions: [],
	onSearch: () => {},
};

function TableSearch({ searchPlaceholder, searchOptions, onSearch }) {
	const searchRef = useRef(null);
	const [searchType, setSearchType] = useState(null);

	function handleSearch() {
		const searchValue = searchRef.current?.value;

		const searchData = {
			searchValue,
			searchType,
		};

		onSearch(searchData);
	}

	return (
		<div className="grid">
			<div className="col-12 md:col-8">
				<span className="p-input-icon-left w-full">
					<i className="pi pi-search" />
					<InputText ref={searchRef} className="w-full" type="search" placeholder={searchPlaceholder} />
				</span>
			</div>
			<div className="col-12 md:col-4">
				<Dropdown
					value={searchType}
					onChange={(e) => setSearchType(e.value)}
					options={searchOptions}
					optionLabel="title"
					optionValue="value"
					placeholder="Chọn kiểu tìm kiếm"
					className="w-full"
					defaultValue={searchOptions[0]?.value ?? "undefined"}
				/>
			</div>
		</div>
	);
}

export default memo(TableSearch);

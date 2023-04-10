import { useRef, useState, memo, forwardRef, useImperativeHandle, useEffect } from "react";
import PropTypes from "prop-types";
import useDebounce from "@/hooks/useDebounce";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const TableSearch = forwardRef(({ searchPlaceholder, searchOptions, onSearch }, ref) => {
	useImperativeHandle(ref, () => {
		return {
			onReset() {
				reset();
			},
		};
	}, []);

	const [searchValue, setSearchValue] = useState("");
	const searchValueDebounce = useDebounce(searchValue, 800);
	const [searchType, setSearchType] = useState(null);

	useEffect(() => {
		onSearch({
			searchValue: searchValueDebounce,
			searchType,
		});
	}, [searchValueDebounce]);

	function handleChangeSearchValue(e) {
		setSearchValue(e.target.value);
	}

	function reset() {
		setSearchValue("");
		setSearchType(null);
	}

	return (
		<div className="grid">
			<div className="col-12 md:col-8">
				<span className="p-input-icon-left w-full">
					<i className="pi pi-search" />
					<InputText
						className="w-full"
						type="search"
						placeholder={searchPlaceholder}
						value={searchValue}
						onChange={handleChangeSearchValue}
					/>
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
});

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

export default memo(TableSearch);

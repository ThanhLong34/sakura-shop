import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "@/store/userSlice";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import UserList from "@/components/UserList";

const cx = classNames.bind(styles);

function Home() {
	// Get user list from store
	const userList = useSelector((state) => state.user.list);
	// Dispatch	
	const dispatch = useDispatch();

	// States
	const [user, setUser] = useState("");

	// Refs
	const userInputRef = useRef(null);

	// Handles
	const handleChangeUser = (e) => {
		setUser(e.target.value);
	};
	const handleAddUser = () => {
		const action = addUser(user);
		dispatch(action);

		// Reset input
		setUser("");

		// Auto focus input
		userInputRef.current.focus();
	};

	return (
		<div className={cx("home")}>
			<h1 className="page-title">Welcome</h1>

			{/* User List */}
			<div className="card mb-2">
				<h2>User List</h2>
				<UserList userList={userList} />
			</div>

			{/* Add user card */}
			<div className="card">
				<label
					className="label"
					htmlFor="userInput"
				>
					User:
				</label>
				<input
					ref={userInputRef}
					id="userInput"
					className="input"
					type="text"
					value={user}
					onChange={handleChangeUser}
				/>
				<button
					className="button"
					onClick={handleAddUser}
				>
					Add user
				</button>
			</div>
		</div>
	);
}

export default Home;

import PropTypes from "prop-types";
import styles from "./UserList.module.scss";

UserList.propTypes = {
	userList: PropTypes.array,
};

UserList.defaultProps = {
	userList: [],
};

function UserList({ userList }) {
	return (
		<ul className={styles.list}>
			{userList &&
				userList.map((user, idx) => (
					<li
						className={styles.item}
						key={idx}
					>
						{idx + 1}.{user}
					</li>
				))}
		</ul>
	);
}

export default UserList;

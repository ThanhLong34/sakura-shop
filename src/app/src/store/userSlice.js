import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
	name: "user",
	initialState: {
		list: [],
	},
	reducers: {
		addUser: (state, action) => {
			// Không cần clone data ở đây
			// Redux Toolkit có sử dụng ImmerJS nên nó đã tự động clone ở dưới Core
			// Ta không cần làm việc đó nữa, mà có thể thay đổi trực tiếp data

			// const newList = [...state.list]; // or state.list.slice()
			// newList.push(action.payload);
			state.list.push(action.payload);

			// Không cần return data
		},
		deleteUser: (state, action) => {
			// ...
		}
		
		// other actions ...
	},
});

const { reducer, actions } = user;
export const { addUser, deleteUser } = actions;
export default reducer;

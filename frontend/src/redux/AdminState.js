import { createSlice } from '@reduxjs/toolkit';

const AdminState = createSlice({
  name: 'adminState',
  initialState: {
    adminCode: null,           
    adminName: null,           
    adminEmail: null,           
    adminRole: '1',           
    loginState: false,           
  },
  reducers: {
<<<<<<< HEAD
    // 관리자 권한 설정
=======
>>>>>>> 951208bf89423d692882ff5d76df2ef9039ac76e
    setAdminState: (state, action) => {
      state.adminCode = action.payload.adminCode;
      state.adminName = action.payload.adminName;
      state.adminEmail = action.payload.adminEmail;
      state.adminRole = action.payload.adminRole;
      state.loginState = action.payload.loginState;
    },
  },
});

<<<<<<< HEAD
// 액션과 리듀서를 export
=======
>>>>>>> 951208bf89423d692882ff5d76df2ef9039ac76e
export const { setAdminState } = AdminState.actions;
export default AdminState.reducer;

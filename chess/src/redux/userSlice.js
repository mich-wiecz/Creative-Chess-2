import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';





const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
  };


 export const loginOrSignup = createAsyncThunk(
      'user/loginOrSignup',
      async ({type, userData}) => {
        const response = await axios
        .post(`/${type}`, userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            // return userData.email;
        })
        .then(email => {
            console.log(1234)
            axios
            .get(`/user/`, {email})
            .then(res => {
                return res;
            })
        }) 
        
        return response;
      }
  );


//   export const getUserData = createAsyncThunk(
//       'user/getUserData',
//       async () => {
//           const data = axios
//           .get('/user')
//           .then(res => res.data);

//           return data;
//       }
//   )


  const initialState = {
      status: {
        authenticated: false,
        loading: false,
        wasError: false,
      },
    userInfo: {}
};




const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userAuthenticated(state) {
            state.status.authenticated = true;
        },
        userUnauthenticated() {
            return initialState;
        },
        logout: {
            reducer(state) {
                 
                state.status.authenticated = false;
            },
            prepare() {
                localStorage.removeItem('FBIdToken');
                delete axios.defaults.headers.common['Authentication'];
                return {}
            }
        }
       
    },
    extraReducers: builder => {
        builder
        .addCase(loginOrSignup.pending, (state) => {
            state.status.loading = true;
        })
        .addCase(loginOrSignup.rejected, state => {
            state.status.wasError = true;
            state.status.loading = false;
        })
        .addCase(loginOrSignup.fulfilled, (state, action) => {
            console.log(action)
            state.status.authenticated = true;
            state.status.loading = false;
            state.status.wasError = false;
            if(action.meta.arg.type === 'signup') {
                const {userData: {signup: {handle, email}, details}} = action.meta.arg;
                state.userInfo = {
                    handle,
                    email,
                    ...details
                }
            }
           
        })
        // .addCase(getUserData.fulfilled, (state, action) => {
        //     state.status.authenticated = true;
        //     Object.assign(state.userInfo, action.payload);
        // })
    }
});



export const {userAuthenticated, userUnauthenticated, logout} = usersSlice.actions;


export const selectAuthenticated = state => state.user.status.authenticated;
export const selectStatusData = state =>  state.user.status;
export const selectUserInfo = state => state.user.userInfo;




export default usersSlice.reducer;
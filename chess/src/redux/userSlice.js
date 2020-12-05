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
        })
        .then(email => {
            axios
            .get(`/user/`, {email})
            .then(res => {
                return res;
            })
        }) 
        
        return response;
      }
  );



  const initialState = {
      status: {
        authenticated: false,
        loading: false,
        wasError: false,
      },
    userInfo: {},
    language: 'en',
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
        },
        languageChanged(state, action) {
          if (action.payload) {
              state.language = action.payload
          } else {
              state.language = state.language === 'pl' ? 'en' : 'pl';
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



export const {userAuthenticated, userUnauthenticated, logout, languageChanged} = usersSlice.actions;


export const selectAuthenticated = state => state.user.status.authenticated;
export const selectStatusData = state =>  state.user.status;
export const selectUserInfo = state => state.user.userInfo;
export const selectLanguage = state => state.user.language;



export default usersSlice.reducer;
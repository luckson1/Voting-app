import { createAsyncThunk, createSlice, createAction} from "@reduxjs/toolkit"
import axios from 'axios'
import { BaseURL } from "../../../utils/BaseUrl";

//action for redirection
// export const resetProfileUpdated = createAction("contestant/updated/reset")
//register action creation

export const registerContestantAction = createAsyncThunk('contestant/register', async (payload, { rejectWithValue, getState, dispatch }) => {
    
    // configuring the request
    const config = {
       
        headers: {
            "Content-Type": "multipart/form-data",
          },
    };

    try {
        //http call
        const { data } = await axios.post(
            `${BaseURL}/contestants/register`,
            payload,
            config);
        return data;

    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }


});
// action to get all contestants into our state


export const fetchContestantsAction = createAsyncThunk(
    "contestants/fetch",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //get user token from store
        const userToken = getState()?.users?.userAuth?.token;
console.log(userToken)
const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
    },

        };


        try {
            //make http call here

            const { data } = await axios.get(`${BaseURL}/contestants`, config);
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });
// approve contesntant
    export const approveContestantAction = createAsyncThunk('contestant/approve', async (payload, { rejectWithValue, getState, dispatch }) => {
        //get user token from store
    
        const userToken = getState()?.users?.userAuth?.token;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
    
        };
    
        console.log(payload)
        try {
            //make http call here
    
            const { data } = await axios.put(`${BaseURL}/contestants/approve/${payload?._id}`, payload, config);
            console.log(payload?._id)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    
    
    
    });

    // approve contesntant
    export const rejectContestantAction = createAsyncThunk('contestant/reject', async (payload, { rejectWithValue, getState, dispatch }) => {
        //get user token from store
    
        const userToken = getState()?.users?.userAuth?.token;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
    
        };
    
        console.log(payload)
        try {
            //make http call here
    
            const { data } = await axios.put(`${BaseURL}/contestants/reject/${payload?._id}`, payload, config);
            console.log(payload?._id)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    
    
    
    });

const contestantsSlices = createSlice({
    name: 'contestants',
    initialState: {
        
    },
    extraReducers: (builder) => {
        // register

        // handle pending state
        builder.addCase(registerContestantAction.pending, (state, action) => {
            state.contestantLoading = true;
            state.contestantAppErr = undefined;
            state.contestantServerErr = undefined;
        });

        //hande success state
        builder.addCase(registerContestantAction.fulfilled, (state, action) => {
            state.ContestantIsRegistered = action?.payload;
            state.contestantLoading = false;
            state.contestantAppErr = undefined;
            state.contestantServerErr = undefined;
        });
        //handle rejected state

        builder.addCase(registerContestantAction.rejected, (state, action) => {

            state.contestantLoading = false;
            state.contestantAppErr = action?.payload?.msg;
            state.contestantServerErr = action?.error?.msg;
        });
        // fetch all contestants
        //handle pending state
        builder.addCase(fetchContestantsAction.pending, (state, action) => {
            state.contestantLoading = true;
            state.contestantAppErr = undefined;
            state.contestantServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchContestantsAction.fulfilled, (state, action) => {
            state.contestantCreated = action?.payload;
            state.contestantLoading = false;
            state.contestantAppErr = undefined;
            state.contestantServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchContestantsAction.rejected, (state, action) => {
            state.contestantLoading = false;
            state.contestantAppErr = action?.payload?.msg;
            state.contestantServerErr = action?.error?.msg;
        });

         // approve contestants
        //handle pending state
        builder.addCase(approveContestantAction.pending, (state, action) => {
            state.approveContestantLoading = true;
            state.approveContestantAppErr = undefined;
            state.approveContestantServerErr = undefined;

        });
       
       
        
        
        //hande success state
        builder.addCase(approveContestantAction.fulfilled, (state, action) => {
            state.approveContestantCreated = action?.payload;
            state.approveContestantLoading = false;
            state.approveContestantAppErr = undefined;
            state.approveContestantServerErr = undefined;
          
            
        });
        //hande rejected state

        builder.addCase(approveContestantAction.rejected, (state, action) => {
            state.approveContestantLoading = false;
            state.approveContestantAppErr = action?.payload?.msg;
            state.approveContestantServerErr = action?.error?.msg;
        });

        // Reject contestants
        //handle pending state
        builder.addCase(rejectContestantAction.pending, (state, action) => {
            state.rejectContestantLoading = true;
            state.rejectContestantAppErr = undefined;
            state.rejectContestantServerErr = undefined;

        });
       
       
        
        
        //hande success state
        builder.addCase(rejectContestantAction.fulfilled, (state, action) => {
            state.rejectContestantCreated = action?.payload;
            state.rejectContestantLoading = false;
            state.rejectContestantAppErr = undefined;
            state.rejectContestantServerErr = undefined;
          
            
        });
        //hande rejected state

        builder.addCase(rejectContestantAction.rejected, (state, action) => {
            state.rejectContestantLoading = false;
            state.rejectContestantAppErr = action?.payload?.msg;
            state.rejectContestantServerErr = action?.error?.msg;
        })

    }
});


export default contestantsSlices.reducer;
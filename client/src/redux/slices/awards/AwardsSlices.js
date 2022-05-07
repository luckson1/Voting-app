import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { BaseURL } from "../../../utils/BaseUrl";

// actions for redirect 
export const resetAwardCreated = createAction("award/created/reset")
// export const resetawardUpdated = createAction("award/updated/reset")
//create award action

export const createAwardAction = createAsyncThunk(
    "award/create",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //get user token from store
        const userToken = getState()?.users?.userAuth?.token;

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userToken}`,
            },

        };


        try {
            //make http call here

            const { data } = await axios.post(`${BaseURL}/awards`, payload, config);
            dispatch(resetAwardCreated())
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });


// action to handle all awards created info
//create award action

export const fetchAwardsAction = createAsyncThunk(
    "award/fetch",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //get user token from store
        const userToken = getState()?.users?.userAuth?.token;
const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
    },

        };


        try {
            //make http call here

            const { data } = await axios.get(`${BaseURL}/awards`, config);
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });

    // action to handle one award 
//create award action

export const fetchAwardAction = createAsyncThunk(
    "award/fetch",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //get user token from store
        const userToken = getState()?.users?.userAuth?.token;
const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
    },

        };


        try {
            //make http call here

            const { data } = await axios.get(`${BaseURL}/awards`, config);
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });

    

    // action to publish an award
//publish  award action

export const publishAwardsAction = createAsyncThunk('awards/publish', async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store

    const userToken = getState()?.users?.userAuth?.token;
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },

    };


    try {
        //make http call here

        const { data } = await axios.put(`${BaseURL}/awards/publish/${payload?.id}`, payload, config);
        console.log(payload)
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});
export const closeAwardsAction = createAsyncThunk('awards/close', async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store

    const userToken = getState()?.users?.userAuth?.token;
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },

    };


    try {
        //make http call here

        const { data } = await axios.put(`${BaseURL}/awards/close/${payload?.id}`, payload, config);
       
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});

// create slices for dispatch

const awardsSlices = createSlice({
    name: 'award',
    initialState: {

    },
    extraReducers: (builder) => {
        // create award
        // handle pending state
        builder.addCase(createAwardAction.pending, (state, action) => {
            state.awardLoading = true;
            state.awardAppErr = undefined;
            state.awardServerErr = undefined;

        });
        builder.addCase(resetAwardCreated, (state, action) => {
            state.isawardCreated = true
        })
        //hande success state
        builder.addCase(createAwardAction.fulfilled, (state, action) => {
            state.awardCreated = action?.payload;
            state.awardLoading = false;
            state.awardAppErr = undefined;
            state.awardServerErr = undefined;
            state.isawardCreated = false
        });
        //hande rejected state

        builder.addCase(createAwardAction.rejected, (state, action) => {
            state.awardLoading = false;
            state.awardAppErr = action?.payload?.msg;
            state.awardServerErr = action?.error?.msg;
        })


        // fetch all awards
        //handle pending state
        builder.addCase(fetchAwardsAction.pending, (state, action) => {
            state.awardLoading = true;
            state.awardAppErr = undefined;
            state.awardServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchAwardsAction.fulfilled, (state, action) => {
            state.awardCreated = action?.payload;
            state.awardLoading = false;
            state.awardAppErr = undefined;
            state.awardServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchAwardsAction.rejected, (state, action) => {
            state.awardLoading = false;
            state.awardAppErr = action?.payload?.msg;
            state.awardServerErr = action?.error?.msg;
        })
          // publish an award
        //handle pending state
        builder.addCase(publishAwardsAction.pending, (state, action) => {
            state.publishAWardLoading = true;
            state.publishAWardAppErr = undefined;
            state.publishAWardServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(publishAwardsAction.fulfilled, (state, action) => {
            state.publishAwardCreated = action?.payload;
            state.publishAwardLoading = false;
            state.publishAwardAppErr = undefined;
            state.publishAwardServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(publishAwardsAction.rejected, (state, action) => {
            state.publishAwardLoading = false;
            state.publishAwardAppErr = action?.payload?.msg;
            state.publishAwardServerErr = action?.error?.msg;
        })

        //close voting and participation of an award -action

         // publish an award
        //handle pending state
        builder.addCase(closeAwardsAction.pending, (state, action) => {
            state.closeAWardLoading = true;
            state.closeAWardAppErr = undefined;
            state.closeAWardServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(closeAwardsAction.fulfilled, (state, action) => {
            state.closeAwardCreated = action?.payload;
            state.closeAwardLoading = false;
            state.closeAwardAppErr = undefined;
            state.closeAwardServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(closeAwardsAction.rejected, (state, action) => {
            state.closeAwardLoading = false;
            state.closeAwardAppErr = action?.payload?.msg;
            state.closeAwardServerErr = action?.error?.msg;
        })
    }
})

export default awardsSlices.reducer;
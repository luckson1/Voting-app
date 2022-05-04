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
    }
})

export default awardsSlices.reducer;
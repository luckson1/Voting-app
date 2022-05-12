import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { BaseURL } from "../../../utils/BaseUrl";

// actions for redirect 
export const resetAwardCreated = createAction("award/created/reset")
export const resetawardUpdated = createAction("award/updated/reset")
export const resetawardPublished = createAction("award/published/reset")
export const resetawardDeleted = createAction("award/Deleted/reset")
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
        dispatch(resetawardPublished())
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});
export const deleteAwardsAction = createAsyncThunk('awards/delete', async (payload, { rejectWithValue, getState, dispatch }) => {
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

        const { data } = await axios.delete(`${BaseURL}/awards/${payload?.id}`, config);
       dispatch(resetawardDeleted())
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});

// edit award
export const editAwardsAction = createAsyncThunk('awards/update', async (payload, { rejectWithValue, getState, dispatch }) => {
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

        const { data } = await axios.put(`${BaseURL}/awards/${payload?.id}`, payload, config);
        dispatch(resetawardUpdated())
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
        builder.addCase(resetawardPublished, (state, action) => {
            state.isawardPublished= true
        })
        
        
        //hande success state
        builder.addCase(publishAwardsAction.fulfilled, (state, action) => {
            state.publishAwardCreated = action?.payload;
            state.publishAwardLoading = false;
            state.publishAwardAppErr = undefined;
            state.publishAwardServerErr = undefined;
            state.isawardPublished = false
            
        });
        //hande rejected state

        builder.addCase(publishAwardsAction.rejected, (state, action) => {
            state.publishAwardLoading = false;
            state.publishAwardAppErr = action?.payload?.msg;
            state.publishAwardServerErr = action?.error?.msg;
        })

        //delete  an award -action

         // publish an award
        //handle pending state
        builder.addCase(deleteAwardsAction.pending, (state, action) => {
            state.deleteAWardLoading = true;
            state.deleteAWardAppErr = undefined;
            state.deleteAWardServerErr = undefined;

        });
        builder.addCase(resetawardDeleted, (state, action) => {
            state.isawardDeleted = true
        })
        
        //hande success state
        builder.addCase(deleteAwardsAction.fulfilled, (state, action) => {
            state.deleteAwardCreated = action?.payload;
            state.deleteAwardLoading = false;
            state.deleteAwardAppErr = undefined;
            state.deleteAwardServerErr = undefined;
            state.isawardDeleted = false
        });
        //hande rejected state

        builder.addCase(deleteAwardsAction.rejected, (state, action) => {
            state.deleteAwardLoading = false;
            state.deleteAwardAppErr = action?.payload?.msg;
            state.deleteAwardServerErr = action?.error?.msg;
        })

         // edit an award

         //handle pending state
         builder.addCase(editAwardsAction.pending, (state, action) => {
            state.editAwardLoading = true;
            state.editAwardAppErr = undefined;
            state.editAwardServerErr = undefined;

        })
        
        builder.addCase(resetawardUpdated, (state, action) => {
            state.isawardUpdated = true})
        //hande success state
        builder.addCase(editAwardsAction.fulfilled, (state, action) => {
            state.editAwardCreated = action?.payload;
            state.editAwardLoading = false;
            state.editAwardAppErr = undefined;
            state.editAwardServerErr = undefined;
            state.isawardUpdated = false
            
        });
        //hande rejected state

        builder.addCase(editAwardsAction.rejected, (state, action) => {
            state.editAwardLoading = false;
            state.editAwardAppErr = action?.payload?.msg;
            state.editAwardServerErr = action?.error?.msg;
        })
    }
})

export default awardsSlices.reducer;
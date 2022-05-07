import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { BaseURL } from "../../../utils/BaseUrl";

// actions for redirect 
export const resetawardCategoryCreated = createAction("awardCategory/created/reset")
// export const resetawardCategoryUpdated = createAction("awardCategory/updated/reset")
//create awardCategory action

export const createawardCategoryAction = createAsyncThunk(
    "awardCategory/create",
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

            const { data } = await axios.post(`${BaseURL}/awardCategories`, payload, config);
            console.log(data)
            dispatch(resetawardCategoryCreated())
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });


// action to handle all awardCategorys created info
//create awardCategory action

export const fetchawardCategorysAction = createAsyncThunk(
    "awardCategories/fetch",
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

            const { data } = await axios.get(`${BaseURL}/awardCategories`, config);
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });

    // action to publish an awardCategory
//publish  awardCategory action

export const publishawardCategorysAction = createAsyncThunk('awardCategorys/publish', async (payload, { rejectWithValue, getState, dispatch }) => {
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

        const { data } = await axios.put(`${BaseURL}/awardCategorys/publish/${payload?.id}`, payload, config);
        console.log(payload)
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});
export const closeawardCategorysAction = createAsyncThunk('awardCategorys/close', async (payload, { rejectWithValue, getState, dispatch }) => {
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

        const { data } = await axios.put(`${BaseURL}/awardCategorys/close/${payload?.id}`, payload, config);
       
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});

// create slices for dispatch

const awardCategorysSlices = createSlice({
    name: 'awardCategory',
    initialState: {

    },
    extraReducers: (builder) => {
        // create awardCategory
        // handle pending state
        builder.addCase(createawardCategoryAction.pending, (state, action) => {
            state.awardCategoryLoading = true;
            state.awardCategoryAppErr = undefined;
            state.awardCategoryServerErr = undefined;

        });
        builder.addCase(resetawardCategoryCreated, (state, action) => {
            state.isawardCategoryCreated = true
        })
        //hande success state
        builder.addCase(createawardCategoryAction.fulfilled, (state, action) => {
            state.awardCategoryCreated = action?.payload;
            state.awardCategoryLoading = false;
            state.awardCategoryAppErr = undefined;
            state.awardCategoryServerErr = undefined;
            state.isawardCategoryCreated = false
        });
        //hande rejected state

        builder.addCase(createawardCategoryAction.rejected, (state, action) => {
            state.awardCategoryLoading = false;
            state.awardCategoryAppErr = action?.payload?.msg;
            state.awardCategoryServerErr = action?.error?.msg;
        })


        // fetch all awardCategorys
        //handle pending state
        builder.addCase(fetchawardCategorysAction.pending, (state, action) => {
            state.awardCategoryLoading = true;
            state.awardCategoryAppErr = undefined;
            state.awardCategoryServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchawardCategorysAction.fulfilled, (state, action) => {
            state.awardCategoryCreated = action?.payload;
            state.awardCategoryLoading = false;
            state.awardCategoryAppErr = undefined;
            state.awardCategoryServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchawardCategorysAction.rejected, (state, action) => {
            state.awardCategoryLoading = false;
            state.awardCategoryAppErr = action?.payload?.msg;
            state.awardCategoryServerErr = action?.error?.msg;
        })
          // publish an awardCategory
        //handle pending state
        builder.addCase(publishawardCategorysAction.pending, (state, action) => {
            state.publishawardCategoryLoading = true;
            state.publishawardCategoryAppErr = undefined;
            state.publishawardCategoryServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(publishawardCategorysAction.fulfilled, (state, action) => {
            state.publishawardCategoryCreated = action?.payload;
            state.publishawardCategoryLoading = false;
            state.publishawardCategoryAppErr = undefined;
            state.publishawardCategoryServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(publishawardCategorysAction.rejected, (state, action) => {
            state.publishawardCategoryLoading = false;
            state.publishawardCategoryAppErr = action?.payload?.msg;
            state.publishawardCategoryServerErr = action?.error?.msg;
        })

        //close voting and participation of an awardCategory -action

         // publish an awardCategory
        //handle pending state
        builder.addCase(closeawardCategorysAction.pending, (state, action) => {
            state.closeawardCategoryLoading = true;
            state.closeawardCategoryAppErr = undefined;
            state.closeawardCategoryServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(closeawardCategorysAction.fulfilled, (state, action) => {
            state.closeawardCategoryCreated = action?.payload;
            state.closeawardCategoryLoading = false;
            state.closeawardCategoryAppErr = undefined;
            state.closeawardCategoryServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(closeawardCategorysAction.rejected, (state, action) => {
            state.closeawardCategoryLoading = false;
            state.closeawardCategoryAppErr = action?.payload?.msg;
            state.closeawardCategoryServerErr = action?.error?.msg;
        })
    }
})

export default awardCategorysSlices.reducer;
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { BaseURL } from "../../../utils/BaseUrl";

// actions for redirect after action is completed
export const resetawardCategoryCreated = createAction("awardCategory/created/reset")
export const resetawardCategoryUpdated = createAction("awardCategory/updated/reset")
export const resetawardCategoryPublished = createAction("awardCategory/publish/reset")
export const resetawardCategoryDeleted = createAction("award/Deleted/reset")
// create awardCategory action

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
            
            dispatch(resetawardCategoryCreated())
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });


// action to get one category into our state


export const fetchawardCategoryAction = createAsyncThunk(
    "awardCategory/fetch",
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

            const { data } = await axios.get(`${BaseURL}/awardCategories/${payload?.id}`, config);
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });

    //get all categories 

    export const fetchawardCategoriesAction = createAsyncThunk(
        "awardCategories/fetch",
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

export const publishawardCategorysAction = createAsyncThunk('awardCategories/publish', async (payload, { rejectWithValue, getState, dispatch }) => {
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

        const { data } = await axios.put(`${BaseURL}/awardCategories/publish/${payload?.id}`, payload, config);
        dispatch(resetawardCategoryPublished())
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

// edit awardCategory
export const editAwardCategorysAction = createAsyncThunk('awardCategorys/update', async (payload, { rejectWithValue, getState, dispatch }) => {
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

        const { data } = await axios.put(`${BaseURL}/awardCategories/${payload?.id}`, payload, config);
        dispatch(resetawardCategoryUpdated())
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});

export const deleteAwardCategoryAction = createAsyncThunk('awardCategory/delete', async (payload, { rejectWithValue, getState, dispatch }) => {
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
 
         const { data } = await axios.delete(`${BaseURL}/awardCategories/${payload?.id}`, config);
        dispatch(resetawardCategoryDeleted())
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


        // fetch one awardCategory
        //handle pending state
        builder.addCase(fetchawardCategoryAction.pending, (state, action) => {
            state.awardCategoryLoading = true;
            state.awardCategoryAppErr = undefined;
            state.awardCategoryServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchawardCategoryAction.fulfilled, (state, action) => {
            state.awardCategoryCreated = action?.payload;
            state.awardCategoryLoading = false;
            state.awardCategoryAppErr = undefined;
            state.awardCategoryServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchawardCategoryAction.rejected, (state, action) => {
            state.awardCategoryLoading = false;
            state.awardCategoryAppErr = action?.payload?.msg;
            state.awardCategoryServerErr = action?.error?.msg;
        })


        //  fetch all award categories 
        //handle pending state
        builder.addCase(fetchawardCategoriesAction.pending, (state, action) => {
            state.awardCategoryLoading = true;
            state.awardCategoryAppErr = undefined;
            state.awardCategoryServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchawardCategoriesAction.fulfilled, (state, action) => {
            state.awardCategoryCreated = action?.payload;
            state.awardCategoryLoading = false;
            state.awardCategoryAppErr = undefined;
            state.awardCategoryServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchawardCategoriesAction.rejected, (state, action) => {
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
        // check if publish is a success
        builder.addCase(resetawardCategoryPublished, (state, action) => {
            state.isawardCategoryPublished = true});
        //hande success state
        builder.addCase(publishawardCategorysAction.fulfilled, (state, action) => {
            state.publishawardCategoryCreated = action?.payload;
            state.publishawardCategoryLoading = false;
            state.publishawardCategoryAppErr = undefined;
            state.publishawardCategoryServerErr = undefined;
            state.isawardCategoryPublished = false
            
        });
        //hande rejected state

        builder.addCase(publishawardCategorysAction.rejected, (state, action) => {
            state.publishawardCategoryLoading = false;
            state.publishawardCategoryAppErr = action?.payload?.msg;
            state.publishawardCategoryServerErr = action?.error?.msg;
        })

        //close voting and participation of an awardCategory -action

         
        //handle pending state
        builder.addCase(closeawardCategorysAction.pending, (state, action) => {
            state.closeawardCategoryLoading = true;
            state.closeawardCategoryAppErr = undefined;
            state.closeawardCategoryServerErr = undefined;

        });
        
        
        //handle success state
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

        // edit a category

         //handle pending state
         builder.addCase(editAwardCategorysAction.pending, (state, action) => {
            state.editAwardCategoryLoading = true;
            state.editAwardCategoryAppErr = undefined;
            state.editAwardCategoryServerErr = undefined;

        })
        
        builder.addCase(resetawardCategoryUpdated, (state, action) => {
            state.isawardCategoryUpdated = true})
        //hande success state
        builder.addCase(editAwardCategorysAction.fulfilled, (state, action) => {
            state.editAwardCategoryCreated = action?.payload;
            state.editAwardCategoryLoading = false;
            state.editAwardCategoryAppErr = undefined;
            state.editAwardCategoryServerErr = undefined;
            state.isawardCategoryUpdated = false
            
        });
        //hande rejected state

        builder.addCase(editAwardCategorysAction.rejected, (state, action) => {
            state.editAwardCategoryLoading = false;
            state.editAwardCategoryAppErr = action?.payload?.msg;
            state.editAwardCategoryServerErr = action?.error?.msg;
        })

                //delete  an award -action

         // publish an award
        //handle pending state
        builder.addCase(deleteAwardCategoryAction.pending, (state, action) => {
            state.deleteAWardLoading = true;
            state.deleteAWardAppErr = undefined;
            state.deleteAwardCategoryerverErr = undefined;

        });
        builder.addCase(resetawardCategoryDeleted, (state, action) => {
            state.isawardCategoryDeleted = true
        })
        
        //hande success state
        builder.addCase(deleteAwardCategoryAction.fulfilled, (state, action) => {
            state.deleteAwardCreated = action?.payload;
            state.deleteAwardLoading = false;
            state.deleteAwardAppErr = undefined;
            state.deleteAwardCategoryerverErr = undefined;
            state.isawardCategoryDeleted = false
        });
        //hande rejected state

        builder.addCase(deleteAwardCategoryAction.rejected, (state, action) => {
            state.deleteAwardLoading = false;
            state.deleteAwardAppErr = action?.payload?.msg;
            state.deleteAwardCategoryerverErr = action?.error?.msg;
        })

    }
})

export default awardCategorysSlices.reducer;
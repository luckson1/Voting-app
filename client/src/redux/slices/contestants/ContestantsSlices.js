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
// action to get all categories into our state


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
        })

    }
});


export default contestantsSlices.reducer;
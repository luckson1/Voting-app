import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from 'axios'
import { BaseURL } from "../../../utils/BaseUrl";

//action for redirection
// export const resetProfileUpdated = createAction("vote/updated/reset")
//register action creation

export const createVoteAction = createAsyncThunk('votes/create', async (payload, { rejectWithValue, getState, dispatch }) => {
    
    // configuring the request
    const config = {
       
        headers: {
            "Content-Type": "application/json",
          },
    };

    try {
        //http call
        const { data } = await axios.post(
            `${BaseURL}/votes`,
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
// action to get all votes into our state


export const fetchVotesAction = createAsyncThunk(
    "votes/fetch",
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

            const { data } = await axios.get(`${BaseURL}/votes`, config);
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });


const votesSlices = createSlice({
    name: 'votes',
    initialState: {
        
    },
    extraReducers: (builder) => {
        // register

        // handle pending state
        builder.addCase(createVoteAction.pending, (state, action) => {
            state.voteLoading = true;
            state.voteAppErr = undefined;
            state.voteServerErr = undefined;
        });

        //hande success state
        builder.addCase(createVoteAction.fulfilled, (state, action) => {
            state.voteIsRegistered = action?.payload;
            state.voteLoading = false;
            state.voteAppErr = undefined;
            state.voteServerErr = undefined;
        });
        //handle rejected state

        builder.addCase(createVoteAction.rejected, (state, action) => {

            state.voteLoading = false;
            state.voteAppErr = action?.payload?.msg;
            state.voteServerErr = action?.error?.msg;
        });
        // fetch all votes
        //handle pending state
        builder.addCase(fetchVotesAction.pending, (state, action) => {
            state.voteLoading = true;
            state.voteAppErr = undefined;
            state.voteServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchVotesAction.fulfilled, (state, action) => {
            state.voteFetched = action?.payload;
            state.voteLoading = false;
            state.voteAppErr = undefined;
            state.voteServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchVotesAction.rejected, (state, action) => {
            state.voteLoading = false;
            state.voteAppErr = action?.payload?.msg;
            state.voteServerErr = action?.error?.msg;
        });

         

    }
});


export default votesSlices.reducer;
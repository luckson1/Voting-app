
import {configureStore} from "@reduxjs/toolkit";
import userReducers from "../slices/users/UserSlices";
import awardsReducers from "../slices/awards/AwardsSlices";


const Store=configureStore( {
    reducer: { users: userReducers,
        awards: awardsReducers

        
    }
});



export default Store;
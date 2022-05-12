
import {configureStore} from "@reduxjs/toolkit";
import userReducers from "../slices/users/UserSlices";
import awardsReducers from "../slices/awards/AwardsSlices";
import awardCategoryReducers from "../slices/AwardCategories/AwardCategorySlices";
import contestantReducers from "../slices/contestants/ContestantsSlices";

const Store=configureStore( {
    reducer: { users: userReducers,
        awards: awardsReducers,
        categories: awardCategoryReducers,
        contestants: contestantReducers

        
    }
});



export default Store;
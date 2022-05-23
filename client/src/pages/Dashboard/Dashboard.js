import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardCard } from "../../Components/dashboardCard";
import LoadingComponent from "../../Components/Loading";
import { fetchawardCategoriesAction } from "../../redux/slices/AwardCategories/AwardCategorySlices";




export const Dashboard = () => {
    // disatch action to fetch all categories data
    const dispatch = useDispatch()
    useEffect(() => { dispatch(fetchawardCategoriesAction()) }, [dispatch])

    //get state from store
    const data = useSelector(state => state?.categories)
    const {awardCategoryAppErr, awardCategoryCreated, awardCategoryLoading, awardCategoryServerErr}= data

    const categories=awardCategoryCreated?.awardCategory
   console.log(categories)
    return (
        <div className="container-fluid">
            <div className="row">
            {awardCategoryLoading ? (
            <h1><LoadingComponent /></h1>
          ) : awardCategoryAppErr || awardCategoryServerErr ? (
            <div>Error Occured When Loading Data</div>
          ) : categories?.length <= 0 ? (
            <h1>No awards Categories Found</h1>
          ) : (categories?.map(category => {

            return <DashboardCard category={category} key={category?._id} startDate={new Date(category?.startDate)} endDate={new Date(category?.endDate)}/>
          }))}
            </div>
        </div>
    )
};


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContestantsAction } from '../../redux/slices/contestants/ContestantsSlices';
import { fetchAwardsAction } from '../../redux/slices/awards/AwardsSlices';
import { ContestantsTable } from '../../Components/ContestantsTable';
import LoadingComponent from '../../Components/Loading';
export const Contestants = () => {

  const dispatch = useDispatch()

  // dispatch action to fetc contestat data 

  useEffect(() => { dispatch(fetchContestantsAction()) }, [dispatch])

  // get state from store 
  const contestants = useSelector(state => state?.contestants?.contestantCreated?.contestants)
  const awardsData = useSelector(state => state?.awards)
  const {awardLoading, awardAppErr, awardServerErr, awardCreated}=awardsData
const awards=awardCreated?.awards



  return (
    <div className="container mt-3">
      <div className="row" >
        <div className="col">
          <h2 className="text-center">Contestants</h2>
          <p className="text-center">These are the contestants to your events</p>
          <table className="table">
            <thead>
              <tr>
                <th>Contestant</th>
                <th>Country</th>
                <th>Gender</th>
                <th>Creation Date</th>
                <th>Status</th>
                <th>Action</th>
            
              </tr>
            </thead>
            <tbody>

            {awardLoading ? (
                                    <tr><td className="col"><LoadingComponent /></td></tr>    
                                    ) : awardServerErr || awardAppErr ? (
                                      <tr><td className="col display-4">ERR</td></tr>  
                                    ) : awards?.contestants?.length<= 0 ? (
                                      <tr><td className="col display-4">No Contestnants Found</td></tr>  
                                    ) : (contestants?.map(contestant => {
                                        
                                        return <ContestantsTable contestant={contestant} key={contestant.id }/>
                                    }))}


            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

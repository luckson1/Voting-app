import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContestantsAction } from '../../redux/slices/contestants/ContestantsSlices';
export const Contestants = () => {

  const dispatch = useDispatch()

  // dispatch action to fetc contestat data 
  useEffect(() => { dispatch(fetchContestantsAction()) }, [dispatch])

  // get state from store 
  const contestants = useSelector(state => state?.contestants?.contestantCreated?.contestants)
  console.log(contestants)
  return (
    <div className="container mt-3">
      <h2 className="text-center">Contestants</h2>
      <p className="text-center">These are the contestants to your events</p>
      <table className="table">
        <thead>
          <tr>
            <th>Contestant</th>
            <th>Award</th>
            <th>Category</th>
            <th>Company</th>
            <th>Creation Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          
            {contestants?.map(contestant => {
              return (<tr>

                <td>{contestant?.firstname}</td>
                <td>{contestant?.mainAward}</td>
                <td>{contestant?.awardCategory}</td>
                <td>{contestant?.companyApplyTo}</td>
                <td>{contestant?.createdAt}</td>                
                <td>{contestant?.status}</td>
              </tr>)
            })}
         

        </tbody>
      </table>
    </div>
  );
};

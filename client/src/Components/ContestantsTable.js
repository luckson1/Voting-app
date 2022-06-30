import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { approveContestantAction, rejectContestantAction } from '../redux/slices/contestants/ContestantsSlices';
import dateFormatter from '../utils/dateFormatter';
export const ContestantsTable = ({ contestant }) => {  
 

    //call useDispatch
    const dispatch = useDispatch()
    
    const handleChange = () => {  dispatch(approveContestantAction(contestant));window.location.reload() }
    const handleChange2 = () => {  dispatch(rejectContestantAction(contestant));window.location.reload()  }

    const approveIcon = <i className="bi bi-check2-all btn-sm btn-success" type="button" onClick={handleChange}>Approve</i>    
    const rejectIcon = <i className="bi bi-x-circle btn-sm btn-danger" type="button" onClick={handleChange2}>Reject</i>
    return (
        <>
            <tr>

                <td className="p-6">{contestant?.firstname} </td>
                <td className="p-6">{contestant?.country}</td>
                <td className="p-6">{contestant?.gender}</td>
                <td className="p-6">{contestant?.createdAt && dateFormatter(contestant?.createdAt)}</td>
                <td className="p-6">{contestant?.status}</td>
                <td className="p-6"> {contestant?.status==="Approved"? rejectIcon: approveIcon}   </td>
               
            </tr>
        </>
    );
};

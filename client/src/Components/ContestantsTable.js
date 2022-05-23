import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { approveContestantAction, rejectContestantAction } from '../redux/slices/contestants/ContestantsSlices';
import dateFormatter from '../utils/dateFormatter';
export const ContestantsTable = ({ contestant }) => {
    const approveIcon = <i className="bi bi-check2-all btn-sm btn-success" type="button"></i>
    const disapproveIcon = <i className="bi bi-x-circle btn-sm btn-danger" type="button"></i>
    const approveText = <p className="text-info" ><small>Approved</small></p>
    const disapproveText = <p className="text-info" disabled><small>Rejected</small></p>

    //call useDispatch
    const dispatch = useDispatch()
    const [approve, setApprove] = useState(approveIcon)
    const [reject, setReject] = useState(disapproveIcon)
    const handleChange = () => { setApprove(approveText); dispatch(approveContestantAction(contestant)) }
    const handleChange2 = () => { setReject(disapproveText); dispatch(rejectContestantAction(contestant)) }
    return (
        <>
            <tr>

                <td className="p-6">{contestant?.firstname} </td>
                <td className="p-6">{contestant?.country}</td>
                <td className="p-6">{contestant?.gender}</td>
                <td className="p-6">{contestant?.createdAt && dateFormatter(contestant?.createdAt)}</td>
                <td className="p-6">{contestant?.status}</td>
                <td className="p-6" onClick={handleChange}>{contestant?.status === "Approved" ?
                    (<p className="text-success">Done</p>) :
                    (approve)} </td>
                <td className="p-6" onClick={handleChange2}>{contestant?.status === "Rejected" ?
                    (<p className="text-danger">Done</p>) :
                    (reject)} </td>
            </tr>
        </>
    );
};

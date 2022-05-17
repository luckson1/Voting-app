import React from 'react';


export const PublicContestants = ({ formik, contestant, profilePic }) => {
    return (<>

        <div className="form-check form-check-inline">
            <input
                className="form-check-input"
                type="radio"
                name="contestantVotingFor"
                id="contestantVotingFor"
                value='contestantVotingFor'
                // value={formik.values.contestant}
                onChange={() => { formik.setFieldValue('contestantVotingFor', contestant?.id) }}
                onBlur={formik?.handleBlur("contestantVotingFor")} />
            <label className="form-check-label" htmlFor="contestantVotingFor">
                <img
                    src={contestant?.image}
                    className="rounded-circle"
                    height="50"
                    alt=""
                    loading="lazy"
                />  {contestant?.firstname} {contestant?.lastname}</label>
        </div>



        <div className="text-danger mb-2">
            {formik?.touched?.contestantVotingFor && formik?.errors?.contestantVotingFor}
        </div>
    </>);
};

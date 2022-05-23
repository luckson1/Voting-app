import React from 'react';
import './DashboardCard.css'
export const DashboardCard = ({category, startDate, endDate}) => {
    console.log(category)
    return (

        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <div className="tile">
                <div className="wrapper">
                    <div className="header">{category?.title}</div>

                    <div className="stats">

                        <div>
                            <strong>CONTESTANTS</strong> {category?.contestants?.length}
                        </div>

                        <div>
                            <strong>VOTERS</strong> {category?.votes?.length}
                        </div>

                        <div>
                            <strong>TIME LEFT</strong> {category?.daysLeft}
                        </div>
                        

                    </div>



                </div>
            </div>
        </div>



    );
};

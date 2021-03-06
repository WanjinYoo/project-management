import React, { useState, useEffect } from "react";

import Clock from "react-live-clock";
import TotalTicketNum from "./TotalTicketNum.js";
import ActiveTicketNum from "./ActiveTicketNum.js";
import WaitingApprovalNum from "./WaitingApprovalNum.js";
import OverdueTicketNum from "./OverdueTicketNum.js";
import AlmostTicketNum from "./AlmostTicketNum.js";
import OpenProjectNum from "./OpenProjectNum.js";
import PendingTicketNum from "./PendingTicketNum.js";
import RejectedTicketNum from "./RejectedTicketNum.js";
import NewTicketNum from "./NewTicketNum.js";
import Chart from "./DonutChart.js";
import { Typography } from "@material-ui/core";
import "../../componentsstyling/dashboard.scss";
import { connect } from "react-redux";
import axios from "axios";

const mapStateToProps = state => {
    return {
        logIn: state.logIn
    };
};

const Dashboard = props => {
    const [data, setData] = useState({});
    const [firstName, setfirstName] = useState();

    let personid = props.logIn.userId;
    useEffect(() => {
        const promise1 = axios.get(`/api/users/projects/${personid}`);
        const promise2 = axios.get(`/api/users/${personid}`);
        axios.all([promise1, promise2]).then(resArray => {
            const res1 = resArray[0];
            const res2 = resArray[1];
            const newData = { data1: res1, data2: res2 };
            setData(newData);
            setfirstName(newData.data2.data.first_name);
        });
        return () => {
            setData(null);
        }
    }, []);

    return (
        <div className="alldash">
            <h1>Your Dashboard</h1>
            <Typography component="h1" variant="h5" noWrap>
                Hello {firstName}
            </Typography>
            <Typography component="h1" variant="h6" noWrap>
                Today is:{" "}
                <Clock format={"dddd, MMMM Mo, YYYY"} timezone={"US/Pacific"} />{" "}
                The time is:{" "}
                <Clock
                    format={"h:mm:ss A"}
                    ticking={true}
                    timezone={"US/Pacific"}
                />
            </Typography>

            <div className="dashboardRender">
                <Chart id={personid} />
                <div id="widgetBar">
                    <div id="dashStatWidgets">
                        <OverdueTicketNum id={personid} />
                        <AlmostTicketNum id={personid} />
                        <WaitingApprovalNum id={personid} />
                    </div>
                    <div id="dashStatWidgets">
                        <NewTicketNum id={personid} />
                        <PendingTicketNum id={personid} />
                        <RejectedTicketNum id={personid} />
                    </div>
                    <div id="dashStatWidgets">
                        <ActiveTicketNum id={personid} />
                        <TotalTicketNum id={personid} />
                        <OpenProjectNum id={personid} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default connect(mapStateToProps)(Dashboard);

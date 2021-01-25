import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";

export default function ProfileForm(props) {
    const [values, setData] = useState([]);
    let userID = 2;
    useEffect(() => {
        axios.get(`/api/users/${userID}`).then(res => {
            setData(res.data);
        });
    }, []);

    const onUpdate = () => {
        alert("Profile Updated");
        axios
            .patch(`/api/users/${userID}`, values)
            .then(res => console.log(res));
    };
    const handleInputChange = e => {
        const { name, value } = e.target;
        setData({ ...values, [name]: value });
    };
    return (
        <div>
            <div>
                {values.first_name && (
                    <TextField
                        label="First Name"
                        style={{ margin: 8 }}
                        value={values.first_name}
                        name="first_name"
                        fullWidth
                        margin="normal"
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                    />
                )}
                {values.last_name && (
                    <TextField
                        label="Last Name"
                        style={{ margin: 8 }}
                        value={values.last_name}
                        name="last_name"
                        fullWidth
                        margin="normal"
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                    />
                )}
                {values.email && (
                    <TextField
                        label="Email"
                        required
                        name="email"
                        style={{ margin: 8 }}
                        value={values.email}
                        fullWidth
                        onChange={handleInputChange}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                    />
                )}
                {values.password && (
                    <TextField
                        label="Password"
                        style={{ margin: 8 }}
                        value={values.password}
                        name="password"
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                    />
                )}
                {values.telephone && (
                    <TextField
                        label="Telephone Number"
                        style={{ margin: 8 }}
                        value={values.telephone}
                        name="telephone"
                        fullWidth
                        onChange={handleInputChange}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                    />
                )}
                {values.slack_account && (
                    <TextField
                        label="Slack Account"
                        style={{ margin: 8 }}
                        value={values.slack_account}
                        name="slack_account"
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                    />
                )}
                {values.team && (
                    <TextField
                        label="Teams"
                        style={{ margin: 8 }}
                        value={values.team}
                        onChange={handleInputChange}
                        name="team"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                    />
                )}
                {values.position && (
                    <TextField
                        label="Position"
                        style={{ margin: 8 }}
                        name="position"
                        value={values.position}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                    />
                )}
            </div>
            <Button variant="contained" color="primary" onClick={onUpdate}>
                UPDATE
            </Button>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const mapStateToProps = state => {
    return {
        logIn: state.logIn,
        pageContent: state.pageContent
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeContent: content =>
            dispatch({ type: "GET_CONTENT", content: content })
    };
};
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper
    }
}));

const options = ["Low", "Medium", "High", "Urgent"];
const ProfileForm = props => {
    const [values, setData] = useState({});
    const [uvalues, setuData] = useState([]);
    let userID = props.logIn.userId;
    let ID = props.Pid;
    const [Pusers, setPuser] = useState([]);
    useEffect(() => {
        const promise1 = axios.get(`/api/projects/${ID}`);
        const promise2 = axios.get(`/api/projects/${ID}/member`);
        axios.all([promise1, promise2]).then(resArr => {
            const res1 = resArr[0];
            const res2 = resArr[1];
            setPuser(res2.data);
            setuData(res1.data),
                setData({
                    project_name: res1.data.name,
                    status: "Pending",
                    priority: "Medium"
                });
        });
        return () => {
            setPuser(null);
            setData(null);
        }
    }, []);

    const onUpdate = () => {
        axios.post(`/api/tickets`, values).then(res => {
                alert("Ticket Created!"),
                props.changeContent("projectdashboard");
        });
    };
    const handleInputChange = e => {
        const { name, value } = e.target;
        setData({ ...values, [name]: value, issuer_email: props.Pemail });
    };
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [Dvalue, setDValue] = useState(null);
    const handleClickListItem = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setData({ ...values, priority: options[index] });
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const pData = Pusers.map(x => x.email);
    const handleClickListItem3 = event => {
        setAnchorE(event.currentTarget);
    };
    const [anchorE, setAnchorE] = useState(null);
    const [selectedIndexff3, setSelectedIndexff3] = useState(1);

    const handleMenuItemClick3 = (event, indexff) => {
        setSelectedIndexff3(indexff);
        setData({ ...values, receiver_email: pData[indexff] });
        setAnchorE(null);
    };

    const handleClose3 = () => {
        setAnchorE(null);
    };

    return (
        <div>
            <div>
                <div className={classes.root}>
                    <List component="nav" aria-label="Device settings">
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="lock-menu"
                            aria-label="when device is locked"
                            onClick={handleClickListItem}
                        >
                            <ListItemText
                                primary="Select Priority Level"
                                secondary={options[selectedIndex]}
                            />
                        </ListItem>
                    </List>
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {options.map((option, index) => (
                            <MenuItem
                                key={option}
                                selected={index === selectedIndex}
                                onClick={event =>
                                    handleMenuItemClick(event, index)
                                }
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
                <TextField
                    label="Project Name"
                    style={{ margin: 8 }}
                    value={values.project_name}
                    name="project_name"
                    InputLabelProps={{
                        shrink: true
                    }}
                    fullWidth
                    placeholder="please dont change this"
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Issuer Email"
                    style={{ margin: 8 }}
                    value={props.Pemail}
                    name="issuer_email"
                    InputLabelProps={{
                        shrink: true
                    }}
                    placeholder="please dont change this"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                {/* <TextField
                    label="Receiver Email"
                    name="receiver_email"
                    style={{ margin: 8 }}
                    value={values.receiver_email}
                    fullWidth
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                /> */}
                <div className={classes.root}>
                    <List component="navf" aria-label="Device settingsf">
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="lock-menu"
                            aria-label="when devifce is locked"
                            onClick={handleClickListItem3}
                        >
                            <ListItemText
                                primary="Select Receiver Email"
                                secondary={pData[selectedIndexff3]}
                            />
                        </ListItem>
                    </List>
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorE}
                        keepMounted
                        open={Boolean(anchorE)}
                        onClose={handleClose3}
                    >
                        {pData.map((option, indexff) => (
                            <MenuItem
                                key={option}
                                selected={indexff === selectedIndexff3}
                                onClick={event =>
                                    handleMenuItemClick3(event, indexff)
                                }
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
                <TextField
                    label="Subject"
                    style={{ margin: 8 }}
                    name="subject"
                    value={values.subject}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Description"
                    style={{ margin: 8 }}
                    value={values.description}
                    name="description"
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Start Time"
                    style={{ margin: 8 }}
                    value={values.start_at}
                    onChange={handleInputChange}
                    name="start_at"
                    type="datetime-local"
                    placeholder="yyyy-mm-dd hh:mm:ss"
                    // helperText="yyyy-mm-dd hh:mm:ss"

                    InputLabelProps={{
                        shrink: true
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Deadline"
                    style={{ margin: 8 }}
                    value={values.deadline}
                    onChange={handleInputChange}
                    name="deadline"
                    type="date"
                    type="datetime-local"
                    placeholder="yyyy-mm-dd hh:mm:ss"
                    // helperText="yyyy-mm-dd hh:mm:ss"

                    InputLabelProps={{
                        shrink: true
                    }}
                    margin="normal"
                    variant="outlined"
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to={{
                    pathname: "/projectdashboard",
                    aboutProps: {
                        id: props.Pid,
                        isManager: 1
                    }
                }}
                onClick={onUpdate}
            >
                CREATE
            </Button>
        </div>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);

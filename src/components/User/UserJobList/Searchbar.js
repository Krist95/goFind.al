import { Box, Select, MenuItem, Input, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    wrapper: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "-100px",
        marginBottom: "10px",
        backgroundColor: "#fff",
        display: "flex",
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        "& > *": {
            flex: 1,
            height: "45px",
            margin: "8px",
        },
    },

    button: {
        cursor: "pointer",
        font: "inherit",
        color: "white",
        backgroundColor: "#38015c",
        border: "1px solid #38015c",
        borderRadius: "4px",
        padding: "0.5rem 2.5rem",
        zIndex: "10",
    },
});

const Searchbar = (props) => {
    const jobSearch = props.state;
    const handleChange = props.state1;
    const toggleFilters = props.state2;
    const filterOn = props.state3;

    const classes = useStyles();

    return (
        <Box p={2} className={classes.wrapper}>
            <Select onChange={handleChange} value={jobSearch.type} name="type" disableUnderline variant="filled" disabled={!filterOn} >
                <MenuItem value="Full time">Full time</MenuItem>
                <MenuItem value="Part time">Part time</MenuItem>
                <MenuItem value="Me kontratë">Me kontratë</MenuItem>
            </Select>
            <Select onChange={handleChange} value={jobSearch.location} name="location" disableUnderline variant="filled" disabled={!filterOn} >
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Në zyrë">Në zyrë</MenuItem>
            </Select>
            <Input
                type="text"
                placeholder="Kërko një punë"
                onChange={props.searchTermHandler}
                disabled={filterOn}
            />
            <button onClick={toggleFilters} className={classes.button} >
                {props.state3 ? 'Kërko me fjalë kyçe' : 'Kërko me filtra'}
            </button>
        </Box>
    )
}

export default Searchbar;
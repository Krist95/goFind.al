import { Box, Grid, Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    wrapper: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#fff",
        borderRadius: "5px",
        border: "1px solid #e8e8e8",
        cursor: "pointer",
        transition: ".3s",
        "&:hover": {
            boxShadow: "0px 1px 25px rgba(0, 0, 0, 0.1)",
            borderLeft: "6px solid #38015c"
        }
    },
    companyName: {
        color: "#fff",
        fontSize: "13.5px",
        backgroundColor: "#38015c",
        padding: "5px",
        borderRadius: "5px",
        display: "inline-block",
        fontWeight: 600,
    }

});

const JobCard = (props) => {
    const classes = useStyles();
    return (
        <Box p={2} className={classes.wrapper}>
            <Grid container alignItems="center">
                <Grid item xs>
                    <Typography variant="subtitle1">{props.title}</Typography>
                    <Typography className={classes.companyName} variant="subtitle2">{props.companyName}</Typography>
                </Grid>
                <Grid item xs>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: "40rem" }}>
                        <Box display="flex">
                            <Typography >Përshkrimi i punës: {props.description}</Typography>
                        </Box>
                    </div>
                </Grid>
                <Grid item container direction="column" alignItems="flex-end" xs>
                    <Grid item>
                        <Typography variant="caption">
                            {props.type} | {props.location}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box>
                            <Button onClick={props.open} variant="outlined">Verifiko</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
};

export default JobCard;
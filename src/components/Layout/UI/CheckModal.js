import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    IconButton,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { format } from 'date-fns';
import { useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import db from '../../../firebase';
import { updateDoc, doc, arrayUnion } from '@firebase/firestore';
import { useHistory } from 'react-router-dom';

const CheckModal = (props) => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const jobApplicationHandler = async () => {
        if (authCtx.userID) {
            const selectedJob = doc(db, "jobs", props.job.jobID);
            await updateDoc(selectedJob, {
                applicantsID: arrayUnion(authCtx.userID),
            });
            props.closeModal();
        } else {
            history.push('/auth');
            props.closeModal();
        }
    }

    return (
        <Dialog open={!!Object.keys(props.job).length} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {props.job.title} @ {props.job.companyName}
                    <IconButton onClick={props.closeModal} >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box>
                    <Box display="flex" gridGap={10}>
                        <Typography variant="body2"  >Postuar në datë: </Typography>
                        <Typography variant="body2"  >{props.job.date && format(props.job.date.toDate(), "dd / MMM / yyyy")}</Typography>
                    </Box>
                    <Box display="flex" gridGap={10}>
                        <Typography variant="body2" >Lloji i punës:</Typography>
                        <Typography variant="body2" >{props.job.type}</Typography>
                    </Box>
                    <Box display="flex" gridGap={10}>
                        <Typography variant="body2" >Vendndodhja e punës:</Typography>
                        <Typography variant="body2" >{props.job.location}</Typography>
                    </Box>
                    <Box display="flex" gridGap={10}>
                        <Typography variant="body2" >Përshkrimi i punës: </Typography>
                        <p style={{
                            height: 'auto',
                            width: "350px",
                            wordBreak: "break-all",
                            flex: "1",
                            marginTop: "0",
                            marginBottom: "0",
                            marginLeft: "3",
                            fontSize: "0.875rem"
                        }}>
                            {props.job.description}
                        </p>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={jobApplicationHandler}>Apliko</Button>
            </DialogActions>
        </Dialog >
    )
};
export default CheckModal;

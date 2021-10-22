import { useRef, useContext, useState, useEffect, useCallback, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../../store/auth-context';
import classes from './ProfileForm.module.css';

import db from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProfileForm = () => {
    const history = useHistory();

    const newPasswordInputRef = useRef();
    const authCtx = useContext(AuthContext);

    const [userData, setUserData] = useState({});

    const fetchUser = useCallback(async () => {
        const userRef = doc(db, "users", authCtx.userID);
        const data = await getDoc(userRef);
        setUserData(data.data());
    }, [authCtx]);

    useEffect(() => {
        fetchUser(authCtx.userID);
    }, [authCtx, fetchUser]);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredNewPassword = newPasswordInputRef.current.value;

        // add validation

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyApXQpGHehRPKBP99n-V0UkrsSXQyiEds0', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                password: enteredNewPassword,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            // assumption: Always succeeds!

            history.replace('/myapplications');
        });
    };

    return (
        <Fragment>
            <h1>Mirëserdhe {userData.firstname}!</h1>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='FirstName'>Emri juaj</label>
                    <input type='firstname' minLength="7" value={userData.firstname} disabled />
                </div>
                <div className={classes.control}>
                    <label htmlFor='LastName'>Mbiemri juaj</label>
                    <input type='lastname' minLength="7" value={userData.lastname} disabled />
                </div>
                <div className={classes.control}>
                    <label htmlFor='FirstName'>ID juaj</label>
                    <input type='firstname' minLength="7" value={userData.idNumber} disabled />
                </div>
                <div className={classes.control}>
                    <label htmlFor='E-mail'>Email juaj</label>
                    <input type='email' minLength="7" value={userData.email} disabled />
                </div>
                <div className={classes.control}>
                    <label htmlFor='new-password'>Fjalëkalimi i ri</label>
                    <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
                </div>
                <div className={classes.action}>
                    <button>Ndrysho fjalëkalimin</button>
                </div>
            </form>
        </Fragment>
    );
};

export default ProfileForm;
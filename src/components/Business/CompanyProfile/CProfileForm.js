import { useRef, useContext, useState, useEffect, useCallback, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../../store/auth-context';
import classes from '../../User/Profile/ProfileForm.module.css';

import db from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const CProfileForm = () => {
    const history = useHistory();

    const newPasswordInputRef = useRef();
    const authCtx = useContext(AuthContext);

    const [companyProfileData, setCompanyProfileData] = useState({});

    const fetchCompanyData = useCallback(async () => {
        if (!authCtx.companyID) {
            return;
        }

        const companyRef = doc(db, "companies", authCtx.companyID);
        const data = await getDoc(companyRef);
        setCompanyProfileData(data.data());
    }, [authCtx]);

    useEffect(() => {
        fetchCompanyData(authCtx.companyID);
    }, [authCtx, fetchCompanyData]);

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

            history.replace('/company-offers');
        });
    };

    return (
        <Fragment>
            <h1>Welcome {companyProfileData.ownerFirstname}!</h1>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='CompanyName'>Emri i kompanisë</label>
                    <input type='companyName' minLength="7" value={companyProfileData.companyName} disabled />
                </div>
                <div className={classes.control}>
                    <label htmlFor='FirstName'>Emri i pronarit</label>
                    <input type='firstname' minLength="7" value={companyProfileData.ownerFirstname} disabled />
                </div>
                <div className={classes.control}>
                    <label htmlFor='LastName'>Mbiemri i pronarit</label>
                    <input type='lastname' minLength="7" value={companyProfileData.ownerLastname} disabled />
                </div>
                <div className={classes.control}>
                    <label htmlFor='nipt'>NIPT i kompanisë</label>
                    <input type='text' minLength="7" value={companyProfileData.companyNIPT} disabled />
                </div>
                <div className={classes.control}>
                    <label htmlFor='E-mail'>Email i regjistrimit</label>
                    <input type='email' minLength="7" value={companyProfileData.email} disabled />
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

export default CProfileForm;
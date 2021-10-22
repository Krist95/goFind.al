import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import constants from '../../constants';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthFormBusiness = () => {
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const companyNameInputRef = useRef();
    const niptInputRef = useRef();
    const oFirstnameInputRef = useRef();
    const oLastnameInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const addCompany = async (localId) => {
            await setDoc(doc(db, "companies", localId), {
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
                companyName: enteredCompanyName,
                companyNIPT: enteredNipt,
                ownerFirstname: enteredOwnersFirstname,
                ownerLastname: enteredOwnersLastname,
                userRole: constants.company,
            });
            authCtx.userRole(constants.company);
            localStorage.setItem('userRole', constants.company);
        }

        const verifyUsertypeOnLogin = async (localId) => {
            const docRef = doc(db, "companies", localId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                authCtx.userRole(docSnap.data().userRole)
                history.replace('/company-offers');
            }
            else {
                authCtx.logout();
                alert("Login failed!");
            }
        }
        // optional: Add validation

        setIsLoading(true);
        let url;
        let enteredCompanyName;
        let enteredNipt;
        let enteredOwnersFirstname;
        let enteredOwnersLastname;

        if (isLogin) {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApXQpGHehRPKBP99n-V0UkrsSXQyiEds0';
            enteredCompanyName = null;
            enteredNipt = null;
            enteredOwnersFirstname = null;
            enteredOwnersLastname = null;
        } else {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApXQpGHehRPKBP99n-V0UkrsSXQyiEds0';
            enteredCompanyName = companyNameInputRef.current.value;
            enteredNipt = niptInputRef.current.value;
            enteredOwnersFirstname = oFirstnameInputRef.current.value;
            enteredOwnersLastname = oLastnameInputRef.current.value;
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = 'Authentication failed!';
                        throw new Error(errorMessage);
                    });
                }
            })
            .then((data) => {
                authCtx.setCompanyID(data.localId);
                const expirationTime = new Date(
                    new Date().getTime() + +data.expiresIn * 1000
                );
                authCtx.login(data.idToken, expirationTime.toISOString());
                if (isLogin) {
                    verifyUsertypeOnLogin(data.localId);
                } else {
                    addCompany(data.localId);
                    history.replace('/company-offers');
                }
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Forma e identifikimit' : 'Forma e regjistrimit'}</h1>
            <form onSubmit={submitHandler}>
                {!isLogin && <div className={classes.control}>
                    <label htmlFor='companyName'>Emri i kompanisë</label>
                    <input
                        type='text'
                        id='companyName'
                        required
                        ref={companyNameInputRef}
                    />
                </div>}
                {!isLogin && <div className={classes.control}>
                    <label htmlFor='NIPT'>NIPT i kompanisë</label>
                    <input
                        type='text'
                        id='nipt'
                        required
                        ref={niptInputRef}
                    />
                </div>}
                {!isLogin && <div className={classes.control}>
                    <label htmlFor='companyName'>Emri i pronarit</label>
                    <input
                        type='text'
                        id='oFirstname'
                        required
                        ref={oFirstnameInputRef}
                    />
                </div>}
                {!isLogin && <div className={classes.control}>
                    <label htmlFor='companyName'>Mbiemri i pronarit</label>
                    <input
                        type='text'
                        id='oLastname'
                        required
                        ref={oLastnameInputRef}
                    />
                </div>}
                <div className={classes.control}>
                    <label htmlFor='email'>Email i kompanisë</label>
                    <input
                        type='email'
                        id='email'
                        required
                        ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Fjalëkalimi</label>
                    <input
                        type='password'
                        id='password'
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>{isLogin ? 'Identifikohuni' : 'Krijoni një profil'}</button>
                    )}
                    {isLoading && <p>Të dhënat po dërgohen në server...</p>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Krijoni një profil' : 'Identifikohuni me një profil ekzistues'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthFormBusiness;
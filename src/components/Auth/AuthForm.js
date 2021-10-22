import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import constants from '../../constants';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const firstnameInputRef = useRef();
    const lastnameInputRef = useRef();
    const noIdInputRef = useRef();

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

        const addUser = async (localId) => {
            await setDoc(doc(db, "users", localId), {
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
                firstname: enteredFirstName,
                lastname: enteredLastName,
                idNumber: enteredNoId,
                userRole: constants.jobSeeker,
            });
            authCtx.userRole(constants.jobSeeker);
            localStorage.setItem('userRole', constants.jobSeeker);
        }

        const verifyUsertypeOnLogin = async (localId) => {
            const docRef = doc(db, "users", localId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                authCtx.userRole(docSnap.data().userRole)
                history.replace('/myapplications');
            }
            else {
                authCtx.logout();
                alert("Login failed!");
            }
        }
        // optional: Add validation

        setIsLoading(true);
        let url;
        let enteredFirstName;
        let enteredLastName;
        let enteredNoId;
        if (isLogin) {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApXQpGHehRPKBP99n-V0UkrsSXQyiEds0';
            enteredFirstName = null;
            enteredLastName = null;
            enteredNoId = null;
        } else {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApXQpGHehRPKBP99n-V0UkrsSXQyiEds0';
            enteredFirstName = firstnameInputRef.current.value;
            enteredLastName = lastnameInputRef.current.value;
            enteredNoId = noIdInputRef.current.value;
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
                authCtx.setUserID(data.localId);
                const expirationTime = new Date(
                    new Date().getTime() + +data.expiresIn * 1000
                );
                authCtx.login(data.idToken, expirationTime.toISOString());
                if (isLogin) {
                    verifyUsertypeOnLogin(data.localId);
                } else {
                    addUser(data.localId);
                    history.replace('/myapplications');
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
                    <label htmlFor='email'>Emri juaj</label>
                    <input
                        type='firstname'
                        id='firstname'
                        required
                        ref={firstnameInputRef} />
                </div>}
                {!isLogin && <div className={classes.control}>
                    <label htmlFor='email'>Mbiemri juaj</label>
                    <input
                        type='lastname'
                        id='lastname'
                        required
                        ref={lastnameInputRef} />
                </div>}
                {!isLogin && <div className={classes.control}>
                    <label htmlFor='email'>Numri personal (ID)</label>
                    <input
                        type='idNumber'
                        id='idNumber'
                        required
                        ref={noIdInputRef} />
                </div>}
                <div className={classes.control}>
                    <label htmlFor='email'>Email juaj</label>
                    <input
                        type='email'
                        id='email'
                        required
                        ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Fjalëkalimi juaj</label>
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

export default AuthForm;


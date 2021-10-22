import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import constants from '../../constants';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';


const MainNavigation = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const isUser = authCtx.isUser == constants.jobSeeker;

    let history = useHistory();
    const logoutHandler = () => {
        authCtx.logout();
        history.push('/');
    };

    return (
        <header className={classes.header}>

            {isLoggedIn && isUser && (<Link to='/myapplications'>
                <div className={classes.logo}>goFind.al</div>
            </Link>)}

            {isLoggedIn && !isUser && (<Link to='/company-offers'>
                <div className={classes.logo}>goFind.al</div>
            </Link>)}

            {!isLoggedIn && (<Link to='/'>
                <div className={classes.logo}>goFind.al</div>
            </Link>)}
            <nav>
                <ul>
                    {!isLoggedIn && (
                        <li>
                            <Link to='/auth'>Identifikohuni si Punëkërkues</Link>
                        </li>
                    )}
                    {!isLoggedIn && (
                        <li>
                            <Link to='/authB'>Identifikohuni si Punëdhënës</Link>
                        </li>
                    )}
                    {isLoggedIn && isUser && (
                        <li>
                            <Link to='/profile'>Profili im</Link>
                        </li>
                    )}
                    {isLoggedIn && isUser && (
                        <li>
                            <Link to='/mycv'>CV ime</Link>
                        </li>
                    )}
                    {isLoggedIn && isUser && (
                        <li>
                            <Link to='/myapplications'>Paneli i aplikimeve</Link>
                        </li>
                    )}
                    {isLoggedIn && !isUser && (
                        <li>
                            <Link to='/company-profile'>Profili</Link>
                        </li>
                    )}
                    {isLoggedIn && !isUser && (
                        <li>
                            <Link to='/company-offers'>Paneli i ofertave të punës</Link>
                        </li>
                    )}

                    <li>
                        <Link to='/about'>Rreth nesh!</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Na kontaktoni!</Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <button onClick={logoutHandler}>Dilni</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header >
    );
};

export default MainNavigation;
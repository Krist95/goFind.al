import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import constants from './constants';

import Layout from './components/Layout/Layout';
import AuthContext from './store/auth-context';

import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import ContactForm from './Pages/ContactForm';

import AuthForm from './components/Auth/AuthForm';
import UserProfile from './components/User/Profile/UserProfile';
import Resume from './components/User/Resume/Resume';
import MyApplications from './components/User/MyApplications';

import AuthFormBusiness from './components/Auth/AuthFormBusiness';
import CompanyJobs from './components/Business/CompanyJobs/CompanyJobs';
import CompanyProfile from './components/Business/CompanyProfile/CompanyProfile';

function App() {
  const authCtx = useContext(AuthContext);
  const isUser = authCtx.isUser == constants.jobSeeker;

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthForm />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path='/authB'>
            <AuthFormBusiness />
          </Route>
        )}
        <Route path='/profile'>
          {authCtx.isLoggedIn && isUser && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='/mycv'>
          {authCtx.isLoggedIn && isUser && <Resume />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='/myapplications'>
          {authCtx.isLoggedIn && isUser && <MyApplications />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>

        <Route path='/company-profile'>
          {authCtx.isLoggedIn && !isUser && <CompanyProfile />}
          {!authCtx.isLoggedIn && <Redirect to='/authB' />}
        </Route>
        <Route path='/company-offers'>
          {authCtx.isLoggedIn && !isUser && <CompanyJobs />}
          {!authCtx.isLoggedIn && <Redirect to='/authB' />}
        </Route>

        <Route path='/about' >
          <AboutUs />
        </Route>
        <Route path='/contact' >
          <ContactForm />
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App
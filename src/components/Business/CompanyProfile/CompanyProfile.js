import CProfileForm from '../CompanyProfile/CProfileForm';
import classes from '../../User/Profile/UserProfile.module.css';

const CompanyProfile = () => {
    return (
        <section className={classes.profile}>
            <CProfileForm />
        </section>
    );
};

export default CompanyProfile;
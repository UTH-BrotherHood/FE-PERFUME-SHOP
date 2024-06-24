import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Line from '../components/common/Line';
import SignUpForm from '../components/SignUp/SignUpForm';
import SignInForm from '../components/SignUp/SignInForm';

const TabHeader: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex justify-center gap-10 mb-6">
            <button
                className={`py-2 px-4 ${activeTab === 'signUp' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('signUp')}
            >
                Sign Up
            </button>
            <button
                className={`py-2 px-4 ${activeTab === 'signIn' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('signIn')}
            >
                Sign In
            </button>
        </div>
    );
};

const AuthPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const activeTab = location.pathname === '/sign-in' ? 'signIn' : 'signUp';

    const setActiveTab = (tab: string) => {
        navigate(tab === 'signIn' ? '/sign-in' : '/sign-up');
    };

    return (
        <div className='pb-10 px-[15rem]'>
            <p className="font-extrabold uppercase text-center text-lg ">Create a new account</p>
            <div className="py-10"><Line /></div>
            <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'signUp' && <SignUpForm />}
            {activeTab === 'signIn' && <SignInForm />}
        </div>
    );
}

export default AuthPage;

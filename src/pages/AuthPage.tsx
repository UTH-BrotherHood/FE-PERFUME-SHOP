import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Line from '../components/common/Line';
import SignUpForm from '../components/SignUp/SignUpForm';
import SignInForm from '../components/SignUp/SignInForm';
import SlideNocti from '../components/SignUp/SlideNocti';

const TabHeader: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex  gap-10 mb-6">
            <button
                className={`py-2 px-4 ${activeTab === 'signUp' ? 'border-b-2 border-primary' : ''}`}
                onClick={() => setActiveTab('signUp')}
            >
                Sign Up
            </button>
            <button
                className={`py-2 px-4 ${activeTab === 'signIn' ? 'border-b-2 border-primary' : ''}`}
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
        <div>
            <div className='pb-10 px-[15rem]'>
                <p className="font-extrabold uppercase text-center text-lg ">Create a new account</p>
                <div className='flex justify-between gap-20 w-full mt-10 text-secondary'>
                    <div className='w-1/2 text-lg'>Be The First To Find Out About All Of Our Great Deals And Specials.
                        We Will Send You Coupons So You Can Get Discounts On Our Already
                        Discounted Prices!
                    </div>
                    <div className='w-1/2 overflow-hidden'>
                        <img className='object-cover' src="https://www.harrods.com/BWStaticContent/50000/60537547-f06f-441b-99a5-44f3133b17c3_d-stories-beauty-niche-fragrances-hero.jpg" alt="placeholder" />
                    </div>
                </div>
                <div className="py-10"><Line /></div>
                <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === 'signUp' && <SignUpForm />}
                {activeTab === 'signIn' && <SignInForm />}

            </div>
            <SlideNocti />
        </div>
      
    );
}

export default AuthPage;

import React from 'react';
import Line from '../components/common/Line';
import SignUpForm from '../components/SignUp/SignUpForm';

const SignUpPage: React.FC = () => {


    return (
        <div className='pb-10'>
            <p className="font-extrabold uppercase text-center text-lg my-6">Create a new account</p>
            <div className="w-full flex gap-20">
                <div className="text-text text-sm">
                    Be The First To Find Out About All Of Our Great Deals And Specials.
                    We Will Send You Coupons So You Can Get Discounts On Our Already
                    Discounted Prices!
                </div>
                <img className="w-[500px] h-[200px]" src="https://file.hstatic.net/200000078289/article/1_8f2a18afbe1342ff92c800a17387f4d3.jpg" alt="" />
            </div>
            <div className="py-10"><Line /></div>
            <SignUpForm />

        </div>
    );
}

export default SignUpPage;

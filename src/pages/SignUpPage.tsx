import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Line from '../components/common/Line';
import Button from '../components/common/Button';
import { useAppDispatch, useAppSelector } from '../store/store';
import { clearError, selectAuthError, selectAuthStatus, userRegister } from '../store/features/authSlice';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState<{ variant: 'success' | 'warning' | 'danger', message: string } | null>(null);
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector(selectAuthStatus);
    const authError = useAppSelector(selectAuthError);

    const initialValues = {
        email: "thuyy566+125@gmail.com",
        name: "kiendeptraiso2khongaiso1",
        password: "123@Kkienaaa",
        confirmPassword: "123@Kkienaaa",
        dateOfBirth: "",
        promotionalEmails: false,
        newsletter: false,
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        name: Yup.string().required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required'),
        dateOfBirth: Yup.date().required('Required'),
    });

    const handleSignUp = (values: any) => {
        dispatch(userRegister({
            email: values.email,
            name: values.name,
            password: values.password,
            date_of_birth: values.dateOfBirth,
            confirm_password: values.confirmPassword
        }));
    };

    useEffect(() => {
        if (authStatus === "succeeded") {
            navigate('/');
        }
    }, [authStatus, navigate]);

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

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSignUp}
            >
                {({ isSubmitting, errors }) => (
                    <Form className="flex flex-col gap-8">
                        <section className="flex justify-between">
                            <div className="text-sm text-secondary w-20">Email</div>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                                className="w-[400px] border-[1px] h-[40px] border-border text-primary px-2 text-sm focus:outline-none"
                            />
                            {errors.email && <div className="text-red-500">{errors.email}</div>}
                        </section>
                        <section className="flex justify-between">
                            <div className="text-sm text-secondary w-20">Name</div>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Enter your Name"
                                className="w-[400px] border-[1px] h-[40px] border-border text-primary px-2 text-sm focus:outline-none"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500" />
                        </section>
                        <section className="flex justify-between">
                            <div className="text-sm text-secondary w-20">Password</div>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Enter your Password"
                                className="w-[400px] border-[1px] h-[40px] border-border text-primary px-2 text-sm focus:outline-none"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500" />
                        </section>
                        <section className="flex justify-between">
                            <div className="text-sm text-secondary w-20">Confirm Password</div>
                            <Field
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your Password"
                                className="w-[400px] border-[1px] h-[40px] border-border text-primary px-2 text-sm focus:outline-none"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                        </section>
                        <section className="flex justify-between">
                            <div className="text-sm text-secondary w-20">Date of Birth</div>
                            <Field
                                type="date"
                                name="dateOfBirth"
                                className="w-[400px] border-[1px] h-[40px] border-border text-primary px-2 text-sm focus:outline-none"
                            />
                            <ErrorMessage name="dateOfBirth" component="div" className="text-red-500" />
                        </section>
                        <Button content="Sign Up" type="submit" disable={isSubmitting} />

                        {alert && (
                            <div className={`alert alert-${alert.variant}`}>
                                {alert.message}
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignUpPage;

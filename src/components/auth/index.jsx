import React, {useState} from "react";
import "./auth.scss";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {withStore} from "../../state/withStore";
import {SET_IS_AUTH} from "../../state/stores/AuthStore";

export const Auth = () => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <button onClick={() => setIsVisible(true)}>Log In</button>
            <AuthFormWithStore isVisible={isVisible} setIsVisible={setIsVisible} />
        </div>
    );
}

const authForm = (props) => {

    if (!props.isVisible) return null

    const onClose = () => {
        props.setIsVisible(false);
    }

    return (
        <Formik
            initialValues={{login: '', password: ''}}
            validate={values => {
                const errors = {};
                if (!values.login) {
                    errors.login = 'Required';
                }
                if (!values.password) {
                    errors.password = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    props.dispatch(SET_IS_AUTH, {isAuth: true})
                    props.setIsVisible(false)
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <div className='auth'>
                        <div className='auth-content'>
                            <div>
                                <div>
                                    login
                                </div>
                                <Field name="login"/>
                                <ErrorMessage name="login" component="div"/>
                            </div>
                            <div>
                                <div>
                                    password
                                </div>
                                <Field name="password"/>
                                <ErrorMessage name="password" component="div"/>
                            </div>
                            <div>
                                <button className='auth-login-button' type="submit" disabled={isSubmitting}>login</button>
                            </div>
                            <div>
                                <button  className='auth-close-button' onClick={onClose}>close</button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

const AuthFormWithStore = withStore("auth", () => {})(authForm);
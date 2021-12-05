import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import firebaseConfig from '../../firebaseConfig';
import * as firebase from 'firebase/app';
import { useHistory, useLocation } from 'react-router';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import './Login.css';

firebase.initializeApp(firebaseConfig);
const Login = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const email = data.email;
        const password = data.password;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //keep user in session storage
                sessionStorage.setItem('email', userCredential.user.email);
                sessionStorage.setItem('accessToken', userCredential.user.accessToken);
        
                if(sessionStorage.getItem('email') === process.env.REACT_APP_ADMIN_EMAIL){
                    console.log('logged in as admin')
                    history.replace('/admin');
                }
                else{
                        console.log('logged in as user')
                        history.replace(from);
                }

            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                //keep user in session storage
                sessionStorage.setItem('email', result.user.email);
                sessionStorage.setItem('accessToken', credential.accessToken);
                if(sessionStorage.getItem('email') === process.env.REACT_APP_ADMIN_EMAIL){
                    history.replace('/admin');
                }
                else{
                    if(from === '/admin' || from ==='/manage'){
                        history.replace('/');
                    }
                    else{
                        history.replace(from);
                    }
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-signup-form">
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("email", { required: true })} placeholder="email" />
                        {errors.email && "email is required"}

                        <input {...register("password", { required: true })} placeholder="password" />
                        {errors.password?.type === 'required' && "password is required"}

                        <input type="submit" className="submit" />
                    </form>
                    <p><small>Don't have an account?<Link to="/signUp">Create an account</Link></small></p>
                </div>
                <div className="signup-login-with">
                    <button onClick={handleGoogleLogin} className="googleLogin"><FontAwesomeIcon icon={faGoogle} /> Continue with Google</button>
                </div>
            </div>

        </div>
    );
};

export default Login;
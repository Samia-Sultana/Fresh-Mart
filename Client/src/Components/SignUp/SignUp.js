import React from 'react';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';
import firebaseConfig from '../../firebaseConfig';
import * as firebase from 'firebase/app';
import { useHistory, useLocation } from 'react-router';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
firebase.initializeApp(firebaseConfig);

const SignUp = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const token = userCredential.user.accessToken;
                history.replace(from);
            })
            
    }

    const handleGoogleSignUp = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                history.replace(from);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    return (
        <div className="login-page">
            <div className="login-container">
            <div className="login-signup-form">
                <h3>Create an account</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("Name", { required: true })} placeholder="Name" />
                    {errors.firstName?.type === 'required' && "First name is required"}

                    <input {...register("email", { required: true })} placeholder="Email" />
                    {errors.email && "email is required"}

                    <input {...register("password", { required: true })} placeholder="Password" />
                    {errors.password?.type === 'required' && "password is required"}

                    <input {...register("confirmPass", { required: true })} placeholder="Confirm password" />
                    {errors.confirmPass && "confirm password is required"}

                    <input type="submit" className="submit" />
                </form>
                <p><small>Already have an account?<Link to="/login">Login</Link></small></p>
            </div>
            <div className="signup-login-with">
                <button onClick={handleGoogleSignUp} className="googleLogin"><FontAwesomeIcon icon={faGoogle} /> Continue with Google</button>
            </div>

            </div>
        </div>
    );
};

export default SignUp;
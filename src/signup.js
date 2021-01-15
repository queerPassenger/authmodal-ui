import React, { useRef, useState } from 'react';
import { navigate } from './utils';
import Header from './header';

const Signup = () => {
    const userNameRef = useRef();
    const passwordRef1 = useRef();
    const passwordRef2 = useRef();
    const emailIdRef = useRef();
    const [errorText, updateErrorText] = useState('');
    const onSignup = () => {
        const { current: { value: username }} = userNameRef;
        const { current: { value: password1 }} = passwordRef1;
        const { current: { value: password2 }} = passwordRef2;
        const { current: { value: emailId }} = emailIdRef;
        if(!username) {
            updateErrorText('Please fill username');
            return;
        }
        if(!password1 || !password2) {
            updateErrorText('Please fill password');
            return;
        }
        if(password1 !== password2) {
            updateErrorText("Password is not matching");
            return;
        }
        if(!emailId) {
            updateErrorText('Please fill email id');
            return;
        }
        const payload = {
            username,
            password: password1,
            emailId
        };
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const request = new Request('/signup', {
            method: 'POST', 
            body: JSON.stringify(payload),
            headers
        });
        fetch(request)
        .then(async (resp) => {
            if(resp.status === 200) 
                navigate('/home');
            else {
                try {
                    const data = await resp.json();
                    updateErrorText(data.msg? data.msg: 'Something went wrong');
                }
                catch(err) {
                    updateErrorText('Something went wrong');
                }
            }
        })
        .catch((err) => {
            updateErrorText('Something went wrong');
            console.log('Error', err);
        })
    }
    return (
        <div>
            <Header />
            <section className='sign-section'>
                <div className='sign-container'>
                    <div className='sign-sub-container'>
                        <h1>
                            Sign Up
                        </h1>
                        <div className='sign-fields-container'>
                            <div className='input-field'>
                                <label>Username</label>
                                <input type='text' autoFocus ref={userNameRef}></input>
                            </div>
                            <div className='input-field'>
                                <label>Password</label>
                                <input type='password' ref={passwordRef1}></input>
                            </div>
                            <div className='input-field'>
                                <label>Retype Password</label>
                                <input type='password' ref={passwordRef2}></input>
                            </div>
                            <div className='input-field'>
                                <label>Email Id</label>
                                <input type='text' ref={emailIdRef}></input>
                            </div>
                        </div>
                        <div className='sign-actions-container'>
                            <button onClick={onSignup}>Sign Up</button>
                            <div className='error-text'><span>{errorText}</span></div>
                            <button onClick={() => navigate('/signin')}>Sign In</button>
                        </div>
                    </div>
                </div>                           
            </section>
        </div>
    )
}
export default Signup;
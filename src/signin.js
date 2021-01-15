import React, { useRef, useState } from 'react';
import { navigate } from './utils';
import Header from './header';

const Signin = () => {
    const userNameRef = useRef();
    const passwordRef = useRef();
    const [errorText, updateErrorText] = useState('');
    const onSignin = () => {
        const { current: { value: username } } = userNameRef;
        const { current: { value: password } } = passwordRef;
        if (!username) {
            updateErrorText('Please fill username');
            return;
        }
        if (!password) {
            updateErrorText('Please fill password');
            return;
        }
        const payload = {
            username,
            password
        };
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const request = new Request('/signin', {
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
                            Sign In
                    </h1>
                        <div className='sign-fields-container'>
                            <div className='input-field'>
                                <label>Username</label>
                                <input type='text' autoFocus ref={userNameRef}></input>
                            </div>
                            <div className='input-field'>
                                <label>Password</label>
                                <input type='password' ref={passwordRef}></input>
                            </div>
                        </div>
                        <div className='sign-actions-container'>
                            <button onClick={onSignin}>Sign In</button>
                            <div className='error-text'><span>{errorText}</span></div>
                            <button  onClick={() => navigate('/signup')}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Signin;
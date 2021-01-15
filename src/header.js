import React from 'react';
import { navigate } from './utils';

const Header = (props) => {
    const onLogout = () => {
        fetch('/logout')
        .then(async (resp) => {
            if(resp.status === 200) 
                navigate('/signin');
            else {
                try {
                    const data = await resp.json();
                    alert(data.msg? data.msg: 'Something went wrong');
                }
                catch(err) {
                    alert('Something went wrong');
                }
            }
        })
        .catch(err => {
            alert('Something went wrong');
        })
    }
    const logoImg = 'https://avatars2.githubusercontent.com/u/29197735?s=400&u=ef6c2f39d34e624bd215f5f4afc5d35ae385db9c&v=4';
    return (
        <header>
            <div className='header-container'>
                <div className='logo' onClick={() => { }}>
                    <img src={logoImg} alt='logo'></img>          
                    <div className='logo-txt'>
                        <div>QueerPassenger</div>
                        <div>initiative</div>
                    </div>                                 
                </div>
                {props.auth && 
                    <div className='logout'>
                        <div onClick={onLogout}>Logout</div>
                    </div>
                }
            </div>
        </header>
    )
}
export default Header;
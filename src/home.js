import React, { useState, useEffect } from 'react';
import Header from './header';
import { navigate } from './utils';
import DataGrid from './dataGrid';
import PageSearch from './pageSearch';

const columns = ['S.no', 'Name', 'Gender', 'Place', 'DOB'];
const rows = [...Array(100)].map((x, ind) => ({
    'S.no': ind + 1 + '',
    'Name': 'User' + ind,
    'Gender': ['Male', 'Female'][ind%2],
    'Place': ['TN','KA', 'MADYA', 'ANDRA'][ind%3],
    'DOB': `${ind%30}/${ind%12}/1994`
}));

const Home = () => {
    const [userInfo, updateUserInfo] = useState({
        username: '',
        emailId: ''
    });
    const [enablePageSearch, updateEnablePageSearch] = useState(false);
    useEffect(() => {
        fetch('/userinfo')
        .then(async (resp) => {
            try {
                const data = await resp.json();
                if(resp.status === 200) 
                    updateUserInfo(data);
                
                else {                
                    alert(data.msg? data.msg: 'Something went wrong');
                    navigate('/signin');
                }
            }
            catch(err) {
                alert('Something went wrong');
                navigate('/signin');
            }
            
        })
        .catch((err) => {
            alert('Something went wrong');
            navigate('/signin');
            console.log('Error', err);
        })
    }, []);
    useEffect(() => {
        const handleSearch = (e) => {
            if(e.shiftKey && e.keyCode === 70) 
                return setTimeout(() => updateEnablePageSearch(true) , 250);
            if(e.keyCode === 27)
                return updateEnablePageSearch(false);            
        }
        window.addEventListener('keydown', handleSearch);
        return () => window.removeEventListener('keydown', handleSearch);
    }, []);
    return (
        <div>
            <Header 
                auth={true}
                user={userInfo}
            />
            <div id='search-area'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                />
            </div>            
            <div className='footer'>
                {enablePageSearch && <PageSearch />}
            </div>
        </div>
    )
}
export default Home;
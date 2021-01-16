import React, { useState, useEffect } from 'react';
import Header from './header';
import { navigate, exportCSVFile } from './utils';
import DataGrid from './dataGrid';
import PageSearch from './pageSearch';
import Readme from './readme';
import { rows, columns, uniqueValues } from './mock';
import Search from './search';

const Home = () => {
    const [userInfo, updateUserInfo] = useState({
        username: '',
        emailId: ''
    });
    const [filteredRows, updateFilteredRows] = useState([]);
    const [searchParams, updateSearchParams] = useState({});
    const [enablePageSearch, updateEnablePageSearch] = useState(false);
    useEffect(() => {
        fetch('/userinfo')
        .then(async (resp) => {
            try {
                const data = await resp.json();
                if(resp.status === 200) 
                    updateUserInfo(data);
                
                else 
                    onAuthFailure(data.msg);
            }
            catch(err) {
                onAuthFailure();
            }
            
        })
        .catch((err) => {
            onAuthFailure()
            console.log('Error', err);
        })
    }, []);
    useEffect(() => {
        updateFilteredRows(            
            rows.filter(x => {
                let count = 0;
                for(let param in searchParams) {
                    if(x[param].indexOf(searchParams[param]) !== -1)
                        count ++;                    
                    else
                        break;
                }
                if(count === Object.keys(searchParams).length)
                    return true;
                else
                    return false;
            })
        );
    }, [searchParams]);
    const onAuthFailure = (msg = 'Something went wrong') => {
        alert(msg);
        navigate('/signin');
    }
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
                <Readme />
                <Search 
                    columns={columns}
                    uniqueValues={uniqueValues}
                    updateSearchParams={(params) => updateSearchParams(params)}
                />
                <div className='export'>
                    <span onClick={() => exportCSVFile(columns, filteredRows, 'Export')}>Export</span>
                </div>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                />
                <div className='grid-count'>
                    <div>{`Filtered Data Count: ${filteredRows.length}`}</div>
                    <div>{`Total Data Count     : ${rows.length}`}</div>
                </div>
            </div>            
            <div className='footer'>
                {enablePageSearch && <PageSearch />}
            </div>
        </div>
    )
}
export default Home;
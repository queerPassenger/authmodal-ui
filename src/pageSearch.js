import React, { useEffect, useRef } from 'react';

const PageSearch = () => {
    const pageSearchInput = useRef();
    let prevText = '';
    useEffect(() => {
        return () => {
            dehighlight(prevText);
        }
    }, []);
    const dehighlight = (selectedText) => {
        const text = selectedText.trim();
        if(text === '')
            return;
        document.getElementById('search-area').innerHTML = document.getElementById('search-area').innerHTML.replace(
            new RegExp( '<mark>' + text + '</mark>', 'g'),
            text
        );
        prevText = '';
    }
    const highlight = (selectedText) => {
        dehighlight(prevText);
        const text = selectedText.trim();
            if(text === '')
                return;        
        document.getElementById('search-area').innerHTML = document.getElementById('search-area').innerHTML.replace(
            new RegExp(text, 'g'),
            '<mark>' + text + '</mark>'
        );
        prevText = text;
    }
    const onKeyDown = (e) => {
        if(e.keyCode === 13) {
            onSearch();
        }
    }
    const onSearch = () => {
        const { current: { value }} = pageSearchInput;
        highlight(value);
    }
    const onClear = () => {
        pageSearchInput.current.value = '';
        dehighlight(prevText);
    }
    return (
        <div className='pageSearch'>
            <input
                ref={pageSearchInput} 
                autoFocus={true}
                onKeyDown={onKeyDown}
            />
            <div className='action-text'>
                <span onClick={onClear}>Clear</span>
                <span onClick={onSearch}>Search</span>
            </div>
        </div>        
    )
}
export default PageSearch;
import React, { forwardRef, useRef, createRef, useState, useEffect } from 'react';

const Search = ({
    columns,
    uniqueValues,
    updateSearchParams
}) => {
    const inputsRef = useRef(columns.map(() => createRef()));
    const onSearch = () => {
        const searchParam = {};
        inputsRef.current.map((x,ind) => {
            const value = x.current.value.trim();
            if(value !== ''){
                searchParam[columns[ind]] = value;
            }
        });
        updateSearchParams(searchParam);
    }
    const onClear = () => {
        inputsRef.current.map(x => x.current.value = '');
        updateSearchParams({});
    }
    return (
        <div className='search'>
            <h2>Search</h2>
            <div className='search-container'>
                {columns.map((x, ind) => {
                    return (
                        <TypeAhead
                            key= {'typeAhead' + ind}
                            ref={inputsRef.current[ind]}
                            column={x}
                            list={uniqueValues[ind]}
                        />
                    )
                })}
            </div>
            <div className='action-container'>
                <button onClick={onSearch}>Search</button>
                <button onClick={onClear}>Clear</button>
            </div>
        </div>
    )
}
const TypeAhead = forwardRef((props, ref) => {
    const [showSuggestions, updateShowSuggestions] = useState(false);
    const [value, updateValue] = useState('');
    const [selectedInd, updatedSelectedInd] = useState(-1);
    useEffect(() => {
        if(selectedInd >= 0) 
            document.getElementById('drop-down-item' + selectedInd) && document.getElementById('drop-down-item' + selectedInd).scrollIntoView(false);
        
    }, [selectedInd]);
    const reset = () => {
        updateValue('');
        updateShowSuggestions(false);
        updatedSelectedInd(-1);    
    }
    const dropDownList = showSuggestions && value !== ''? props.list.filter(x => x.indexOf(value)!== -1): [];
    //const dropDownList = props.list;
    return (
        <div
            className='search-input-container'
        >
            <div className='search-input'>
                <input
                    ref={ref}
                    onChange={(e) => {
                        const { target: { value: _value }} = e;
                        updateValue(_value);
                        updateShowSuggestions(true);
                        updatedSelectedInd(-1);
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode === 38) {
                            if(selectedInd - 1 >= 0) 
                                updatedSelectedInd(selectedInd - 1);
                        }
                        if(e.keyCode === 40) {
                            if(selectedInd + 1 <= dropDownList.length - 1) 
                                updatedSelectedInd(selectedInd + 1);
                        }
                        if(e.keyCode === 13) {
                            ref.current.value = dropDownList[selectedInd];
                            reset();
                        }
                    }}
                    onBlur={() => setTimeout(reset, 500)}
                    placeholder={`Search for ${props.column}`}
                ></input>
                {dropDownList &&
                    <div className='drop-down-container'>
                        {dropDownList.map((item, ind) => {
                            return (
                                <div
                                    key={'item' + ind}
                                    id={'drop-down-item' + ind}
                                    className={`${ind === selectedInd ? 'selected': ''} `}                                    
                                    onClick={() => {
                                        ref.current.value = item;
                                        reset();
                                    }}
                                >
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                }
                </div>            
        </div>
    )    
});
export default Search;
import React from 'react';

const Readme = () => (
    <div className='readme'>
        <h2>Introduction</h2>
        A data grid is displayed below.
        The data grid you see here is not conventional table formed using the
        html table tag but build customly using div tags.
        You can filter the data in the grid using
        the typeahead search inputs available for each columns.
        The inputs are typeahead. You can select the values from the list.
        After selecting the filter text please click on search button and if you
        want to clear the filter params , please click on Clear button.
        If you click the search and click button the grid will be filtered.
        If you need to search the body of the webpage as a whole,
        you can try pressing "Shift + F".
        On key press "Shift + F" you will be able to see a search box at the bottom
        You can remove the search box from the view using "Escape" key press.
        After entering the search text , try pressing "Enter" or click on the search
        link in the search box.
        Additionally you have the "Clear" link to clear the search text.
        The highlighted text will appear in Yellow.
        This search is not a fool proof system. It will not work correctly if your
        searched text matches with html tag names, attribute name or attribute values.
        Apart from the edge case you can expect a good performance for most scenarios.
        If you have any queries, you know where to reach me.
    </div>
)
export default Readme;
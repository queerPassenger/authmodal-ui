const columns = ['S.no', 'Name', 'Gender', 'Place', 'DOB'];
let uniqueValues = [
    [],//dynamic set 
    [],//dynamic set
    ['Male', 'Female', 'Trans'],
    ['Tamil Nadu','Karntaka', 'Madhya Pradesh', 'Andhra Pradesh', 'Kerala', 'Rajasthan'],
    []//dynamic
]
const rows = [...Array(100)].map((x, ind) => {
    const first = ind + 1 + '';
    const second = 'User' + ind;
    const last = `${ind%30}/${ind%12}/1994`;
    uniqueValues[0].push(first);
    uniqueValues[1].push(second);
    uniqueValues[4].push(last);
    return {
        'S.no': first,
        'Name': second,
        'Gender': uniqueValues[2][ind%uniqueValues[2].length],
        'Place': uniqueValues[3][ind%uniqueValues[3].length],
        'DOB': last
    }
});

module.exports = {
    columns,
    rows,
    uniqueValues
}
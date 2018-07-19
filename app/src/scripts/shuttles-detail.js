import React from 'react';
//import store from '../redux-store';

const ShuttleDetail = ()=>{
    return (
    <div className={'user-center'}>
        <a onClick={()=>{window.history.back();}}>&lt; Go Back</a>
        <div>This is line detail page  </div>
    </div>
)}

export default ShuttleDetail;
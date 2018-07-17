import React from 'react';
import {Link} from 'react-router-dom';

const UserCenter = ()=>{
    
    return (
    <div className={'user-center'}>
        {/* <a onClick={()=>{window.history.back();}}>&lt; Go Back</a> */}
        <Link to="/">&lt; Go Back</Link>
        <div>This is user center</div>
    </div>
)}

export default UserCenter;
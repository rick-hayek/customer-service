import React, { Component } from 'react';

const UserCenter = ()=>{
    
    return (
    <div className={'user-center'}>
        <a onClick={()=>{window.history.back();}}>&lt;Go Back</a>
        <div>This is user center</div>
    </div>
)}

export default UserCenter;
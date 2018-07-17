import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ButtonLink = (props)=> {
    const {title,  btnId, linkId, to, text, ...rest} = props;

    return (
        <Button 
            title={ title } 
            // key={ key } 
            id={ btnId }
            onClick={(e)=>{
                try {
                    document.getElementById(linkId).click();
                }
                catch(err){}
            }}>
            <Link id={linkId} to={to} onClick={(e)=>{e.stopPropagation();}} tabIndex={-1}>{ text }</Link>
        </Button>
    );

}

export default ButtonLink;
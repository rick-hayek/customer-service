
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Image } from 'react-bootstrap';
//import PropTypes from 'prop-types';
// import '../style/chat-history.css';
import {CommondType, MessageOwner, MessageType} from '../../../models/enums'; 
import userIcon from '../../../img/user_512x512.png';
import supportIcon from '../../../img/support_512.png';

import { PreDefinedMenuResponses, PreDefinedTextResponses, DefaultTextResponse } from '../../demo-data'; //'./demo-data';

// import {connect} from 'react-redux';
// import store from '../../../redux-store'; 
// import { changeShuttle } from '../../actions'; 

import Message from '../../../models';

class MessageHistory extends Component{
    constructor(props){
        super(props);
        this.state = {
            messageCount: 0
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // Store prevUserId in state so we can compare when props change.
        // Clear out any previously-loaded user data (so we don't render stale stuff).
        if (nextProps.messages.length !== prevState.messageCount) {
          return {
            messageCount: nextProps.messages.length
          };
        }
    
        // No state update necessary
        return null;
    }
      
    componentDidUpdate(prevProps, prevState){
        if(this.props.messages !== prevProps.messages ||
          this.state.messageCount !== prevState.messageCount){
            this.handleRequest(this.props.messages);
        }
    }

    handleRequest = (messages)=>{
        if(!!messages && !!messages.length){
            var len = messages.length;
            var last = messages[len-1];
            if(last.owner === MessageOwner.client){
                var response = new Message();
                response.owner = MessageOwner.server;
                var content = undefined;
                if(last.type === CommondType.command)
                {
                    content = PreDefinedMenuResponses.find((bus, i)=>{
                        return (bus.value === last.content.value);
                    });
                }
                else if(last.type === CommondType.text){
                    content = PreDefinedTextResponses.find((s)=>{
                        return s.value === last.content.value;
                    });

                    if(content === undefined){
                        content = DefaultTextResponse;
                    }
                }

                response.content = content;

                var self = this;
                setTimeout(function(){
                    try{
                        messages.push(response);
                        len++;
                        self.setState({
                            messageCount: len
                        });
                    }
                    catch(err){ }
                }, 1000);
            }

            this.setState({
                messageCount: len
            });

            var history = document.getElementById('chatBoard');
            history.scrollTop = history.scrollHeight;
        }
    };

    render(){
        var msgs = this.props.messages && 
            this.props.messages.map((msg, i)=> {
                let isResponseMsg = msg.owner === MessageOwner.server;

                let containerClass = 'message-container-request',
                    contentClass = 'message-request',
                    icon = userIcon,
                    classSenderContainer = 'message-sender-request',
                    titleClass = undefined,
                    divider = undefined,
                    readmore = undefined,
                    gotoDetails = undefined;

                if(isResponseMsg){
                    containerClass = 'message-container-response';
                    contentClass = 'message-response';
                    icon = supportIcon;
                    classSenderContainer =  undefined;
                    titleClass ='message-response-title';                    
                }

                let sender = (
                    <div className={classSenderContainer}>
                        <Image className='message-sender' src={icon} />
                    </div>);

                let title = msg.content.title // response
                         || msg.content.value, // request
                    thumb = undefined, 
                    brief = msg.content.detail;

                if(isResponseMsg){
                    if(msg.content.id === 0){
                        var services = msg.content.list && msg.content.list.map((s,si)=>(<li key={si}>{s.value} {s.detail}</li>));
                        brief = (<ul>{services}</ul>);
                    }

                    if(msg.content.type === MessageType.list){
                        brief = (<Link to={msg.content.link}> {msg.content.detail}</Link>);
                    }

                    if(msg.content.type === MessageType.thumb)
                    {
                        let busId = '___moreDetailsPage'+msg.content.id;
                        sender = undefined;     
                        contentClass = 'message-response-thumb clickable';
                        thumb = (<Image src={msg.content.thumbImg} />);
                        divider = (<hr />);
                        readmore = 
                            (<div>
                                <Link id={busId} onClick={(e)=>{e.stopPropagation();}} to={msg.content.pageUrl} >Read More <i className="readmore arrow-right"></i></Link>
                            </div>);
                        gotoDetails = ()=>{
                            document.getElementById(busId).click();
                        };
                    }
                }

                return (
                    <li key={msg.owner+i} >
                        <div className={containerClass}>
                            {sender}
                            <div className={`message-content ${contentClass}`} onClick={gotoDetails}>
                                <div className={titleClass}>{title}</div>
                                <div>{thumb} </div>
                                <div>{brief}</div>
                                {divider}
                                {readmore}
                            </div>
                        </div>
                    </li>
                );
            });

        return(
            <ul >{msgs}</ul>
        );
    }
}

export default MessageHistory;
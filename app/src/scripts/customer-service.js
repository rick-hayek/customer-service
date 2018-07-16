import React, {Component} from 'react';
import { Button, DropdownButton, MenuItem, ButtonToolbar, Image } from 'react-bootstrap';
//import Clock from './clock';
import PropTypes from 'prop-types';
import '../style/chat-history.css';
import {CommondType, MessageOwner, RequestType, MenuType} from './enums'

import keyboardImg from '../img/keyboard_grey_192x192.png';
import cmdImg from '../img/mobile_menu_icon_256x256.png';
import userIcon from '../img/user_512x512.png';
import logo from '../img/support_512.png';

import { ShuttleBuses, MainMenus, PreDefinedMenuResponses, PreDefinedTextResponses, DefaultTextResponse } from './demo-data';

function Message(){
    this.type = CommondType.text; 
    this.owner = MessageOwner.client;
    this.content = undefined; // shuttle bus object
    this.timeStamp = Date.now();
}

export default class ServiceBoard extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            requestType: RequestType.command,
            cmdImg: keyboardImg, 
        };
    }

    sendRequest(req, type){
        var msg = new Message();
        msg.type = type;
        msg.owner = MessageOwner.client;
        if(type === CommondType.text){
            // if(req === '2'){ ====> Should handle this in response
            //     this.sendRequest(ShuttleBuses[7], CommondType.command);
            //     return;
            // }
            // else{
                msg.content = {};
                msg.content.value = req;
            // }
        }
        else{
            msg.content = req;
        }

        var msgs = this.state.messages || [];
        
        msgs.push(msg);
        
        this.setState({
            messages: msgs
        });
    }

    switchCommand(){
        let currentType = this.state.requestType;
        let newType = currentType === RequestType.command ? RequestType.text : RequestType.command;
        let newImg = currentType === RequestType.command ? cmdImg: keyboardImg;
        this.setState({
            requestType: newType,
            cmdImg: newImg
        });
    }

    render(){
        return(
        <div className="chat-container">
            <div className="chat-history" id='chatBoard'>
                {/* <Clock /> */}
                <ServiceResponse messages = {this.state.messages} />
            </div>

            <div className="request-container">
                    <div style={{float:'left'}}>
                        <Image src={this.state.cmdImg} style={{width:30, height:30, cursor: 'pointer'}} onClick={this.switchCommand.bind(this)} />
                    </div>

                    <TextCommand onRequestSent={this.sendRequest.bind(this)} show={this.state.requestType === RequestType.text } />

                    <MenuCommand onRequestSent = {this.sendRequest.bind(this)} sender = {MainMenus} show={this.state.requestType === RequestType.command } />
            </div>
        </div>
        );
    }
}

class ServiceResponse extends Component{
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
                    messages.push(response);
                    len++;
                    self.setState({
                        messageCount: len
                    });
                }, 2000);
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
                    details,
                    classSenderContainer = 'message-sender-request';
                    
                if(isResponseMsg){
                    classSenderContainer = undefined
                    containerClass = 'message-container-response';
                    contentClass = 'message-response';
                    icon = logo;
                    if(msg.content.id === 0){
                        var services = msg.content.list && msg.content.list.map((s,si)=>(<li key={si}>{s.value} {s.detail}</li>));
                        details = (<ul>{services}</ul>);
                    }
                    else {
                        details = ': ' + msg.content.detail;
                    }

                    if(!!msg.content.link){
                        details = (<text>: <a href={msg.content.link}> {msg.content.detail}</a> </text> );
                    }
                }

                return (
                    <li key={msg.owner+i} >
                        <div className={containerClass}>
                            <div className={classSenderContainer}>
                                <Image className='message-sender' src={icon} />
                            </div>
                            <div className={`message-content ${contentClass}`}>
                                {msg.content.value} 
                                {details}
                            </div>

                            <div>
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

class TextCommand extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: props.show,
            message: undefined
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.show !== prevState.show){
            this.setState({
                show: this.props.show
            });

            if(this.props.show === true) {
                setTimeout(function(){ document.getElementById('__userRequestTextContent').focus();}, 200);
            }
        }
    }

    setMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    keyboardHanlder(e){
        if(e.which === 13 || e.keyCode === 13){
            this.sendRequest();
        }
    }

    sendRequest(e) {
        if(!!this.state.message){
            this.props.onRequestSent(this.state.message, CommondType.text);
            
            // Clear text
            document.getElementById('__userRequestTextContent').value = '';
            this.setState({
                message: undefined
            });
        }
    }

    render(){
        return (
            <div className="text-command" style={{display: this.state.show ? 'block' : 'none'}}>
                <input className="text-content" id='__userRequestTextContent' type="text" onChange = {this.setMessage.bind(this)} onKeyDown={this.keyboardHanlder.bind(this)} placeholder="Say something" />
                <input className="text-submit" type="button" value="Send" onClick={this.sendRequest.bind(this)} />
            </div>
        );
    }
}

class MenuCommand extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: props.show
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.show !== prevState.show){
            this.setState({
                show: this.props.show
            });
        }
    }

    sendRequest(req){
        this.props.onRequestSent(req, CommondType.command);
    }

    render(){ 
        var menus = undefined;
        if(!!this.props.sender){
            menus = this.props.sender.map((m, i)=> {
                var items = undefined;
                if(!!m.value && m.type === MenuType.menu)
                {
                    items = m.value.map((cmd, k)=> { 
                        return cmd.isDivider
                            ? <MenuItem key={cmd.id} divider />
                            : <MenuItem key={cmd.id} onSelect={this.sendRequest.bind(this, cmd)} eventKey={cmd.id}>{cmd.value}</MenuItem>;
                    });
                }

                return m.type === MenuType.link
                ? (<div key={'aaa'} className="plain-button">
                    <Button 
                        title={m.name} 
                        key={m.name+i} 
                        id={m.name+i} 
                        onClick={()=>{window.location=m.value;}}>
                            {m.name}
                    </Button>
                </div>)
                : (
                    <DropdownButton
                        bsStyle='default'
                        title={m.name}
                        key={m.name+i}
                        id={m.name+i}
                        dropup={true}
                        // noCaret={!m.value}
                    >
                        {items}
                    </DropdownButton>
                );
            });
        }

        return (
            <ButtonToolbar className="menu-command" style={{display: this.state.show ? 'inline-flex' : 'none'}}>
                {menus}
            </ButtonToolbar>
        );
    }
}

MenuCommand.propTypes = {
    onRequestSent: PropTypes.func,
    sender: PropTypes.arrayOf(PropTypes.object)
}

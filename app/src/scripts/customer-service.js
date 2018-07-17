import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button, DropdownButton, MenuItem, ButtonToolbar, Image } from 'react-bootstrap';
//import Clock from './clock';
import PropTypes from 'prop-types';
import '../style/chat-history.css';
import {CommondType, MessageOwner, MenuType, MessageType} from '../models/enums'

import keyboardImg from '../img/keyboard_grey_192x192.png';
import cmdImg from '../img/mobile_menu_icon_256x256.png';
import userIcon from '../img/user_512x512.png';
import supportIcon from '../img/support_512.png';

import { MainMenus, PreDefinedMenuResponses, PreDefinedTextResponses, DefaultTextResponse } from './demo-data';

import ButtonLink from './components/button-as-link';

//import {Message} from '../models/models';

// export const Message = (type, owner)=>{
//     type: type;// || CommondType.text;
//     owner: owner;// || MessageOwner.client;
//     content: undefined;
//     timeStamp: Date.now();
// }

function Message(){
    this.type = CommondType.text; 
    this.owner = MessageOwner.client;
    this.content = undefined;
    this.timeStamp = Date.now();
}

export default class ServiceBoard extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            cmdType: CommondType.command,
            cmdImg: keyboardImg, 
        };
    }

    sendRequest(req, type){
        // var msg = new Message(type, MessageOwner.client);
        var msg = new Message();
        msg.type = type;
        msg.owner = MessageOwner.client;
        if(type === CommondType.text){
            // if(req === '2'){ ====> Should handle this in response
            //     this.sendRequest(MenuItems[7], CommondType.command);
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
        let currentType = this.state.cmdType;
        let newType = currentType === CommondType.command ? CommondType.text : CommondType.command;
        let newImg = currentType === CommondType.command ? cmdImg: keyboardImg;
        this.setState({
            cmdType: newType,
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
                    <div className="input-method">
                        <Image src={this.state.cmdImg} style={{width:30, height:30, cursor: 'pointer'}} onClick={this.switchCommand.bind(this)} />
                    </div>

                    <TextCommand onRequestSent={this.sendRequest.bind(this)} show={this.state.cmdType === CommondType.text } />

                    <MenuCommand onRequestSent = {this.sendRequest.bind(this)} sender = {MainMenus} show={this.state.cmdType === CommondType.command } />
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

                    if(!!msg.content.link){
                        brief = (<Link to={msg.content.link}> {msg.content.detail}</Link>);
                    }

                    if(msg.content.type === MessageType.thumb)
                    {
                        sender = undefined;     
                        contentClass = 'message-response-thumb clickable';
                        thumb = (<Image src={msg.content.thumbImg} />);
                        divider = (<hr />);
                        readmore = 
                            (<div>
                                <Link id={'___moreDetailsPage'+msg.content.id} onClick={(e)=>{e.stopPropagation();}} to={msg.content.pageUrl} >Read More <i className="readmore arrow-right"></i></Link>
                            </div>);
                        gotoDetails = ()=>{
                            document.getElementById('___moreDetailsPage'+msg.content.id).click();
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
                    <ButtonLink 
                        title={m.name} 
                        //key={m.name+i} 
                        btnId={m.name+i}
                        linkId={'toUser'}
                        to={m.value}
                        text={m.name} />
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

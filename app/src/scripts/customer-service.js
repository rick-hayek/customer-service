import React, { Component } from 'react';
import { Button, DropdownButton, MenuItem, ButtonToolbar, Image } from 'react-bootstrap';
//import Clock from './clock';
import PropTypes from 'prop-types';
import '../style/chat-history.css';
import {MessageType, MessageOwner, RequestType} from './enums'

import keyboardImg from '../img/keyboard_grey_192x192.png';
import cmdImg from '../img/mobile_menu_icon_256x256.png';
import userIcon from '../img/user_512x512.png';
import logo from '../img/support_512.png';

// Sample data
const ShuttleBuses=[
    { id: 1, value: '张江线' },
    { id: 2, value: '辛庄线' },
    { id: 3, value: '徐汇线', extra: '1' },
    { id: 4, value: '徐汇线', extra: '2' },
    { id: 5, value: '杨浦线' },
    { id: 6, value: '宝山线' },
    { id: 0, value: 'divider', isDivider: true },
    { id: 99, value: 'All Lines' }
];

const MainMenus = [
    { id:1, name:'我的班车', type:1, items: [{id: 2, value: '辛庄线'}] }, 
    { id:2, name:'班车线路', type:1, items: ShuttleBuses }, 
    { id:3, name:'个人中心', type:0 }
];

const ShuttleBusesDetail=[
    { id: 1, value: '张江线', detail: '闵行 浦江 张江' },
    { id: 2, value: '辛庄线', detail: '闵行 莲花路 辛庄' },
    { id: 3, value: '徐汇线', extra: '1', detail: '闵行 上海南站 徐家汇' },
    { id: 4, value: '徐汇线', extra: '2', detail: '闵行 上海南站 宜山路' },
    { id: 5, value: '杨浦线', detail: '闵行 杨浦' },
    { id: 6, value: '宝山线', detail: '闵行 宝山' },
    { id: 99, value: 'All Lines', detail: 'All' }
];

const PreDefinedResponses = [
    { id: 1, value: '1', detail: '公告', link: '' },
    { id: 2, value: '2', detail: '班车信息', link: '' },
    { id: 3, value: '3', detail: '乘车指南', link: '' },
    { id: 4, value: '4', detail: '帮助', link: '' },
    { id: 5, value: '5', detail: '失物找回', link: '' },
];

const DefaultResponse = {
    id: 0, 
    value: 'Available Services', 
    list: [
        {id: 1, value: '1.', detail: '公告'},
        {id: 2, value: '2.', detail: '班车信息'},
        {id: 3, value: '3.', detail: '乘车指南'},
        {id: 4, value: '4.', detail: '帮助'},
        {id: 5, value: '5.', detail: '失物找回'},
    ]
};

function Message(){
    this.type = MessageType.text; 
    this.owner = MessageOwner.client;
    this.content = undefined; // shuttle bus object
    this.timeStamp = Date.now();
}

export default class ServiceBoard extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages:[],
            requestType: RequestType.command,
            cmdImg: keyboardImg, 
        };
    }

    sendRequest(req, type){
        var msg = new Message();
        msg.type = type;
        msg.owner = MessageOwner.client;
        if(type === MessageType.text){
            msg.content = {};
            msg.content.value = req;
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
                if(last.type === MessageType.command)
                {
                    content = ShuttleBusesDetail.find((bus, i)=>{
                        return (bus.value === last.content.value) && (bus.extra === last.content.extra);
                    });
                }
                else if(last.type === MessageType.text){
                    content = PreDefinedResponses.find((s)=>{
                        return s.value === last.content.value;
                    });

                    if(content === undefined){
                        content = DefaultResponse;
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
                }

                return (
                    <li key={msg.owner+i} >
                        <div className={containerClass}>
                            <div className={classSenderContainer}>
                                <Image className='message-sender' src={icon} />
                            </div>
                            <div className={`message-content ${contentClass}`}>
                                {msg.content.value} 
                                {msg.content.extra} 
                                {details}
                            </div>

                            <div>
                            </div>
                        </div>
                    </li>
                );
            });

        return(
            // <div style={{position: 'absolute', bottom: 0}} >{msgs}</div>
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
            this.props.onRequestSent(this.state.message, MessageType.text);
            
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
        this.props.onRequestSent(req, MessageType.command);
    }

    render(){ 
        var menus = undefined;
        if(!!this.props.sender){
            menus = this.props.sender.map((m, i)=> {
                var items = undefined;
                if(!!m.items)
                {
                    items = m.items.map((cmd, k)=> { 
                        return cmd.isDivider
                            ? <MenuItem key={cmd.id} divider />
                            : <MenuItem key={cmd.id} onSelect={this.sendRequest.bind(this, cmd)} eventKey={cmd.id}>{cmd.value} {cmd.extra}</MenuItem>;
                    });
                }

                return m.type === 0 || !m.items
                ? (<div key={'aaa'} className="plain-button"><Button title={m.name} key={m.name+i} id={m.name+i}>{m.name}</Button></div>)
                : (
                    <DropdownButton
                        bsStyle='default'
                        title={m.name}
                        key={m.name+i}
                        id={m.name+i}
                        dropup={true}
                        // noCaret={!m.items}
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

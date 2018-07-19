import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import { Image } from 'react-bootstrap';
//import PropTypes from 'prop-types';
import '../style/chat-history.css';
import {CommondType, MessageOwner} from '../models/enums'

import keyboardImg from '../img/keyboard_grey_192x192.png';
import cmdImg from '../img/mobile_menu_icon_256x256.png';


import { MainMenus } from './demo-data';

import TextCommand from './components/views/command-text';
import MenuCommand from './components/views/command-menu';
import MessageHistory from './components/views/message-history';

import {connect} from 'react-redux';
import store from '../redux-store';
import { addMessage } from './actions';
import Message from '../models';

class ServiceBoard extends Component{
    constructor(props){
        super(props);
        this.state = {
            cmdType: CommondType.command,
            cmdImg: keyboardImg, 
            listener: undefined
        };

        this.props.history.listen((location, action) => {
            try {
                if(location.pathname === '/'){
                    var history = document.getElementById('chatBoard');
                    history.scrollTop = history.scrollHeight;
                }
                //console.log(`current url: ${location.pathname}`);
            }
            catch(err) { }
          });
    }

    sendRequest(req, type){
        // var msg = new Message(type, MessageOwner.client);
        var msg = new Message();
        msg.type = type;
        msg.owner = MessageOwner.client;
        if(type === CommondType.text){
            msg.content = {};
            msg.content.value = req;
        }
        else{
            msg.content = req;
        }

        store.dispatch(addMessage(msg));
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
        console.log(this.props.messages);
        return(
        <div className="chat-container">
            <div className="chat-history" id='chatBoard'>
                <MessageHistory messages = {this.props.messages} />
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

const mapStateToProps = store => {
    return {
        messages: store.messages
    };
};

export default connect(mapStateToProps)(ServiceBoard);
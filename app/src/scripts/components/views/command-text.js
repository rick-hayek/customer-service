import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import '../../../style/chat-history.css';
import { CommondType } from '../../../models/enums'; 

export default class TextCommand extends Component{
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

TextCommand.propTypes = {
    onRequestSent: PropTypes.func,
    show: PropTypes.bool
}
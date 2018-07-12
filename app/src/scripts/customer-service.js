import React, { Component } from 'react';

import { Button, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
//import Clock from './clock';
import PropTypes from 'prop-types';

// Sample data
const ShuttleBuses=[
    { id: 1, name: '张江线' },
    { id: 2, name: '辛庄线' },
    { id: 3, name: '徐汇线', extra: '1' },
    { id: 4, name: '徐汇线', extra: '2' },
    { id: 5, name: '杨浦线' },
    { id: 6, name: '宝山线' },
    { id: 0, name: 'divider', isDivider: true },
    { id: 99, name: 'All Lines' }
];

const MainMenus = [
    { id:1, name:'我的班车', type:1, items: [{id: 2, name: '辛庄线'}] }, 
    { id:2, name:'班车线路', type:1, items: ShuttleBuses }, 
    { id:3, name:'个人中心', type:0 }
];

function Message(){
    this.owner = undefined;
    this.content = undefined;
}


export default class ServiceBoard extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages:[]
        };
    }

    sendRequest(req, e){
        var msg = new Message();
        msg.owner = 'client';
        msg.content = req;

        var msgs = this.state.messages || [];
        
        msgs.push(msg);
        
        this.setState({
            messages: msgs
        });
    }

    render(){
        return(
        <div>
            <div className="chat-board" id='board'>
                {/* <Clock /> */}
                <ServiceResponse messages = {this.state.messages} />
            </div>

            <div className="menu-container">
                <div>
                    <input type="text" style={{display: 'none'}} />
                </div>

                <div className="menu-bar">
                    <CustomerRequest onRequestSent = {this.sendRequest.bind(this)} sender = {MainMenus} />
                </div>
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
    
    // componentDidMount(){
    //     // this.props.messages.subscribe(
    //     //     this.handleRequest
    //     // );
    //     this.handleRequest(this.props.messages);
    //     // if(this.state.subscribedValue !== this.props.messages.length){
    //     //     this.setState({
    //     //         subscribedValue: this.props.messages.length
    //     //     });
    //     // }
    // }
   
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
            if(last.owner === 'client'){
                var response = new Message();
                response.owner = 'server';
                response.content = last.content;
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
        }
    };


    render(){
        var msgs = this.props.messages && 
            this.props.messages.map((msg, i)=> {
                return (
                    <li key={msg.owner+i}>{msg.owner} {msg.owner === 'client' ? 'says' : 'responses'} {msg.content.name} {msg.content.extra}</li>
                );
            });

        return(
            // <div style={{position: 'absolute', bottom: 0}} >{msgs}</div>
            <ul >{msgs}</ul>
        );
    }
}


class CustomerRequest extends Component{
    sendRequest(req){
        this.props.onRequestSent(req);
    }

    render(){ 
        var menus = undefined;
        if(!!this.props.sender){
            menus = this.props.sender.map((m, i)=> {
                var items = undefined;
                if(!!m.items)
                {
                    items = m.items.map((d, k)=> { 
                        return d.isDivider
                            ? <MenuItem key={d.id} divider />
                            : <MenuItem key={d.id} onSelect={this.sendRequest.bind(this, d)} eventKey={d.id}>{d.name} {d.extra}</MenuItem>;
                    });
                }

                return m.type === 0 || !m.items
                ? (<div key={'aaa'}><Button title={m.name} key={m.name+i} id={m.name+i}>{m.name}</Button></div>)
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
            <div>
                {/* <div>
                    <ButtonToolbar>
                        <Button bsSize="sm" style={{width: 30, marginRight: '5px'}} >WA</Button>
                    </ButtonToolbar>
                </div> */}
                <ButtonToolbar>
                    {menus}
                </ButtonToolbar>
            </div>
        );
    }
}

CustomerRequest.propTypes = {
    onRequestSent: PropTypes.func,
    sender: PropTypes.arrayOf(PropTypes.object)
}

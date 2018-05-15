import React, { Component } from 'react';

export default class Clock extends Component{
    constructor(props){
        super(props);
        this.state = {now: new Date()};
    }

    componentDidMount(){
        this.timer = setInterval(()=>this.tick(), 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    tick(){
        this.setState(
            {now: new Date()}
        );
    }

    render(){
        return (
            <div>
                <h1>Clock: {this.state.now.toLocaleTimeString()}</h1>
            </div>
        );
    }
}

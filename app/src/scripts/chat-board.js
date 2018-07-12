
import React, { Component } from 'react';

class ResponseAction extends Component{
    state = {
        requestCount: 0,
        messages: []
    }

    render(){
        // for(var i=0; i<this.state.requestCount; i++){
        //     messages.push(<RenderMessage key={i} owner={'me'} contents={i} />);
        // }

        return (
            <div>
                {this.state.messages}
            </div>
        );
    }

    // onMessageReceive = (msg)=>{
    //     this.state.messages.push(msg);
    // }

    onMessageReceive(msg) {
        this.state.messages.push(<RenderMessage key={msg.id} owner={msg.owner} contents={msg.contents} />);   
    }
}

const response = req => {
    const id = req.id || undefined;
    if(id === undefined){
        return (
            <section>
                Undefined Request.
            </section>
        );
    }

    return (
        <section>
            this is test response message: id = {req.id}.
        </section>
    );
}

// const renderBroadcast = content=>(
//     <div>
//         <div>{content.contents}</div>
//     </div>
// );

const RenderMessage = msg => (
    <div>
        <div>{msg.owner}</div>
        <div>{msg.contents}</div>
    </div>
);

export default ResponseAction;
//import {CommondType, MessageOwner } from './enums'

// function Message(){
//     this.type = CommondType.text; 
//     this.owner = MessageOwner.client;
//     this.content = undefined;
//     this.timeStamp = Date.now();
// }

export class Message {
    type: string;
    owner: string;
    content: object;
    timeStamp: Date;
    constructor(type, owner){
        this.type = type;
        this.owner = owner;
    }
}
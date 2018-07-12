import React, { Component } from 'react';
import {Button, Dropdown, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import ResponseAction from './chat-board'

const MENUS = [
    {id:1, name:'我的班车', type:2}, 
    {id:2, name:'班车线路', type:1}, 
    {id:3, name:'个人中心', type:0}];

const SHUTTLEBUS=[
    {id: 1, name: '张江线', extra: ''},
    {id: 2, name: '辛庄线', extra: ''},
    {id: 3, name: '徐汇线', extra: '1'},
    {id: 4, name: '徐汇线', extra: '2'},
    {id: 5, name: '杨浦线', extra: ''},
    {id: 6, name: '宝山线', extra: ''}
];

function menuClickHandler(key, e){
    console.log('Click Item: ' + key);
    let req = {id: key, owner: 'client', contents: key};
    //var msg = ResponseAction(req);
    var b = document.getElementById('board');
    //ResponseAction.onMessageReceive(req);
}

function RenderDropdown(menu, i) {
  const type = menu.type;
  
  if(type === 1){
    const buses = SHUTTLEBUS.map((d)=>(<MenuItem key={d.id} active={d.id===1} onSelect={menuClickHandler} eventKey={d.id}>{d.name} {d.extra}</MenuItem>));
    return (
        <DropdownButton
            bsStyle='default'
            title={menu.name}
            key={i}
            id={`dropdown-basic-${i}`}
            dropup={true}
        >
            {buses}
            <MenuItem divider />
            <MenuItem eventKey="4">All Lines</MenuItem>
        </DropdownButton>
    );
  }
  else if (type === 2){
      const len = SHUTTLEBUS.length;
      const rand = Math.floor(Math.random() * (len - 1 - 0));
      const bus = SHUTTLEBUS[rand];
      return (
        <DropdownButton
            bsStyle='default'
            title={menu.name}
            key={i}
            id={`dropdown-basic-${i}`}
            dropup={true}
        >
            <MenuItem eventKey="1">{bus.name} {bus.extra}</MenuItem>
        </DropdownButton>
      );
  }
  else if (type === 0){
    return (
       <div key={'aaa'}><Button key={1}>{menu.name}</Button></div>
    );
  }
}

export default class MyMenus extends Component{ 
    constructor(props){
        super(props);
    }

    render(){ 
        return <ButtonToolbar>{MENUS.map(RenderDropdown)}</ButtonToolbar>;
    }
}


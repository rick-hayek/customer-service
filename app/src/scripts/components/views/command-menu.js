import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import '../../../style/chat-history.css';
import { CommondType, MenuType } from '../../../models/enums'; 
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

import ButtonLink from '../button-as-link';

export default class MenuCommand extends Component{
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
                        linkId={'toUser'}
                        to={m.value}
                        text={m.name}
                        title={m.name} 
                        btnId={m.name+i} />
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
/*
 * Copyright (c) 2020 Bowser65
 * Licensed under the Open Software License version 3.0
 * Original work under MIT; See LICENSE.
 */

const { React, getModule, getModuleByDisplayName } = require('powercord/webpack');
const { FontAwesome } = require('powercord/components/Icons');

const Tooltip = getModuleByDisplayName('Tooltip', false);
const classes = getModule([ 'icon', 'isHeader' ], false);
const { Button } = getModule(m => m?.default?.displayName === 'MiniPopover', false);

class BlockButton extends React.Component {
  render () {
    return (
      <Tooltip color='black' postion='top' text={!this.props.message.blocked ? 'Block Message' : 'Unblock Message'}>
        {({ onMouseLeave, onMouseEnter }) => (
          <Button
            className='block-message-button'
            onClick={() => {
              this.props.message.blocked = !this.props.message.blocked;
              this.props.onToggle();
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <FontAwesome className={classes.icon} icon={!this.props.message.blocked ? 'eye-slash' : 'eye'}/>
          </Button>
        )}
      </Tooltip>
    );
  }
}

module.exports = BlockButton;

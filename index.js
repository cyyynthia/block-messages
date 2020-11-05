/*
 * Copyright (c) 2020 Bowser65
 * Licensed under the Open Software License version 3.0
 * Original work under MIT; See LICENSE.
 */

const { Plugin } = require('powercord/entities');
const { React, FluxDispatcher, getModule } = require('powercord/webpack');

const { findInReactTree } = require('powercord/util');
const { inject, uninject } = require('powercord/injector');

const BlockButton = require('./components/BlockButton');

const { getMessage } = getModule([ 'getMessages' ], false);

module.exports = class BlockMessages extends Plugin {
  async startPlugin () {
    this.loadStylesheet('style.scss');

    const MiniPopover = getModule(m => m?.default?.displayName === 'MiniPopover', false);
    inject('block-messages-button', MiniPopover, 'default', (_, res) => {
      const props = findInReactTree(res, r => r?.message);
      if (!props) {
        return res;
      }

      res.props.children.unshift(
        React.createElement(BlockButton, {
          message: props.message,
          onToggle: () => this.updateMessage(props.message)
        })
      );
      return res;
    });
    MiniPopover.default.displayName = 'MiniPopover';
  }

  pluginWillUnload () {
    uninject('block-messages-button');
  }

  updateMessage (message) {
    FluxDispatcher.dirtyDispatch({
      type: 'MESSAGE_UPDATE',
      message
    });

    // weird fix but it works lol
    setTimeout(() => {
      document.querySelector('[id^=chat-message] > * > *').click();
      document.querySelector('main').click();
    }, 5);
  }
};

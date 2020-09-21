const { Plugin } = require("powercord/entities");
const {
	Webpack: {
		FindModule,
		CommonModules: { React },
	},
	Tools: { ReactTools },
} = KLibrary;

const MiniPopover = FindModule.byFilter(
	(m) => m.default.displayName === "MiniPopover"
);
const BlockButton = require("./components/BlockButton");

const { findInReactTree } = require("powercord/util");
const { inject, uninject } = require("powercord/injector");

module.exports = class BlockMessages extends Plugin {
	async startPlugin() {
		this.loadStylesheet("style.scss");

		inject("block-messages-button", MiniPopover, "default", (args, res) => {
			const props = findInReactTree(res, (r) => r && r.message);
			if (!props) return res;

			res.props.children.unshift(
				React.createElement(BlockButton, {
					message: props.message,
				})
			);
			return res;
		});

		MiniPopover.default.displayName = "MiniPopover";

		ReactTools.rerenderAllMessages();
	}

	pluginWillUnload() {
		uninject("block-messages-button");
		ReactTools.rerenderAllMessages();
	}
};

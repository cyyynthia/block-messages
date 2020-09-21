const {
	Webpack: {
		FindModule,
		CommonModules: { React },
	},
	Tools: {
		ReactTools,
		ReactTools: { WrapBoundary },
	},
} = KLibrary;

const Tooltip = FindModule.byDisplayName("Tooltip");
const classes = FindModule.byProps("icon", "isHeader");
const { Button } = FindModule.byFilter(
	(m) => m.default.displayName === "MiniPopover"
);
const { FontAwesome } = require("powercord/components/Icons");

class BlockButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Tooltip
				color="black"
				postion="top"
				text={
					!this.props.message.blocked
						? "Block Message"
						: "Unblock Message"
				}
			>
				{({ onMouseLeave, onMouseEnter }) => (
					<Button
						className={`block-message-button`}
						onClick={() => {
							this.props.message.blocked = !this.props.message
								.blocked;
							ReactTools.updateMessage({
								id: this.props.message.id,
								channel_id: this.props.message.channel_id,
								blocked: this.props.message.blocked,
							});
						}}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
					>
						<FontAwesome
							className={classes.icon}
							icon={
								!this.props.message.blocked
									? "eye-slash"
									: "eye"
							}
						/>
					</Button>
				)}
			</Tooltip>
		);
	}
}

module.exports = WrapBoundary(BlockButton);

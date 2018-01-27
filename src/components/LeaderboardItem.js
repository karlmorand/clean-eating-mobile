import { ListItem } from 'react-native-elements';
import { Text } from 'react-native';
import React, { Component } from 'react';

class LeaderboardItem extends Component {
	render() {
		console.log('PROPS: ', this.props.entry);
		return (
			// <ListItem
			// 	roundAvatar
			// 	key={sectionID}
			// 	title={rowData.name}
			// 	subtitle={rowData.subtitle}
			// 	avatar={{ uri: rowData.avatar_url }}
			// />
			<Text>Hello</Text>
		);
	}
}

export default LeaderboardItem;

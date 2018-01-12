import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { containerStyle } from '../config';

//Needs to be a ListView to be perfomant

class Leaderboard extends Component {
	render() {
		return (
			<View style={containerStyle}>
				<Text>Hello</Text>
			</View>
		);
	}
}

export default Leaderboard;

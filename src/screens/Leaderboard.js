import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { containerStyle } from '../config';
import axios from 'axios';

import { prodApi, devApi } from '../../config.js';
//Needs to be a ListView to be perfomant

class Leaderboard extends Component {
	constructor(props) {
		super(props);
		console.log('LEADERBOARD: ', this.props.screenProps);
		this.state = {
			leaderboard: []
		};
		if (__DEV__) {
			this.apiURL = devApi;
		} else {
			this.apiURL = prodApi;
		}
	}

	componentDidMount() {
		const { accessToken, user } = this.props.screenProps;
		const headers = { Authorization: `Bearer ${accessToken}` };
		if (!user) {
			// TODO: throw a UI error here and redirect them somewhere
			return;
		}
		axios
			.get(`${this.apiURL}/leaderboard/${user.gym}`, { headers })
			.then(res => {
				this.setState({ leaderboard: res.data });
			})
			.catch(err => {
				console.log(err);
			});
	}
	render() {
		if (!this.state.leaderboard.length) {
			return (
				<View style={containerStyle}>
					<Text>Error showing leaderboard...please log out and log back in</Text>
				</View>
			);
		}
		return (
			<View style={containerStyle}>
				<Text>Leaderboard goes here</Text>
			</View>
		);
	}
}

export default Leaderboard;

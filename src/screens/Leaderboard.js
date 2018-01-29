import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, AppState, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import { containerStyle } from '../config';
import axios from 'axios';

import { prodApi, devApi } from '../../config.js';

class Leaderboard extends Component {
	constructor(props) {
		super(props);
		console.log('LEADERBOARD: ', this.props.screenProps);
		this.state = {
			leaderboard: [],
			refreshing: false
		};
		if (__DEV__) {
			this.apiURL = devApi;
		} else {
			this.apiURL = prodApi;
		}
	}

	componentDidMount() {
		AppState.addEventListener('change', this._handleAppStateChange);
		this.getCurrentLeaderboard();
	}

	_handleAppStateChange = () => {
		if (AppState.currentState === 'active') {
			console.log('APP STATE CHANGE in Leaderboard ');
			this.getCurrentLeaderboard();
		}
	};

	getCurrentLeaderboard = () => {
		const { accessToken, user } = this.props.screenProps;
		const headers = { Authorization: `Bearer ${accessToken}` };
		if (!user) {
			// TODO: throw a UI error here and redirect them somewhere
			return;
		}
		axios
			.get(`${this.apiURL}/leaderboard/${user.gym}`, { headers })
			.then(res => {
				res.data.sort((a, b) => {
					return b.total - a.total;
				});
				this.setState({ leaderboard: res.data, refreshing: false });
			})
			.catch(err => {
				this.setState({ refreshing: false });
				console.log(err);
			});
	};
	renderItem = ({ item }) => {
		return (
			<ListItem
				roundAvatar
				title={item.name}
				avatar={item.picture}
				titleStyle={styles.itemTitle}
				badge={{ value: item.total, containerStyle: styles.badgeContainer, textStyle: styles.badgeText }}
				hideChevron={true}
			/>
		);
	};

	handleRefresh = () => {
		this.setState(
			{
				refreshing: true
			},
			() => {
				this.getCurrentLeaderboard();
			}
		);
	};

	_keyExtractor = (item, index) => item.id;

	render() {
		console.log('LEADERBOARD DATA: ', this.state.leaderboard);
		if (!this.state.leaderboard.length) {
			return (
				<View style={containerStyle}>
					<Text style={styles.title}>Loading Leaderboard</Text>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
		}
		return (
			<View style={containerStyle}>
				<Text style={styles.title}>Leaderboard</Text>
				<FlatList
					data={this.state.leaderboard}
					keyExtractor={this._keyExtractor}
					renderItem={this.renderItem}
					refreshing={this.state.refreshing}
					onRefresh={this.handleRefresh}
					style={styles.list}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: 'bold'
	},
	itemTitle: {
		fontWeight: 'bold',
		fontSize: 20
	},
	badgeContainer: {
		backgroundColor: 'white'
	},
	badgeText: {
		color: 'black',
		fontSize: 20,
		fontWeight: 'bold'
	},
	list: {
		paddingLeft: 10,
		paddingRight: 10
	}
});

export default Leaderboard;

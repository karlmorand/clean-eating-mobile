import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
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
		this.getCurrentLeaderboard();
	}

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
				title={item.name}
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
					<Text>Error showing leaderboard...please log out and log back in</Text>
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
	}
});

export default Leaderboard;

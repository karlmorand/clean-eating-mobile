import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { containerStyle } from '../config';
import LeaderboardItem from '../components/LeaderboardItem';
import axios from 'axios';

import { prodApi, devApi } from '../../config.js';

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
	renderItem = ({ item }) => <LeaderboardItem key={item.id} score={item.total} name={item.name} />;
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
				<List containerStyle={{ margin: 20 }}>
					{this.state.leaderboard.map(entry => {
						return (
							<ListItem
								title={entry.name}
								titleStyle={styles.itemTitle}
								key={entry.id}
								badge={{ value: entry.total, containerStyle: styles.badgeContainer, textStyle: styles.badgeText }}
								hideChevron={true}
							/>
						);
					})}
				</List>
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

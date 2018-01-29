import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import History from './History';
import DailyLogEntry from './DailyLogEntry';

const DetailsScreen = () => (
	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Text>Details Screen</Text>
	</View>
);

const HistoryNav = StackNavigator({
	History: {
		screen: History,
		navigationOptions: {
			headerTitle: 'History'
		}
	},
	DailyLogEntry: {
		screen: DailyLogEntry,
		navigationOptions: {
			headerTitle: 'Edit Entry'
		}
	}
});

export default HistoryNav;

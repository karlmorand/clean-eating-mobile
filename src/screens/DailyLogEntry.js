import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Picker, ScrollView } from 'react-native';
import { containerStyle } from '../config';
import DailyYesNo from '../components/DailyYesNo';
import DailySlider from '../components/DailySlider';
import DailyJournal from '../components/DailyJournal';

// TODO: Anytime the totalDailyPoints changes need to make an API call to store it on server, will need to have user info passed down, or pass daily points up to App

class DailyLogEntry extends Component {
	state = {
		text: '',
		totalDailyPoints: 5
	};

	handlePointsChange = change => {
		this.setState(prevState => {
			return {
				totalDailyPoints: prevState.totalDailyPoints + change
			};
		});
	};
	render() {
		return (
			<View style={[containerStyle, styles.container]}>
				<Text style={styles.title}>Today's points: {this.state.totalDailyPoints} </Text>
				<ScrollView>
					<DailySlider
						title="Food"
						description="How many non-compliant meals did you eat today?"
						handlePointsChange={this.handlePointsChange}
					/>
					<DailyJournal title="Journal" description="Enter your daily journal" />
					<DailyYesNo
						title="Workouts"
						description="Did you workout today?"
						additionalNotes="You've already maxed out your workout points for this week"
						handlePointsChange={this.handlePointsChange}
					/>
					<DailyYesNo
						title="Sleep"
						description="Did you meet your sleep goal last night?"
						handlePointsChange={this.handlePointsChange}
					/>
					<DailyYesNo
						title="Water"
						description="Did you drink enough water today?"
						additionalNotes="Your goal is 73oz or 9 cups"
						handlePointsChange={this.handlePointsChange}
					/>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center'
	},
	text: {
		// fontSize: 20,
		marginBottom: 20,
		padding: 20
	},
	input: {
		height: 40,
		width: '80%',
		backgroundColor: '#ddd',
		padding: 10
	},
	title: {
		textAlign: 'center',
		fontSize: 20
	}
});

export default DailyLogEntry;

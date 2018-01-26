import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Picker, ScrollView, AppState, ActivityIndicator } from 'react-native';
import { containerStyle } from '../config';
import DailyYesNo from '../components/DailyYesNo';
import DailySlider from '../components/DailySlider';
import DailyJournal from '../components/DailyJournal';
import axios from 'axios';
import { prodApi, devApi } from '../../config.js';

// TODO: Anytime the totalDailyPoints changes need to make an API call to store it on server, will need to have user info passed down, or pass daily points up to App

// TODO: Write a function that get's today's entry...it should be called from componentDidMount and when the app loads after being in the background (when componentDidMount isn't called)

class DailyLogEntry extends Component {
	state = {
		dailyEntry: null,
		loadingTotal: false
	};

	apiUrl = __DEV__ ? devApi : prodApi;

	getDailyEntry = () => {
		console.log('GETTING DAILY ENTRY');
		const { accessToken, mongoId } = this.props.screenProps;
		const headers = { Authorization: `Bearer ${accessToken}` };
		axios
			.get(`${this.apiUrl}/dailyentry/${mongoId}`, { headers })
			.then(res => {
				this.setState({ dailyEntry: res.data });
			})
			.catch(err => console.log(err));
	};

	handlePointsChange = (questionId, newValue, addToTotal) => {
		console.log('addToTotal: ', addToTotal, newValue);
		if (!addToTotal) {
			newValue = -newValue;
		}
		console.log('NEW VALUE: ', newValue);
		const { accessToken, mongoId } = this.props.screenProps;
		const headers = { Authorization: `Bearer ${accessToken}` };
		const updatedAnswer = { _id: questionId, newValue: newValue };
		console.log('UPDATED ANSWER: ', updatedAnswer);
		this.setState({ loadingTotal: true }, () => {
			axios
				.post(`${this.apiUrl}/dailyentry/${this.state.dailyEntry._id}`, { updatedAnswer }, { headers })
				.then(res => {
					this.setState({ dailyEntry: res.data, loadingTotal: false });
				})
				.catch(err => console.log(err));
		});
	};
	_handleAppStateChange = () => {
		console.log('DAILY ENTRY APP STATE CHANGE');
		this.getDailyEntry();
	};

	componentDidMount() {
		//Hit the api to get today's dailyEntry
		console.log('DAILY ENTRY DID MOUNT');
		AppState.addEventListener('change', this._handleAppStateChange);
		this.getDailyEntry();
	}
	buildEntryListItem = question => {
		switch (question.questionType) {
			case 'YESNO':
				return (
					<DailyYesNo
						title={question.questionTitle}
						description={question.description}
						answerStatus={question.currentValue ? true : false}
						maxDaily={question.maxDailyPoints}
						handlePointsChange={this.handlePointsChange}
						questionId={question._id}
						addToTotal={question.addToTotal}
						key={question._id}
					/>
				);
				break;
			case 'SLIDER':
				return (
					<DailySlider
						title={question.questionTitle}
						value={question.currentValue}
						handlePointsChange={this.handlePointsChange}
						description={question.description}
						maxDaily={question.maxDailyPoints}
						questionId={question._id}
						addToTotal={question.addToTotal}
						key={question._id}
					/>
				);
		}
	};
	render() {
		if (!this.state.dailyEntry) {
			return (
				<View style={styles.loading}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
		}

		return (
			<View style={[containerStyle, styles.container]}>
				{this.state.loadingTotal ? (
					<Text style={styles.title}>
						Today's points: <ActivityIndicator size="small" color="#0000ff" style={styles.smallLoading} />
					</Text>
				) : (
					<Text style={styles.title}>Today's points: {this.state.dailyEntry.entryTotal} </Text>
				)}
				<ScrollView>
					{this.state.dailyEntry.entryQuestions.map(question => this.buildEntryListItem(question))}
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
	},
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		paddingLeft: 5,
		paddingRight: 5
	},
	smallLoading: {
		width: 10,
		height: 24
	}
});

export default DailyLogEntry;

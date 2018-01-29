import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class DailyYesNo extends Component {
	state = {
		answer: this.props.answerStatus || false
	};
	handleYes = () => {
		if (!this.state.answer) {
			this.setState({ answer: true }, () => {
				this.props.handlePointsChange(this.props.questionId, this.props.maxDaily, this.props.addToTotal);
			});
		}
	};
	handleNo = () => {
		if (this.state.answer) {
			this.setState({ answer: false }, () => {
				this.props.handlePointsChange(this.props.questionId, 0, this.props.addToTotal);
			});
		}
	};
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{this.props.title} </Text>
				<Text style={styles.description}>{this.props.description}</Text>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={[styles.button, this.state.answer && styles.activeButtonGood]}
						onPress={this.handleYes}
						disabled={this.props.disabled}>
						<Text style={styles.buttonText}>Yes</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, !this.state.answer && styles.activeButtonBad]}
						onPress={this.handleNo}
						disabled={this.props.disabled}>
						<Text style={styles.buttonText}>No</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.additionalNotes}>{this.props.additionalNotes}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '95%',
		paddingTop: 3,
		// flex: 1,
		margin: 7,
		// backgroundColor: 'grey',
		borderColor: 'grey'
		// borderWidth: 1
		// maxHeight: '30%'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10
	},
	button: {
		flex: 1,
		borderRadius: 20,
		backgroundColor: '#d2d2d2',
		padding: 5,
		margin: 5
	},
	activeButtonGood: {
		backgroundColor: '#30a350'
	},
	activeButtonBad: {
		backgroundColor: '#de2b31'
	},
	buttonText: { textAlign: 'center', color: 'white', fontSize: 30 },
	title: {
		textAlign: 'center',
		fontSize: 30
	},
	description: {
		fontSize: 15,
		textAlign: 'center'
	},
	additionalNotes: {
		fontSize: 13,
		textAlign: 'center',
		fontStyle: 'italic'
	}
});

export default DailyYesNo;

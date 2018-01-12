import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class DailyYesNo extends Component {
	state = {
		answer: this.props.answer || false
	};
	handleYes = () => {
		this.setState({ answer: true }, () => {
			this.props.handlePointsChange(1);
		});
	};
	handleNo = () => {
		this.setState({ answer: false }, () => {
			this.props.handlePointsChange(-1);
		});
	};
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{this.props.title} </Text>
				<Text style={styles.description}>{this.props.description}</Text>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={[styles.button, this.state.answer && styles.activeButton]}
						onPress={this.handleYes}
						disabled={this.props.disabled}>
						<Text style={styles.buttonText}>Yes</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, !this.state.answer && styles.activeButton]}
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
		paddingTop: 5,
		// flex: 1,
		margin: 10,
		// backgroundColor: 'grey',
		borderColor: 'grey'
		// borderWidth: 1
		// maxHeight: '30%'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 15,
		marginBottom: 15
	},
	button: {
		flex: 1,
		borderRadius: 20,
		borderWidth: 1,
		backgroundColor: '#e6e6e6',
		padding: 5,
		margin: 5
	},
	activeButton: {
		backgroundColor: 'grey'
	},
	buttonText: { textAlign: 'center', color: 'blue', fontSize: 30 },
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

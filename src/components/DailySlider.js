import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Slider } from 'react-native';

class DailySlider extends Component {
	state = {
		value: Math.abs(this.props.value) || 0,
		valueChange: 0
	};

	handleChange = newValue => {
		this.setState({ value: newValue }, () => {
			this.props.handlePointsChange(this.props.questionId, this.state.value, this.props.question.addToValue);
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{this.props.title} </Text>
				<Text style={styles.description}>{this.props.description}</Text>
				<Text style={styles.title}>{this.state.value} </Text>
				<View style={styles.sliderContainer}>
					<Slider
						minimumValue={0}
						maximumValue={5}
						step={1}
						style={{ width: 300 }}
						value={this.state.value}
						onValueChange={this.handleChange}
					/>
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
		borderColor: 'grey',
		alignItems: 'center'
		// borderWidth: 1
		// maxHeight: '30%'
	},
	sliderContainer: {
		flexDirection: 'row',
		marginTop: 15,
		marginBottom: 15
	},

	activeButton: {
		backgroundColor: 'grey'
	},
	description: {
		fontSize: 15,
		textAlign: 'center'
	},
	title: {
		textAlign: 'center',
		fontSize: 30
	},
	additionalNotes: {
		fontSize: 13,
		textAlign: 'center',
		fontStyle: 'italic'
	}
});

export default DailySlider;

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { containerStyle } from '../config';
import { ButtonGroup } from 'react-native-elements';
class Onboarding extends Component {
	state = {
		challengeLevel: 1
	};

	handleChange = challengeLevel => {
		this.setState({ challengeLevel });
	};

	handleSubmit = () => {
		this.props.onboardUser(this.state.challengeLevel);
	};
	render() {
		return (
			<View style={containerStyle}>
				<Text style={styles.levelTitle}>Choose your challenge level & tap Submit</Text>
				<ButtonGroup
					selectedBackgroundColor="#30a350"
					textStyle={{ fontWeight: 'bold' }}
					onPress={this.handleChange}
					selectedIndex={this.state.challengeLevel}
					buttons={['Lifestyle', 'Jump Start', 'Performance']}
					containerStyle={{ height: 40, marginBottom: 30 }}
				/>

				<Text style={styles.levelTitle}>Lifestyle</Text>
				<Text style={styles.textBody}>
					For those who would like to eat for health and nutrition. Body Composition isn't the focus but rather learning
					and completing long term lifestyle changes that will be the "baseline" we live most of our lives on.
				</Text>
				<Text style={styles.levelTitle}>Jump Start</Text>
				<Text style={styles.textBody}>
					For those who don't know what "macros" are. Diet soda is a breakfast food and the idea of measuring food is
					overwhelming. We all start somewhere. Let's start here.
				</Text>
				<Text style={styles.levelTitle}>Performance</Text>
				<Text style={styles.textBody}>
					Body composition is a must due to your sport. Being lean and strong is what will take your fitness to the next
					level. You understand the benefits of weighing and measuring your food. It's just awful to not have anyone to
					complain to or share recipes with.
				</Text>
				<Button onPress={this.handleSubmit} title="Submit" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	levelTitle: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold'
	},
	textBody: {
		margin: 10,
		fontSize: 15
	}
});

export default Onboarding;

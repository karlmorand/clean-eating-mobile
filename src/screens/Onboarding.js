import React, { Component } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
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
				<ScrollView>
					<Text style={styles.headline}>Welcome</Text>
					<Text style={styles.levelTitle}>How the challenge works</Text>
					<Text style={styles.textBody}>
						It's pretty simple: you get points for doing positive things like working out, getting enough sleep,
						drinking plenty of water, and you lose points for eating garbage foods. So what can you eat...
					</Text>
					<Text style={styles.levelTitle}>Food</Text>
					<Text style={[styles.textBody, styles.quote]}>
						"Eat meat and vegetables, nuts and seeds, some fruit, little starch, and no sugar."
					</Text>
					<Text style={styles.textBody}>
						We're keeping it simple for this challenge, so no complex charts listing every possible food choice. If you
						feel like you have to ask if a food is OK then chances are it's not. Going without it for a few weeks won't
						kill you. The point of this is to eat better, not see how far you can bend the rules.
					</Text>
					<Button onPress={this.handleSubmit} title="Start tracking!" />
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	headline: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: 'bold',
		textDecorationLine: 'underline',
		marginBottom: 20
	},
	levelTitle: {
		textAlign: 'center',
		fontSize: 25,
		fontWeight: 'bold'
	},
	textBody: {
		margin: 15,
		fontSize: 17,
		lineHeight: 22
	},
	quote: {
		fontStyle: 'italic'
	}
});

export default Onboarding;

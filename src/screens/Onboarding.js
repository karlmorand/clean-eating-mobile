import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { containerStyle } from '../config';
import { ButtonGroup } from 'react-native-elements';
class Onboarding extends Component {
	state = {
		challengeLevel: this.props.user.challengeLevel || 1
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
				<Text>Choose your challenge level & tap Submit</Text>
				<ButtonGroup
					selectedBackgroundColor="pink"
					onPress={this.handleChange}
					selectedIndex={this.state.challengeLevel}
					buttons={['Lifestyle', 'Jump Start', 'Performance']}
					containerStyle={{ height: 30 }}
				/>
				<Button onPress={this.handleSubmit} title="Submit" />
			</View>
		);
	}
}

export default Onboarding;

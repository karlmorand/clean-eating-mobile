import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
		console.log('SUBMIT');
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
			</View>
		);
	}
}

export default Onboarding;

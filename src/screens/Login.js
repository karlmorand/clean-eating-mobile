import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Login extends Component {
	handlePress = () => {
		this.props.handlePress();
	};
	render() {
		return (
			<View>
				<Text>Welcome to the Clean Eating Challenge, press the button below to login or create an account...</Text>
				<Button onPress={this.handlePress} title="Get Started..." />
			</View>
		);
	}
}

export default Login;

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class Login extends Component {
	handlePress = () => {
		this.props.handlePress();
	};
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Clean Eating Challenge</Text>
				<Text style={styles.textBody}>
					Welcome to the Clean Eating Challenge, tap the button below to login or create an account...
				</Text>
				<Button onPress={this.handlePress} title="Get Started..." />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		paddingLeft: 5,
		paddingRight: 5
	},
	title: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: 'bold'
	},
	textBody: {
		margin: 10,
		fontSize: 17,
		textAlign: 'center'
	}
});

export default Login;

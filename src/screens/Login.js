import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

class Login extends Component {
	handlePress = () => {
		this.props.handlePress();
	};
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Broccoli</Text>
				<Image style={styles.logo} source={require('../images/broccoli_logo.png')} />
				<Text style={styles.title}>Clean Eating Challenge</Text>
				<Text style={styles.textBody}>Welcome to the challenge, tap the button below to login...</Text>
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
	},
	logo: {
		width: 80,
		height: 80,
		margin: 10
	}
});

export default Login;

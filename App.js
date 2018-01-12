/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'clean-eating.auth0.com', clientId: 'F4tg24oB2Xm6VsQ5eUhISkykK4S5T8xy' });

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

export default class App extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = { accessToken: null };
	}
	showLogin = () => {
		auth0.webAuth
			.authorize({ scope: 'openid profile email', audience: 'https://clean-eating.auth0.com/userinfo' })
			.then(
				credentials => console.log(credentials)
				// Successfully authenticated
				// Store the accessToken
			)
			.catch(error => console.log(error));
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome to React Native!</Text>
				<Text style={styles.instructions}>To get started, edit App.js</Text>
				<Text style={styles.instructions}>{instructions}</Text>
				<Button onPress={this.showLogin} title="Login" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});

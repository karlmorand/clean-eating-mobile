/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import Auth0 from 'react-native-auth0';
import Login from './src/screens/Login';
import Router from './src/screens/Router';

const auth0 = new Auth0({ domain: 'clean-eating.auth0.com', clientId: 'F4tg24oB2Xm6VsQ5eUhISkykK4S5T8xy' });

export default class App extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = { authUser: null };
	}
	showLogin = () => {
		auth0.webAuth
			.authorize({ scope: 'openid profile email', audience: 'https://clean-eating.auth0.com/userinfo' })
			.then(authUser => {
				console.log(authUser);
				this.setState({
					authUser
				});
			})
			.catch(error => console.log(error));
	};

	userLogout = () => {
		if (Platform.OS === 'android') {
			this.setState({ authUser: null });
		} else {
			auth0.webAuth
				.clearSession({})
				.then(success => {
					this.setState({ authUser: null });
				})
				.catch(error => console.log(error));
		}
	};

	render() {
		console.ignoredYellowBox = ['Remote debugger'];
		if (!this.state.authUser) {
			return (
				<View style={styles.container}>
					<Login handlePress={this.showLogin} />
				</View>
			);
		}
		return <Router user={this.state.authUser} logout={this.userLogout} />;
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

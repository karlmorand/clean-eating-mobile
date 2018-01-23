/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import Auth0 from 'react-native-auth0';
import Login from './src/screens/Login';
import Router from './src/screens/Router';
import axios from 'axios';
import { devApi } from './config';

const auth0 = new Auth0({ domain: 'clean-eating.auth0.com', clientId: 'F4tg24oB2Xm6VsQ5eUhISkykK4S5T8xy' });

export default class App extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = { authUser: null, loggingIn: false };
		// TODO: Use dev variable to figure out what api to use, update config file accordingly
		if (__DEV__) {
			this.apiURL = 'http://localhost:4000/api';
		} else {
			this.apiURL = 'https://clean-eating-web.herokuapp.com/api';
		}
	}

	showLogin = () => {
		auth0.webAuth
			.authorize({ scope: 'openid profile', audience: 'https://cleaneatingapi.karlmorand.com' })
			.then(authUser => {
				this.setState({ loggingIn: true }, () => {
					auth0.auth
						.userInfo({ token: authUser.accessToken })
						.then(res => this.getMongoProfile(res.sub, authUser.accessToken))
						.catch(err => console.log(err));
				});
			})
			.catch(error => console.log(error));
	};

	getMongoProfile = (userId, accessToken) => {
		const headers = { Authorization: `Bearer ${accessToken}` };
		axios
			.get(`${this.apiURL}/user/${userId}`, { headers })
			.then(res => {
				this.setState({ authUser: res.data, loggingIn: false });
			})
			.catch(err => {
				console.log(err);
			});
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
		if (!this.state.authUser && !this.state.loggingIn) {
			return (
				<View style={styles.container}>
					<Login handlePress={this.showLogin} />
				</View>
			);
		}
		if (this.state.loggingIn) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color="#0000ff" />
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

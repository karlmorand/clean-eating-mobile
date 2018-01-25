/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, ActivityIndicator, AsyncStorage } from 'react-native';
import Auth0 from 'react-native-auth0';
import Login from './src/screens/Login';
import Router from './src/screens/Router';
import Onboarding from './src/screens/Onboarding';
import axios from 'axios';
import { devApi } from './config';

const auth0 = new Auth0({ domain: 'clean-eating.auth0.com', clientId: 'F4tg24oB2Xm6VsQ5eUhISkykK4S5T8xy' });

export default class App extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = { onboardingComplete: false, loggingIn: false, accessToken: null, mongoId: null, mongoUser: null };
		// TODO: Use dev variable to figure out what api to use, update config file accordingly
		if (__DEV__) {
			this.apiURL = 'http://localhost:4000/api';
		} else {
			this.apiURL = 'https://clean-eating-web.herokuapp.com/api';
		}
	}

	async componentDidMount() {
		const loggedInUser = await AsyncStorage.multiGet(['accessToken', 'userId', 'onboardingComplete']);
		if (loggedInUser) {
			console.log('loggedInUser: ', loggedInUser);
			this.setState({
				onboardingComplete: loggedInUser[2][1] === 'true' ? true : false,
				userId: loggedInUser[1][1],
				accessToken: loggedInUser[0][1]
			});
		}
	}

	showLogin = () => {
		// TODO: this looks gross, need to refactor at some point to better handle errors
		auth0.webAuth
			.authorize({ scope: 'openid profile', audience: 'https://cleaneatingapi.karlmorand.com' })
			.then(authUser => {
				this.setState({ loggingIn: true }, () => {
					auth0.auth
						.userInfo({ token: authUser.accessToken })
						.then(res => {
							this.getMongoProfile(res.sub, authUser.accessToken);
						})
						.catch(err => console.log(err));
				});
			})
			.catch(error => console.log(error));
	};

	getMongoProfile = (userId, accessToken) => {
		// TODO: Need better error handling on the AsyncStorage stuff, or just use Realm
		const headers = { Authorization: `Bearer ${accessToken}` };
		axios
			.get(`${this.apiURL}/user/${userId}`, { headers })
			.then(async res => {
				await AsyncStorage.multiSet([['accessToken', accessToken], ['userId', userId], ['onboardingComplete', 'true']]);
				this.setState({ mongoUser: res.data, loggingIn: false, accessToken: accessToken });
			})
			.catch(err => {
				console.log(err);
			});
	};

	userLogout = () => {
		AsyncStorage.multiRemove(['accessToken', 'userId'], () => {
			if (Platform.OS === 'android') {
				this.setState({ accessToken: null, mongoId: null });
			} else {
				auth0.webAuth
					.clearSession({})
					.then(success => {
						this.setState({ accessToken: null, mongoId: null });
					})
					.catch(error => console.log(error));
			}
		});
	};

	onboardUser = challengeLevel => {
		const headers = { Authorization: `Bearer ${this.state.accessToken}` };
		const data = { challengeLevel: challengeLevel };
		axios
			.post(`${this.apiURL}/user/${this.state.authUser._id}/setup`, { data }, { headers })
			.then(res => {
				this.setState({ authUser: res.data });
			})
			.catch(err => console.log(err));
	};

	render() {
		console.ignoredYellowBox = ['Remote debugger'];
		if (!this.state.accessToken && !this.state.loggingIn) {
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
		if (!this.state.onboardingComplete) {
			return <Onboarding user={this.state.authUser} onboardUser={this.onboardUser} />;
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

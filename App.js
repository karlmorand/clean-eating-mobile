import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, ActivityIndicator, AsyncStorage, AppState } from 'react-native';
import Auth0 from 'react-native-auth0';
import Login from './src/screens/Login';
import Router from './src/screens/Router';
import Onboarding from './src/screens/Onboarding';
import axios from 'axios';
import { devApi, prodApi } from './config';

const auth0 = new Auth0({
	domain: 'clean-eating.auth0.com',
	clientId: 'F4tg24oB2Xm6VsQ5eUhISkykK4S5T8xy'
});

export default class App extends Component<{}> {
	constructor(props) {
		super(props);
		console.log('CONSTRUCTOR: ', AppState.currentState);
		this.state = {
			onboardingComplete: false,
			loading: false,
			accessToken: null,
			mongoId: null,
			mongoUser: null, //TODO: probably don't need this, just need the mongoId
			authId: null
		};
		// TODO: Use dev variable to figure out what api to use, update config file accordingly
		if (__DEV__) {
			// this.apiURL = 'http://localhost:4000/api';
			this.apiURL = devApi;
		} else {
			this.apiURL = prodApi;
		}
	}

	async componentDidMount() {
		console.log('COMPONENT DID MOUNT');
		AppState.addEventListener('change', this._handleAppStateChange);
		const loggedInUser = await AsyncStorage.multiGet(['accessToken', 'authId', 'onboardingComplete', 'mongoId']);
		//see if they have previous login info in AsyncStorage
		if (loggedInUser[0][1]) {
			console.log('loggedInUser: ', loggedInUser, loggedInUser[2][1] === 'true');
			this.setState({
				onboardingComplete: loggedInUser[2][1] === 'true' ? true : false,
				authId: loggedInUser[1][1],
				accessToken: loggedInUser[0][1],
				mongoId: loggedInUser[3][1]
			});
		}
	}

	_handleAppStateChange = async nextAppState => {
		console.log('APP STATE CHANGE: ', nextAppState);
		const loggedInUser = await AsyncStorage.multiGet(['accessToken', 'authId', 'onboardingComplete']);
		console.log(loggedInUser);
		console.log(this.state);
	};

	showLogin = () => {
		// TODO: this looks gross, need to refactor at some point to better handle errors
		auth0.webAuth
			.authorize({
				scope: 'openid profile',
				audience: 'https://cleaneatingapi.karlmorand.com'
			})
			.then(authUser => {
				this.setState({ loading: true }, () => {
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

	getMongoProfile = (authId, accessToken) => {
		console.log('Getting mongo profile');
		// TODO: Need better error handling on the AsyncStorage stuff, or just use Realm
		const headers = { Authorization: `Bearer ${accessToken}` };
		axios
			.get(`${this.apiURL}/user/${authId}`, { headers })
			.then(async res => {
				console.log(res.data);
				await AsyncStorage.multiSet([['accessToken', accessToken], ['authId', authId], ['mongoId', res.data._id]]);
				this.setState({
					mongoUser: res.data,
					mongoId: res.data._id,
					authId: res.data.authId,
					onboardingComplete: res.data.onboardingComplete,
					loading: false,
					accessToken: accessToken
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	userLogout = () => {
		AsyncStorage.multiRemove(['accessToken', 'authId', 'onboardingComplete'], () => {
			if (Platform.OS === 'android') {
				this.setState({
					accessToken: null,
					authId: null,
					mongoId: null,
					mongoUser: null
				});
			} else {
				auth0.webAuth
					.clearSession({})
					.then(success => {
						this.setState({
							accessToken: null,
							authId: null,
							mongoId: null,
							mongoUser: null
						});
					})
					.catch(error => console.log(error));
			}
		});
	};

	onboardUser = challengeLevel => {
		const headers = { Authorization: `Bearer ${this.state.accessToken}` };
		const data = { challengeLevel: challengeLevel };
		axios
			.post(`${this.apiURL}/user/${this.state.mongoId}/setup`, { data }, { headers })
			.then(async res => {
				await AsyncStorage.setItem('onboardingComplete', 'true');
				this.setState({
					mongoUser: res.data,
					onboardingComplete: res.data.onboardingComplete
				});
			})
			.catch(err => console.log(err));
	};

	render() {
		console.ignoredYellowBox = ['Remote debugger'];
		if (!this.state.accessToken && !this.state.loading) {
			return (
				<View style={styles.container}>
					<Login handlePress={this.showLogin} />
				</View>
			);
		}
		if (this.state.loading) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
		}
		if (!this.state.onboardingComplete) {
			return <Onboarding onboardUser={this.onboardUser} />;
		}
		return (
			<Router
				user={this.state.mongoUser}
				authId={this.state.authId}
				mongoId={this.state.mongoId}
				accessToken={this.state.accessToken}
				logout={this.userLogout}
			/>
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

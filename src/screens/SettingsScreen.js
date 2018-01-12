import React, { Component } from 'react';
import { navigate } from 'react-navigation';
import { Button, View, StyleSheet, Text, Image } from 'react-native';
import { containerStyle } from '../config';

export default class SettingsScreen extends React.Component {
	static navigationOptions = {
		tabBarLabel: 'Setup'
	};
	logout = () => {
		this.props.screenProps.logout();
	};
	render() {
		const { goBack } = this.props.navigation;

		// <Button title="Go back to home tab" onPress={() => goBack()} />
		return (
			<View style={containerStyle}>
				<Text>Settings Screen</Text>
				<Button onPress={this.logout} title="Logout" />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 30
	}
});

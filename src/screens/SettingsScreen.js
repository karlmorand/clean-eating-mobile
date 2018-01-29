import React, { Component } from 'react';
import { navigate } from 'react-navigation';
import { Button, View, StyleSheet, Text, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
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
			<View style={styles.container}>
				<Text style={styles.title}>Settings</Text>
				{this.props.screenProps.user && (
					<Avatar large rounded source={{ uri: this.props.screenProps.user.picture }} activeOpacity={0.7} />
				)}
				<Text style={styles.title}>{this.props.screenProps.user && this.props.screenProps.user.name}</Text>
				<Button onPress={this.logout} title="Logout" />
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
		fontSize: 30
	}
});

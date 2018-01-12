import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

class DailyJournal extends Component {
	state = {
		modalVisible: false
	};
	showModal = () => {
		this.setState({ modalVisible: true });
	};
	closeModal = () => {
		this.setState({ modalVisible: false });
	};
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{this.props.title} </Text>
				<Text style={styles.description}>{this.props.description}</Text>
				<View style={styles.sliderContainer}>
					<TouchableOpacity onPress={this.showModal}>
						<Text>Show Modal</Text>
					</TouchableOpacity>
					<Modal visible={this.state.modalVisible}>
						<View>
							<Text style={styles.title} />
							<TouchableOpacity onPress={this.closeModal}>
								<Text>CloseModel</Text>
							</TouchableOpacity>
						</View>
					</Modal>
				</View>
				<Text style={styles.additionalNotes}>{this.props.additionalNotes}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '95%',
		paddingTop: 5,
		// flex: 1,
		margin: 10,
		// backgroundColor: 'grey',
		borderColor: 'grey',
		alignItems: 'center'
		// borderWidth: 1
		// maxHeight: '30%'
	},
	sliderContainer: {
		flexDirection: 'row',
		marginTop: 15,
		marginBottom: 15
	},

	activeButton: {
		backgroundColor: 'grey'
	},
	description: {
		fontSize: 15,
		textAlign: 'center'
	},
	title: {
		textAlign: 'center',
		fontSize: 30
	},
	additionalNotes: {
		fontSize: 13,
		textAlign: 'center',
		fontStyle: 'italic'
	}
});

export default DailyJournal;

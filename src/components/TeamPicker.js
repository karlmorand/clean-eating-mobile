import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Picker
} from "react-native";
import axios from "axios";
import { devApi, prodApi } from "../../config";

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      teams: [],
      selectedTeam: null
    };
    if (__DEV__) {
      // this.apiURL = 'http://localhost:4000/api';
      this.apiURL = devApi;
    } else {
      this.apiURL = prodApi;
    }
  }

  componentDidMount() {
    this.getGyms();
  }
  getGyms = () => {
    const headers = { Authorization: `Bearer ${this.props.accessToken}` };
    axios
      .get(`${this.apiURL}/team/${this.props.gymId}`, { headers })
      .then(res => {
        this.setState({ loading: false, teams: res.data.teams });
      })
      .catch(err => console.log(err));
  };
  closeModal() {
    this.props.closeModal(this.state.selectedTeam);
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
      <Modal
        visible={this.props.visible}
        animationType={"slide"}
        onRequestClose={() => this.closeModal()}
        style={styles.container}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.text}>Select Your Team:</Text>
          <Picker
            selectedValue={this.state.selectedTeam}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ selectedTeam: itemValue })
            }
          >
            <Picker.Item label="No team" value={null} />
            {this.state.teams.map(team => {
              return (
                <Picker.Item
                  label={team.name}
                  value={team._id}
                  key={team._id}
                />
              );
            })}
          </Picker>
          <Button onPress={() => this.closeModal()} title="Submit" />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});

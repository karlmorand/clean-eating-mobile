import React, { Component } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { containerStyle } from "../config";
import { ButtonGroup, Card } from "react-native-elements";
class Onboarding extends Component {
  state = {
    challengeLevel: 1
  };

  handleChange = challengeLevel => {
    this.setState({ challengeLevel });
  };

  handleSubmit = () => {
    this.props.onboardUser(this.state.challengeLevel);
  };
  render() {
    return (
      <View style={[containerStyle, styles.background]}>
        <Text style={styles.headline}>Welcome</Text>
        <ScrollView>
          <Card title="How the challenge works" titleStyle={styles.levelTitle}>
            <Text style={styles.textBody}>
              It's pretty simple: you get points for doing positive things like
              working out, getting enough sleep, drinking plenty of water
              etc...and you lose points for eating garbage foods. So what can
              you eat...
            </Text>
          </Card>
          <Card title="Food" titleStyle={styles.levelTitle}>
            <Text style={[styles.textBody, styles.quote]}>
              "Eat meat and vegetables, nuts and seeds, some fruit, little
              starch, and no sugar." - Greg Glassman
            </Text>
            <Text style={styles.textBody}>
              We're keeping it simple for this challenge, so no complex charts
              listing every possible food choice, but you can find grocery list
              in the info section of the app.
            </Text>
          </Card>
          <Card title="Teams" titleStyle={styles.levelTitle}>
            <Text style={styles.textBody}>
              In addition to individual leaderboars there's also a team
              leaderboard. On the next screen you'll choose which team you're
              on. If you haven't been told what team you're on don't worry, you
              can update it later in the info screen. Don't forget, you get
              points for reaching out and supporting your teammates.
            </Text>
          </Card>
          <Card title="Questions/Issues" titleStyle={styles.levelTitle}>
            <Text style={styles.textBody}>
              If you have any questions, or run into any issues using the app,
              please use the contact link in the info screen...this is version
              1.0 of a side project developed very quickly by one person...so
              there's bound to be some bugs ¯\_(ツ)_/¯
            </Text>
          </Card>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={this.handleSubmit}
              title="Choose team..."
              style={styles.button}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ebeef4"
  },
  headline: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: 10
  },
  levelTitle: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold"
  },
  textBody: {
    margin: 15,
    fontSize: 17,
    lineHeight: 22
  },
  quote: {
    fontStyle: "italic"
  },
  buttonWrapper: {
    margin: 20
  }
});

export default Onboarding;

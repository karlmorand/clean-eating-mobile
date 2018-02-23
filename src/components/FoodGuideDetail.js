import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from "react-native";
import Markdown from "react-native-markdown-renderer";
import { Card } from "react-native-elements";

export default class FoodGuideDetail extends Component {
  constructor(props) {
    super(props);
    console.log("DETAIL PROPS: ", this.props);
  }

  createFoodCard = (section, index) => {
    const items =
      section.items.length === 1
        ? section.items[0]
        : `- ${section.items.join("\n- ")}`;

    return (
      <Card title={section.sectionTitle} key={index}>
        <Markdown>{items}</Markdown>
      </Card>
    );
  };

  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType={"slide"}
        onRequestClose={() => this.closeModal()}
      >
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>Food Guide</Text>
          <ScrollView style={styles.container}>
            {this.props.foodGuide.map((section, index) =>
              this.createFoodCard(section, index)
            )}
            <Button title="Close" onPress={this.closeModal} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ebeef4"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    margin: 10
  },
  safeArea: {
    flex: 1
  }
});

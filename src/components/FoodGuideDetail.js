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
import { Card } from "react-native-elements";
import { MarkdownView } from "react-native-markdown-view";

export default class FoodGuideDetail extends Component {
  constructor(props) {
    super(props);
    console.log("DETAIL PROPS: ", this.props);
  }

  createFoodCard = (section, index) => {
    const items =
      section.items.length === 1
        ? section.items[0]
        : `* ${section.items.join("\n* ")}`;

    return (
      <Card title={section.sectionTitle} key={index}>
        <MarkdownView styles={markdownStyles}>{items}</MarkdownView>
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
          </ScrollView>
          <View style={styles.closeButton}>
            <Button title="Close" onPress={this.closeModal} />
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const markdownStyles = {
  paragraph: {
    fontSize: 20
  },
  listItemBullet: {
    // marginTop: 3
    paddingRight: 0,
    marginRight: 0
  },
  text: {
    fontSize: 17
  },
  listItem: {
    margin: 5
  },
  paragraph: {
    lineHeight: 25
  }
};

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
  },
  closeButton: {
    marginBottom: 15
  }
});

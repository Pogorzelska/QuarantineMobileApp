import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ResponseItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.responseItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.datetime}>{props.datetime}</Text>
        <Text style={styles.coords}>Latitide: {props.lat}</Text>
        <Text style={styles.coords}>Longtitude: {props.lng}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  responseItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ccc",
    borderColor: "#cecece",
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  datetime: {
    color: "black",
    fontSize: 18,
    marginBottom: 5,
  },
  coords: {
    color: "#666",
    fontSize: 16,
  },
});

export default ResponseItem;

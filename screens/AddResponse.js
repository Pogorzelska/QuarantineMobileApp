import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { View, Text, StyleSheet, Button } from "react-native";
import ImagePicker from "../components/ImagePicker.js";
import LocationPicker from "../components/LocationPicker.js";
import { useDispatch } from "react-redux";
import * as responsesActions from "../store/responses-actions";

const AddResponse = (props) => {
  const [selectedImage, setSelectedImage] = useState();
  const [location, setLocation] = useState();

  const dispatch = useDispatch();

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const onLocationFetch = (location) => {
    setLocation(location);
  };

  const saveResponseHandler = () => {
    const currentdatetime = new Date().toLocaleString();
    dispatch(
      responsesActions.addResponse(
        selectedImage,
        location.lat,
        location.lng,
        currentdatetime
      )
    );
    props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <ImagePicker onImageTaken={imageTakenHandler} />
      <LocationPicker onLocationFetch={onLocationFetch} />
      <Button title="Save" onPress={saveResponseHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddResponse;

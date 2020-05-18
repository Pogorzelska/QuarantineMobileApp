import React, { useEffect } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ResponseItem from "../components/ResponseItem";

import * as responsesActions from "../store/responses-actions";

const RequestsLists = (props) => {
  const responses = useSelector((state) => state.responses.responses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(responsesActions.loadresponses());
  }, [dispatch]);

  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.navigation.push("AddResponse");
        }}
      >
        <Text>Add your photo</Text>
      </TouchableOpacity>
      <FlatList
        data={responses}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ResponseItem
            image={itemData.item.imageUri}
            datetime={itemData.item.datetime}
            lat={itemData.item.lat}
            lng={itemData.item.lng}
            onSelect={() => {
              props.navigation.navigate("ResponseDetails", {
                id: itemData.item.id,
                image: itemData.item.imageUri,
                lat: itemData.item.lat,
                lng: itemData.item.lng,
                datetime: itemData.item.datetime,
              });
            }}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#cecece",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RequestsLists;

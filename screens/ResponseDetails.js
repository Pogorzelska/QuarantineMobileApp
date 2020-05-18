import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const ResponseDetails = (props) => {
  return (
    <ScrollView>
      <Text style={styles.title}>Details of response</Text>
      <Text style={styles.title}>{props.route.params.datetime}</Text>
      <Image
        style={styles.image}
        source={{ uri: props.route.params.image }}
        resizeMode="contain"
      />
      <View style={{ margin: 10 }}>
        <Text style={styles.coords}>Latitude:{props.route.params.lat}</Text>
        <Text style={styles.coords}>Longtitude:{props.route.params.lng}</Text>
      </View>

      {props.route.params.lat && props.route.params.lng ? (
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: props.route.params.lat,
            longitude: props.route.params.lng,
            latitudeDelta: 1.0,
            longitudeDelta: 1.0,
          }}
        >
          <Marker
            coordinate={{
              latitude: props.route.params.lat,
              longitude: props.route.params.lng,
            }}
          />
        </MapView>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "90%",
    alignSelf: "center",
    height: 150,
    aspectRatio: 1,
    backgroundColor: "#ccc",
    borderColor: "#cecece",
    borderWidth: 1,
  },
  title: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    margin: 15,
    textTransform: "uppercase",
  },
  mapStyle: {
    marginTop: 10,
    width: Dimensions.get("window").width,
    height: 150,
  },
  coords: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
});

export default ResponseDetails;

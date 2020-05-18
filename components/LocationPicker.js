import React, { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";

const LocationPicker = (props) => {
  useEffect(() => {
    getLocationHandler();
  }, []);

  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onLocationFetch({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert("Could not fetch location!", [{ text: "Okay" }]);
    }
    setIsFetching(false);
  };

  var locationUI = null;
  if (isFetching) {
    locationUI = <ActivityIndicator size="large" />;
  } else {
    if (pickedLocation) {
      locationUI = (
        <View>
          <Text>{pickedLocation.lat}</Text>
          <Text>{pickedLocation.lng}</Text>
        </View>
      );
    } else {
      locationUI = null;
    }
  }

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>{locationUI}</View>
      {pickedLocation ? (
        <MapView
          style={styles.mapPreview}
          initialRegion={{
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lng,
            latitudeDelta: 1.0,
            longitudeDelta: 1.0,
          }}
        >
          <Marker
            coordinate={{
              latitude: pickedLocation.lat,
              longitude: pickedLocation.lng,
            }}
          />
        </MapView>
      ) : null}
      {/* <Button title="Get User Location" onPress={getLocationHandler} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LocationPicker;

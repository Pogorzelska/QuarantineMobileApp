import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import Request from "./screens/Request";
import RequestsList from "./screens/RequestsList";
import AddResponse from "./screens/AddResponse";
import ResponseDetails from "./screens/ResponseDetails";

import responsesReducer from "./store/responses-reducer";

import { init } from "./helpers/db";

init()
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

const rootReducer = combineReducers({
  responses: responsesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="RequestsList" component={RequestsList} />
          <Stack.Screen name="Request" component={Request} />
          <Stack.Screen name="AddResponse" component={AddResponse} />
          <Stack.Screen name="ResponseDetails" component={ResponseDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

import * as FileSystem from "expo-file-system";

import { insertResponse, fetchresponses } from "../helpers/db";

export const ADD_RESPONSE = "ADD_RESPONSE";
export const SET_RESPONSES = "SET_RESPONSES";

export const addResponse = (image, lat, lng, datetime) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertResponse(newPath, lat, lng, datetime);
      console.log(dbResult);
      dispatch({
        type: ADD_RESPONSE,
        responseData: {
          id: dbResult.insertId,
          image: newPath,
          lat: lat,
          lng: lng,
          datetime: datetime,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const loadresponses = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchresponses();
      dispatch({ type: SET_RESPONSES, responses: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

import { ADD_RESPONSE, SET_RESPONSES } from "./responses-actions";
import Response from "../models/response";

const initialState = {
  responses: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RESPONSES:
      return {
        responses: action.responses.map(
          (res) =>
            new Response(
              res.id.toString(),
              res.imageUri,
              res.lat,
              res.lng,
              res.datetime
            )
        ),
      };
    case ADD_RESPONSE:
      const newResponse = new Response(
        action.responseData.id.toString(),
        action.responseData.image,
        action.responseData.lat,
        action.responseData.lng,
        action.responseData.datetime
      );
      return {
        responses: state.responses.concat(newResponse),
      };
    default:
      return state;
  }
};

class Response {
  constructor(id, imageUri, lat, lng, datetime) {
    console.log(datetime);
    this.id = id;
    this.imageUri = imageUri;
    this.lat = lat;
    this.lng = lng;
    this.datetime = datetime;
  }
}

export default Response;

export class CustomErrorHandler {
  handleError(error) {
    console.log(error);
    //console.error(error.statusText || error.message || error.toString());
  }
}

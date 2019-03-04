import PubSub from "pubsub-js";

export default class FormFieldValidation {
  publishErrors(errors) {
    errors.forEach(error => {
      PubSub.publish("formFieldValidation:thereIsError", error);
    });
  }
}

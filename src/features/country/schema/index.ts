import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please enter country name!"),
  code: yup.string().required("Please enter country code!"),
});

export default schema;

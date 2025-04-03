import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please enter template name!"),
  code: yup.string().required("Please enter template code!"),
});

export default schema;

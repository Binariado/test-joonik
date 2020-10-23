import {useState} from "react";

const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = ({ target  }) => {

    setValues({
      ...values,
      [target.name]: target.name !== 'image'? target.value: target.files[0]
    })
  }

  return [values, handleInputChange];
}

export default useForm;
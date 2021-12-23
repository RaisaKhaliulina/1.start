import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
const FormComponent = ({ children, validatorConfig }) => { 
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
      if (Object.keys(data).length > 0) {
        console.log(data);
        validate();
      }
    }, [data]);
    const isValid = Object.keys(errors).length === 0;
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const clonedElement = React.Children.map(children, (child) => {
      const childType = typeof child.type;
      let config = {};
      if (childType === "function") {
        if (!child.props.name) throw new Error(
          "Name property is required for field components",
          child
        );
        config = {
          ...child.props,
          onChange: handleChange,
          value: data[child.props.name] || "",
          error: errors[child.props.name]
        };
      }
      if (childType === "string") {
        if (child.type === "button") { 
          if (child.props.type === "submit" || child.props.type === undefined)
            config = { ...child.props, disabled: isValid };
        }
      }  
      return React.clonedElement(child, config);
    });
  return <form>{clonedElement }</form>;
};

FormComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  validatorConfig: PropTypes.object
};
export default FormComponent;

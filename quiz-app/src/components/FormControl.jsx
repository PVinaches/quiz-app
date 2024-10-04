import PropTypes from 'prop-types';

export default function Input({ type, label, value, placeholder, onChange }) {

  return (
    <div className="input" >
      <label htmlFor="input-field" >{label}</label>
      <input type={type} name={type} placeholder={placeholder} value={value} onChange={onChange} /> 
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired
};
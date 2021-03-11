import React from 'react'

function camel2title(camelCase) {
  return camelCase.replace(/([A-Z])/g, match => ` ${match}`).replace(/^./, match => match.toUpperCase())
}

function labelFromProps({ label, name }) {
  return label || camel2title(name)
}

function valueFromProps({ defaultValue, defaultObject, name }) {
  return defaultValue || (defaultObject && defaultObject[name]) || null
}

export function InputField(props) {
  const label = labelFromProps(props)
  const defaultValue = valueFromProps(props)
  const type = props.type || 'text'

  return (
    <div className="field">
      <label>{label}</label>
      <div className="control">
        <input className="input" name={props.name} defaultValue={defaultValue} type={type} placeholder={label} />
      </div>
    </div>
  )
}

export function TextAreaField(props) {
  const label = labelFromProps(props)
  const defaultValue = valueFromProps(props)

  return (
    <div className="field">
      <label>{label}</label>
      <div className="control">
        <textarea
          type="text"
          className="textarea"
          name={props.name}
          rows={props.rows || 4}
          defaultValue={defaultValue}
          placeholder={label}
        />
      </div>
    </div>
  )
}

export function SelectField(props) {
  const label = labelFromProps(props)
  const defaultValue = valueFromProps(props)

  return (
    <div className="field">
      <label>{label}</label>
      <div className="control">
        <div className="select">
          <select name={props.name} defaultValue={defaultValue}>
            {props.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

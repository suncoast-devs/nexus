import React from 'react'

const camel2title = camelCase =>
  camelCase.replace(/([A-Z])/g, match => ` ${match}`).replace(/^./, match => match.toUpperCase())

const labelFromProps = props => props.label || camel2title(props.name)

const valueFromProps = props => props.defaultValue || (props.defaultObject && props.defaultObject[props.name]) || null

const InputField = props => {
  const label = labelFromProps(props)
  const defaultValue = valueFromProps(props)
  const type = props.type || 'text'

  return (
    <div class="field">
      <label>{label}</label>
      <div class="control">
        <input className="input" name={props.name} defaultValue={defaultValue} type={type} placeholder={label} />
      </div>
    </div>
  )
}

const TextAreaField = props => {
  const label = labelFromProps(props)
  const defaultValue = valueFromProps(props)

  return (
    <div class="field">
      <label>{label}</label>
      <div class="control">
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

const SelectField = props => {
  const label = labelFromProps(props)
  const defaultValue = valueFromProps(props)

  return (
    <div class="field">
      <label>{label}</label>
      <div class="control">
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

export { InputField, SelectField, TextAreaField }

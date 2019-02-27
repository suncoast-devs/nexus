import React from 'react'
import { Field, Control } from 'reactbulma'

const camel2title = camelCase =>
  camelCase
    .replace(/([A-Z])/g, match => ` ${match}`)
    .replace(/^./, match => match.toUpperCase())

const labelFromProps = props => props.label || camel2title(props.name)

const valueFromProps = props =>
  props.defaultValue ||
  (props.defaultObject && props.defaultObject[props.name]) ||
  null

const InputField = props => {
  const label = labelFromProps(props)
  const defaultValue = valueFromProps(props)

  return (
    <Field>
      <label>{label}</label>
      <Control>
        <input
          className="input"
          name={props.name}
          defaultValue={defaultValue}
          type="text"
          placeholder={label}
        />
      </Control>
    </Field>
  )
}

const TextAreaField = props => {
  const label = labelFromProps(props)
  const defaultValue = valueFromProps(props)

  return (
    <Field>
      <label>{label}</label>
      <Control>
        <textarea
          className="textarea"
          name={props.name}
          rows={props.rows || 4}
          defaultValue={defaultValue}
          placeholder={label}
        />
      </Control>
    </Field>
  )
}

const SelectField = props => {
  const label = labelFromProps(props)
  const defaultValue = valueFromProps(props)

  return (
    <Field>
      <label>{label}</label>
      <Control>
        <div className="select">
          <select name={props.name} defaultValue={defaultValue}>
            {props.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </Control>
    </Field>
  )
}

export { InputField, SelectField, TextAreaField }

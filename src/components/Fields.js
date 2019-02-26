import React from 'react'
import { Form } from 'react-bulma-components/full'

const camel2title = camelCase =>
  camelCase
    .replace(/([A-Z])/g, match => ` ${match}`)
    .replace(/^./, match => match.toUpperCase())

const InputField = props => {
  const label = props.label || camel2title(props.name)
  const defaultValue = props.defaultValue || props.defaultObject[props.name]

  return (
    <Form.Field>
      <Form.Label>{label}</Form.Label>
      <Form.Control>
        <input
          className="input"
          name={props.name}
          defaultValue={defaultValue}
          type="text"
          placeholder={label}
        />
      </Form.Control>
    </Form.Field>
  )
}

const TextAreaField = props => {
  const label = props.label || camel2title(props.name)
  const defaultValue = props.defaultValue || props.defaultObject[props.name]

  return (
    <Form.Field>
      <Form.Label>{label}</Form.Label>
      <Form.Control>
        <textarea
          className="textarea"
          name={props.name}
          rows={props.rows || 4}
          defaultValue={defaultValue}
          placeholder={label}
        />
      </Form.Control>
    </Form.Field>
  )
}

const SelectField = props => {
  const label = props.label || camel2title(props.name)
  const defaultValue = props.defaultValue || props.defaultObject[props.name]

  return (
    <Form.Field>
      <Form.Label>{label}</Form.Label>
      <Form.Control>
        <div className="select">
          <select name={props.name} defaultValue={defaultValue}>
            {props.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </Form.Control>
    </Form.Field>
  )
}

export { InputField, SelectField, TextAreaField }

import React, { useState } from 'react'

const Tabs = props => {
  const headers = props.children.filter((child, index) => index % 2 === 0)
  const tabs = props.children.filter((child, index) => index % 2 === 1)
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className="tabs is-large is-boxed is-marginless">
        <ul>
          {headers.map((header, index) => (
            <li key={index} onClick={() => setActiveTab(index)} className={index === activeTab ? 'is-active' : ''}>
              {/* eslint-disable-next-line */}
              <a>{header}</a>
            </li>
          ))}
        </ul>
      </div>

      {tabs.map((tab, index) => {
        return (
          <div key={index} style={{ display: activeTab === index ? 'block' : 'none' }}>
            <div className="box">{tab}</div>
          </div>
        )
      })}
    </>
  )
}

const TabHeader = ({ children }) => children
const Tab = ({ children }) => children

export { Tabs, TabHeader, Tab }

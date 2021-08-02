import React, { ReactNode, useState } from 'react'
import cx from 'classnames'

export function Tabs({ children }: { children: ReactNode[] }) {
  const headers = children.filter((_, index) => index % 2 === 0)
  const tabs = children.filter((_, index) => index % 2 === 1)
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className="tabs is-large is-boxed is-marginless">
        <ul>
          {headers.map((header, index) => (
            <li key={index} onClick={() => setActiveTab(index)} className={cx({ 'is-active': index === activeTab })}>
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

export function TabHeader({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function Tab({ children }: { children: ReactNode }) {
  return <>{children}</>
}

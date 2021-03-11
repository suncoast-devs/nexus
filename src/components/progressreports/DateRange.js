import React from 'react'

export function DateRange({ startDate, endDate, setStartDate, setEndDate }) {
  return (
    <div className="columns">
      <div className="column is-half">
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">From</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="date"
                  value={startDate}
                  onChange={event => setStartDate(event.target.value)}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">To</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="date"
                  value={endDate}
                  onChange={event => setEndDate(event.target.value)}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'

const Dropdown = ({ id, actions = [], icon }) => {
  return (
    <div className='dropdown is-hoverable'>
      <div className='dropdown-trigger'>
        <button
          className='button is-text'
          aria-haspopup='true'
          aria-controls='dropdown-menu4'
          style={{ textDecoration: 'none' }}
        >
          <span className='icon is-small'>
            <i className={icon} aria-hidden='true' />
          </span>
        </button>
      </div>
      <div className='dropdown-menu' id='dropdown-menu4' role='menu'>
        <div className='dropdown-content'>
          {actions.map((action, key) => (
            <div
              key={`action-${key}`}
              className='dropdown-item cursor-pointer'
              onClick={action.onClick}
            >
              <label htmlFor={id}>{action.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dropdown

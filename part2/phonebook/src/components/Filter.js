import React from 'react';

const Filter = ({value, handleChange}) => {
  console.log('filter str is', value)
  return (
      <form>
        <div>
          filter shown with
          <input
              value={value}
              onChange={handleChange}/>
        </div>
      </form>
  );
}

export default Filter;
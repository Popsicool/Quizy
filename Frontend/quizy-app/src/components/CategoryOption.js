import React, { useEffect, useState } from 'react';

const CategoryOption = ({ selectedcategory, setCategory }) => {

  const [listOption, setListOption] = useState([]);

  useEffect(() => {
    fetch("https://quizy.popsicool.tech/api/v1/category", {
      method: 'get',
      headers: { "Content-Type": "application/json" },
    }).then(res => {
      if (!res.ok) {
        throw Error(res)
      }
      return res.json()
    })
      .then(result => {
        setListOption(result)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  function handleChange(e) {
    setCategory(e.target.value);
  };

  return (
    <div>
      <select value={selectedcategory} onChange={handleChange} >
        <option value="">Select an option</option>
        {/* Dynamically create options based on the data array */}
        {listOption.map((option) => (
          <option key={option.id} value={JSON.stringify(option)}>
            {option.name}
          </option>
        ))}
      </select>
      <p className='m-2'>Selected Option: {selectedcategory ? JSON.parse(selectedcategory).name : ''}</p>
    </div>
  );
};

export default CategoryOption;
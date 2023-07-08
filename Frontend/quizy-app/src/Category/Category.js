import React from "react";
import CategoryItems from './CategoryItems';
import './Category.css';

// list of categories
const listCategories = [
  {id: 1, type: 'popular', value: 'Sports'},
  {id: 2, type: 'regular', value: 'Tech'},
  {id: 3, type: 'regular', value: 'Psychology'}
];

export default function Categories() {
  return(
    <ul>
      {listCategories.map((element, idx) => {
        return (
          <CategoryItems
            key={element.id}
            type={element.type}
            value={element.value}
          />
        )
      })}
    </ul>
  );
}
import React from "react";
import './CategoryItems.css'

export default function CategoryItems(props) {
  return(
    <li key={props.id} type={props.type}>{props.value}</li>
  )
}

  
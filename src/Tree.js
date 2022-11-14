import React from 'react'
import Header from './Header'
import "./Tree.css"
import FamilyTree from './FamilyChart';



function Tree() {

  return (
    <div>
    <Header active="tree"/>
    <FamilyTree />
    </div>
  )
}

export default Tree
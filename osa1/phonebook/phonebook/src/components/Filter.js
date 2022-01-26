import React, { useState } from 'react'



const Filter = ({newFilter, handleFilterChange,showSearchResult}) => { 

  return (
    <>
      <form onSubmit = {showSearchResult}>
        <div>
          filter shown with : <input value = {newFilter} onChange = {handleFilterChange}/>
        </div>
      </form>
    </>
    )
}
export default Filter
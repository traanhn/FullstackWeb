import React, { useState } from 'react'



const SearchBox = ({newSearch, handleSearchChange,showSearchResult}) => { 

  return (
    <>
      <form onSubmit = {showSearchResult}>
        <div>
          find countries: <input value = {newSearch} onChange = {handleSearchChange}/>
        </div>
      </form>
    </>
    )
}
export default SearchBox
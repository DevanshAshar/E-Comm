import React, { useState } from "react";
import { useSearch } from "../Context/search";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [value, setValue] = useSearch();
  const[loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(loading)
    return
    setLoading(true)
    try {
        const {data}=await axios.get(`${process.env.REACT_APP_API}/product/searchedProd/${value.keyword}`)
        setValue({...value,products:data.products})
        navigate("/search")
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
  }
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          style={{
            "flex-grow":"1",
            width:"500px",
            maxWidth:"600px"
          }}
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={value.keyword}
          onChange={(e)=>setValue({...value,keyword:e.target.value})}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;

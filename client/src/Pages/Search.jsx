import React from "react";
import Layout from "../Components/Layouts/Layout";
import { useSearch } from "../Context/search";

const Search = () => {
  const [value, setValue] = useSearch();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h5>
            {value?.products.length < 1
              ? "No Products Found"
              : `Found ${value?.products.length} Products`}
          </h5>
          <div className="d-flex flex-wrap mt-4">
            <div className='flex-wrap' style={{display:"flex"}}>
                {value?.products.map(p=>(                    
                    <div className="card m-2" style={{width: "18rem",border:"solid purple"}} key={p._id}>
                    {(
                      <img
                        src={`${process.env.REACT_APP_API}/product/firstImage/${p._id}`}
                        className="card-img-top"
                        alt={p.prodName}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{p.prodName}</h5>
                      <p className="card-text">{p.description.substring(0,30)}...</p> 
                      <p className="card-text">₹{p.price}</p> 
                      <button class="btn btn-primary ms-1">View</button>     
                      <button class="btn btn-secondary ms-1">Add to Cart</button>             
                    </div>
                  </div>
                ))}
            </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import TodoItem from '../components/TodoItem';

export default function SearchTodos() {

    let query="";
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        document.getElementById("searchBar").focus();
    }, []);

    function updateResults(){
        if (query.length === 0){
            setSearchResults([]);
        }
        if(query.length > 0){            
            axios.get(process.env.REACT_APP_BACKEND_BASE_URL+"/todos/find?query=" + query, {
                headers:{
                    Authorization:"Bearer " + window.localStorage.getItem("token")
                }
            }).then((res) => {
                setSearchResults(res.data);                
            })
        }
    }

    return (
        <>
            <div className="z-3 position-absolute start-50 top-50 translate-middle rounded shadow" style={{ width: "500px", height: "500px", backgroundColor: "silver" }}>
                <div className="row justify-content-center mt-2 gx-0">
                    <div className="col-md-8">
                        <input className="rounded-start w-100" type='text' id="searchBar" onChange={(e)=>{                             
                            query = e.target.value;                            
                            updateResults(); 
                        }}/>
                    </div>
                    <div className="d-flex bg-dark rounded-end text-secondary justify-content-center align-text-bottom col-md-1 align-items-center" style={{ cursor: "pointer" }}>
                        <FaSearch />
                    </div>
                </div>
                <div className="mt-2">
                    {
                        searchResults.map((item) =>{                            
                            return (<TodoItem key={ item.id } item = { item } updateFunction = { () => updateResults() }/>)
                        })
                    }
                </div>
            </div>
        </>
    )
}

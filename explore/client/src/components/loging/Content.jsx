import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import "./Content.css";
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
export default function Content() {

    const [data, setData] = useState([]);

useEffect( async ()=>{  
    const result = await axios('/getusers');
    setData(result.data)
    console.log(result.data);
    console.log(data);
},[]) ;


const handleDelete = (id)=>{
    axios.delete("/deleteUser/"+id,data)
    .then(response=>{
        console.log("item deleted successfully");
        axios.get('/getusers')
        .then(response =>{
            setData(response.data)
        })
        .catch(error=>{
            console.log(err)
        })

    })
    .catch(err=>{
        console.log(err);
    })
}

    return (<div>
        <div className="navigation">
  
  <a className="button" href="">
    <img src="https://i.pinimg.com/originals/2f/f5/30/2ff5309e4a0613aee176f37dc7166002.jpg"/>

<div className="logout">LOGOUT</div>

  </a>

</div>
        <div className="feed">
            

        <ul>
        {data.reverse().map((post)=>( 

          <li className="feed-list-item" key = {post.id}>
        <div className="feed-list-item-title"></div>
        <div className="feed-list-item-byline"><span className="feed-list-item-byline-author">{post.username}</span> {moment().format('MMMM Do YYYY, h:mm:ss a')}</div>
        <span className="feed-list-item-lede">{post.about}</span>
        <div className = "delete_div">
        <IconButton className="swipeButton_repeat" onClick={()=>handleDelete(post.id)}>
       delete  <DeleteIcon fontSize="large" className="delete_btn"/>
            </IconButton>
        </div>
      </li>

        ))}
          
      
      </ul>
      </div>
      </div>
    )
}

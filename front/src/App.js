import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css'
import myImage1 from './Images/image1.jpg'
// import myImage2 from './Images/image2.jpg'


const MyComponent = () => {
    
    const [postData, setPostData] = useState('');
    const [response, setResponse] = useState(null);
    const [image , setImage] = useState('');
    const [temp, setTemp] = useState(null);
    const imageRef= useRef(null)
    

    const handlePost = () => {
        // Make a POST request
        axios.post('http://127.0.0.1:8000/api/mydata/', { data: postData })
            .then(res => {
                setResponse(res.data);
                console.log(typeof(res.data.main.temp))
                if (res.data.main.temp!=='273'){
                   
                    setTemp(res.data.main.temp)
                    console.log('abhishek4')}
                else{
                     imageRef.current.style='display:none'
                    setTemp(null)
                }
                
            })
            .catch(err => {
                console.log(err);
               
            });
    };
    const imageChanger = ()=>{
        console.log('abhishek3')
        if (temp>=300){
            imageRef.current.style='display:block'
            setImage(myImage1)
        }
        else if(temp>=200){
            imageRef.current.style='display:block'
            setImage(myImage1)
        }
        else{
            setImage("")
        }

    }
    useEffect(
        imageChanger,[temp])
    return (
        <div className='body'>
            
           <h1 className='weatherTitle'>Weather Application</h1>
            
            <div className="weatherBody">
            <h1 className='heading'>Your Location = <input
                type='text'
                className='weatherInput'
                value={postData}
                placeholder='search your city or town'
                onChange={(e) => setPostData(e.target.value)}
            ></input> </h1>
           
            
            <button onClick={handlePost} className='weatherButton'>check</button>
            <center>
            <img src={image} ref= {imageRef} alt="" className='weatherImage' />
            
            <h1 className='weatherHeading'>Your Area {response&&response.error} weather</h1>
            </center>
            
            <div className="weatherInformation">
            <h3>Temperature   <span className='degree'> {response&&parseInt(response.main.temp-273)} &deg; C</span></h3>
           <h3>Feels Like      <span className='degree'> {response&&parseInt(response.main.feels_like-273)} &deg; C  </span></h3>
           </div>
        </div>
    </div>
    );
};

export default MyComponent;

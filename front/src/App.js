import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css'
import './MediaApp.css'
import myImage1 from './Images/sunny.jpg'
import myImage2 from './Images/rainy.jpg'
import myImage3 from './Images/snowfall.jpg'
import myImage4 from './Images/cold.jpg'
// import myImage2 from './Images/image2.jpg'


const MyComponent = () => {
    
    const [postData, setPostData] = useState('');
    const [response, setResponse] = useState(null);
    const [image , setImage] = useState('');
    const [temp, setTemp] = useState(null);
    const imageRef= useRef(null)
    

    const handlePost = () => {
        // Make a POST request
        axios.post('https://weather-app-zuqu.onrender.com/api/mydata/', { data: postData })
            .then(res => {
                setResponse(res.data);
                console.log(typeof(res.data.main.temp))
                if (res.data.main.temp!=='273'){
                   
                    setTemp(parseInt(res.data.main.temp))
                    console.log('abhishek4')}
                else{
                    
                    setTemp(null)
                    setImage(null)
                }
                
            })
            .catch(err => {
                console.log(err);
               
            });
    };
    const imageChanger = ()=>{
        console.log('abhishek3')
        if (temp>'0'&&temp<=274){
            imageRef.current.style='display:block'
            setImage(myImage3)
        }
        else if(temp>0 && temp<=283){
            imageRef.current.style='display:block'
            setImage(myImage4)
        }
        else if (temp>0 && temp<=298){
            imageRef.current.style='display:block'
            setImage(myImage2)
        }
        else if(temp>0 && temp<=313){
            imageRef.current.style='display:block'
            setImage(myImage1)
        }
        else{
            if(temp===null){
                imageRef.current.style='display:none'
            }
            else{
            imageRef.current.style='display:block'
            setImage(myImage1)
            }
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
            ></input>
            <button onClick={handlePost} className='weatherButton'>check</button>
             </h1>
           
            
            
            <center>
            <img src={image} ref= {imageRef} alt="" className='weatherImage' />
            
            <h1 className='weatherHeading'>Your Area {response&&response.error} weather</h1>
            </center>
            
            <div className="weatherInformation">
            <h3>Temperature   <span className='degree'> {response&&parseInt(response.main.temp-273)} &deg; C</span></h3>
           <h3>Feels Like      <span className='degree'> {response&&parseInt(response.main.feels_like-273)}&deg; C  </span></h3>
           </div>
        </div>
    </div>
    );
};

export default MyComponent;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './App.css'
import './MediaApp.css'
import background from './Images/backgroundImage.webp'
// import myImage2 from './Images/image2.jpg'
import { ClipLoader } from 'react-spinners'


const MyComponent = () => {

    const [postData, setPostData] = useState('');
    const [response, setResponse] = useState(null);
    const [image, setImage] = useState('');
    const [temp, setTemp] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageRef = useRef(null)
    const [applyCss, setApplyCss] = useState(true)


    const handlePost = () => {
        setApplyCss(false)
        setResponse(null)
        setLoading(true)
        
        axios.post('https://weather-app-zuqu.onrender.com/api/mydata/', { data: postData })
            .then(res => {
                setResponse(res.data);
                setLoading(false)
                setApplyCss(true)
                console.log(typeof (res.data.main.temp))
                if (res.data.main.temp !== '273') {

                    setTemp(parseInt(res.data.main.temp))
                    console.log('abhishek4')
                }
                else {

                    setTemp(null)
                    setImage("https://img.icons8.com/nolan/64/image.png")
                }

            })
            .catch(err => {
                setLoading(false)
                console.log(err);

            });
    };
    const imageChanger = () => {
        console.log('abhishek3')
        if (temp > '0' && temp <= 274) {

            setImage("https://img.icons8.com/3d-fluency/96/snow.png")
        }
        else if (temp > 0 && temp <= 283) {

            setImage("https://img.icons8.com/emoji/96/cold-face.png")
        }
        else if (temp > 0 && temp <= 298) {

            setImage("https://img.icons8.com/emoji/96/cloud-with-lightning-and-rain.png")
        }
        else if (temp > 0 && temp <= 313) {

            setImage("https://img.icons8.com/emoji/96/sun-emoji.png")
        }
        else if (response === null) {
            setImage("https://img.icons8.com/nolan/64/image.png")
        }


        else {
            if (temp === null) {

                setImage("https://img.icons8.com/nolan/64/image.png")
            }
            else {

                setImage("https://img.icons8.com/emoji/96/sun-emoji.png")
            }

        }



    }
    useEffect(
        imageChanger, [temp, response])
    return (
        <div className='body' style={{ backgroundImage: 'url(' + background + ')' }}>

            <div className='weatherHeader'>
                <div>
                    <h2 className='weatherTitle'>Weather Application<br />
                        <FontAwesomeIcon className='city' icon={faLocationDot} />
                        <span className='citys'>{postData}</span>

                    </h2>
                </div>


                <div>
                    <input
                        type='text'
                        className='weatherInput'
                        value={postData}
                        placeholder='Search Your City/Town'
                        onChange={(e) => setPostData(e.target.value)}
                       

                    ></input>

                    <button onClick={handlePost} className='weatherButton'>Check <span className='spinner'><ClipLoader color={"white"} loading={loading} size={25}  /></span></button>
                </div>

            </div>
            <div className="weatherBody">

                <div className='celcius'>
                    <CSSTransition
                        in={applyCss}
                        timeout={1000}
                        classNames='my-node'
                        unmountOnExit


                    ><h1 className='information'><span> {response == null ? '0' : ''}</span> <span> {response && parseInt(response.main.temp - 273)} &deg; C</span></h1></CSSTransition>
                </div>
                <div className="loader">
                <ClipLoader color={"white"} loading={loading} size={150} />
                </div>
                <div className='otherInfomationBox'>
                    <CSSTransition
                        in={applyCss}
                        timeout={1000}
                        classNames='image-node'
                        unmountOnExit

                    >
                        <img src={image} ref={imageRef} alt="" className='weatherImage' />
                    </CSSTransition>
                    <CSSTransition
                    in={applyCss}
                    timeout={1000}
                    classNames="other-informationBox"
                    unmountOnExit
                    >
                    <div>
                        <h2 className='otherInformation'>
                            <img width="30" height="30" src="https://img.icons8.com/ios/50/ffffff/humidity.png" alt="humidity" className='weatherImage' />
                            Humidity <span className='degree'> {response == null ? '0' : ''}</span>    <span className='degree'> {response && parseInt(response.main.humidity)}%</span></h2>

                        <h3 className='otherInformation'>
                            <img width="30" height="30" src="https://img.icons8.com/ios/50/ffffff/apple-weather.png" alt="apple-weather" className='weatherImage' />
                            Feels Like  <span className='degree'> {response == null ? '0' : ''}</span> <span className='degree'> {response && parseInt(response.main.feels_like - 273)}&deg; C

                            </span></h3>
                    </div>
                    </CSSTransition>
                </div>

            </div>





            <h1 className='weatherHeading headingCity'><span>CITY/TOWN:-{postData}</span></h1>

            <h1 className='weatherHeading'>Your City weather <span className='error'>{response && response.error}</span></h1>


            <div className="weatherInformation">

                <CSSTransition
                in={applyCss}
                timeout={1000}
                classNames="image-nodeNextleft"
                unmountOnExit
                >
                <div className="informationBox">
                    <img width="50" height="50" src="https://img.icons8.com/fluency/48/latitude.png" alt="latitude" />
                    <p className='degree'><span className='degree'>Latitude </span></p>
                    <p className='degree'><span>{response == null ? '0' : ''}</span>{response && parseInt(response.coord.lon)}&deg;</p>

                </div>
                </CSSTransition>

                <CSSTransition
                in={applyCss}
                timeout={1000}
                classNames="image-nodeNext"
                unmountOnExit
                >
                <div className="informationBox">
                    <img width="50" height="50"
                        src="https://img.icons8.com/officel/40/longitude.png" alt="longitude" />
                    <p className='degree'><span className='degree'>Longitude </span></p>
                    <p className='degree'>{response == null ? '0' : ''}<span>{response && parseInt(response.coord.lat)} &deg; </span></p>
                </div>
                </CSSTransition>
                <div className="loader2">
                <ClipLoader color={"white"} loading={loading} size={150} />
                </div>
                <CSSTransition
                in={applyCss}
                timeout={1000}
                classNames="image-nodeNextleft"
                unmountOnExit
                >
                <div className="informationBox">

                    <img width="50" height="50" src="https://img.icons8.com/clouds/100/wind.png" alt="wind" />
                    <p className='degree'> <span className='degree'></span> Wind </p>
                    <p className='degree'><span>{response == null ? '0' : ''}</span>{response && parseInt(response.wind.speed)}Km/h</p>
                </div>

                </CSSTransition>
                <CSSTransition
                in={applyCss}
                timeout={1000}
                classNames="image-nodeNext"
                unmountOnExit
                >
                <div className="informationBox">
                    <img width="50" height="50" src="https://img.icons8.com/officel/40/pressure.png" alt="pressure" />
                    <p className='degree'><span className='degree'> Pressure  </span> </p>
                    <p className='degree'>{response == null ? '0' : ''}{response && parseInt(response.main.pressure)}mb</p>
                </div>
                </CSSTransition>
            </div>
        </div>
    );
};

export default MyComponent;

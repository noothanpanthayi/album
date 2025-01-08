"use client";
import React, { useState, useEffect } from "react";
// import NextImage from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
// import {getHost} from '../../api/getHost';


function Page() {
  const [state, setState] = useState({
    isFullScreen: false,
    showNav: false,
    currentImg: "ny11",
    currentIndex: 0,
    s3images: [],
    imageLoaded:false
   
  });

  const fetchImages = async () => {

    // console.log("HOST URL ", `${getHost()}/api/list-images?folderName=travel`);
    
    // const response = await fetch(`${getHost()}/api/list-images?folderName=nyalbum`);

    // const response = await fetch('http://3.80.91.134/api/list-images?folderName=travel');
    const response = await fetch('http://localhost:3000/api/list-images?folderName=travel');
    const data = await response.json();

    data.images.forEach(url=>{
      const link=document.createElement('link');
      link.rel='preload';
      link.as='image';
      link.href=url;
      document.head.appendChild(link);
    })

    // data.images.forEach(url=>{
    //   const img = new Image();
    //   img.src=url
    // })

    setState((prevState) => {
      return {
        ...prevState,
        s3images: data.images,
        showNav: true,
      };
    });
  };

  const toggleFullScreen = () => {
    if (!state.isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.fullscreenElement)
      document.exitFullscreen();
    }

    setState((prevState) => {
      return {
        ...prevState,
        isFullScreen: !prevState.isFullScreen,
      };
    });
  };

  const handleEscapeKey=()=>{
    // document.exitFullscreen();
    if (!document.fullscreenElement){

      // document.exitFullscreen();
      setState((prevState) => {
        return {
          ...prevState,
          isFullScreen: false,
        };
      });
    }
  }

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleEscapeKey);
    document.addEventListener('keydown',handleKeyDown);
    fetchImages();
  }, []);

  const router = useRouter();

  const handleKeyDown=(e)=>{

    switch(e.key){
      case 'ArrowRight':
        navigate('next');
      break;
      case 'ArrowLeft':
        navigate('back');
      break;
      case ' ':
        navigate('next  ')
    }

  }

  const navigate = (mode) => {
    let currentIndex = 0;

    setState((prevState) => {
      if (mode === "next") {
        currentIndex =
          prevState.currentIndex >= prevState.s3images?.length - 1
            ? 0
            : prevState.currentIndex + 1;
      } else {
        currentIndex =
          prevState.currentIndex <= 0
            ? prevState.s3images?.length - 1
            : prevState.currentIndex - 1;
      }
      return {
        ...prevState,
        currentIndex,
      };
    });
  };

  const home = () => {
    router.push("/albums");
  };

  const handleImageLoad=()=>{
    setState((prevState) => {
      return {
        ...prevState,
        imageLoaded: true,
      };
    });
  }
  
  return (
    <>
      <div>
        {
          !state.isFullScreen ? <div className={imageTitle}>
          <div
            onClick={home}
            title="Click here to go back"
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
          </div>
          <div  onClick={home} style={{textTransform:'capitalize'}}>
            {state.s3images[state.currentIndex]?.split("/")[4].split("?")[0].split("_").join(" ").split(".")[0]}
          </div>
          <div>
            {
              <div title="Full Screen" onClick={toggleFullScreen}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/></svg>
            </div>
           
}
          </div>
        </div>
        :
        <div style={{position:'relative', display:'flex',justifyContent:'flex-end'}}>
           <div title="Exit Full Screen" onClick={toggleFullScreen} className={exitFullScreen}>
           <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff"><path d="m136-80-56-56 264-264H160v-80h320v320h-80v-184L136-80Zm344-400v-320h80v184l264-264 56 56-264 264h184v80H480Z"/></svg>
            </div>
        </div>
}

        <div className={`${imgContainer} ${state.isFullScreen?noCntnrMargin:CntnrMargin}`}>
          {state.showNav &&  
          state.imageLoaded && 
          (
            <div
              title="Click for Back"
              onClick={() => navigate("back")}
              className={backLayer}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="60px"
                viewBox="0 -960 960 960"
                width="80px"
                fill="#fff"
              >
                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
              </svg>
            </div>
          )}

          {state.showNav &&
           state.imageLoaded && 
          (
            <div
              title="Click for Next"
              onClick={() => navigate("next")}
              className={nextLayer}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="60px"
                viewBox="0 -960 960 960"
                width="80px"
                fill="#fff"
              >
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
              </svg>
            </div>
          )}

          {state.s3images?.length > 0 && (
            <img src={state.s3images[state.currentIndex]} style={{
              // border:'solid 10px #fff',
              // margin:10,
              // margin:'0 auto',
              width:'100vw',
              // maxHeight:window.innerHeight
              // height:window.innerHeight
            
            }}
            onLoad={handleImageLoad}/>
            // <NextImage
            //   className={img}
            //   src={state.s3images[state.currentIndex]}
            //   fill={true}
            //   onLoad={handleImageLoad}
            //   alt="NY Pics"
            // />
          )}
        </div>
      </div>
    </>
  );
}

const {
  backLayer,
  nextLayer,
  imgContainer,
  imageTitle,
  exitFullScreen,
  CntnrMargin,
  noCntnrMargin
} = styles;
export default Page;



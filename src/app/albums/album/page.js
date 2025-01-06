"use client";
import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

function Page() {
  const [state, setState] = useState({
    isFullScreen: false,
    showNav: false,
    currentImg: "ny11",
    currentIndex: 0,
    s3images: [],
   
  });

  const fetchImages = async () => {
    const response = await fetch("http://3.80.91.134/api/list-images?folderName=nyalbum");
    const data = await response.json();
    

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

  
  return (
    <>
      <div>
        <div className={imageTitle}>
          <button
            onClick={home}
            title="Click here to go back"
            className={navBtn}
          >
          Albums
          </button>
          {/* <div  onClick={home} style={{textTransform:'capitalize'}}>
            {state.s3images[state.currentIndex]?.split("/")[4].split("?")[0].split("_").join(" ").split(".")[0]}
          </div> */}
          <div>
            {
              <button onClick={toggleFullScreen} className={navBtn}>
              {!state.isFullScreen?"Full Screen":"Exit Full Screen"}
            </button>
           
}
          </div>
        </div>

        <div className={imgContainer}>
          {state.showNav && (
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

          {state.showNav && (
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
            <NextImage
              className={img}
              src={state.s3images[state.currentIndex]}
              fill={true}
              alt="NY Pics"
            />
          )}
        </div>
      </div>
    </>
  );
}

const {
  backLayer,
  nextLayer,
  img,
  imgContainer,
  imageTitle,
  navBtn,
} = styles;
export default Page;



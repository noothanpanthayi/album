import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
// import styles from "./page.module.css";
// import { svg } from "./svgs";
import styles from './page.module.css';

export const useAlbum = () => {

  const [state, setState] = useState({
    isFullScreen: false,
    showNav: false,
    currentImg: "ny11",
    currentIndex: 0,
    imageWidth: "",
    imageHeight: "",
    s3images: [],
    slideShowSpeed: 3,
    slideShowActive: false,
    intervalHandler: null,
    imageLoaded: false,
  });

const {id}=useParams();

const Speed=()=>{

  return <>
  {/* {state.slideShowSpeed} */}
  <div>
    <select className={styles.speedCtr} value={state.slideShowSpeed} onChange={updateSpeed}>
    <option value={null}>Speed</option>

      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>7</option>
      <option value={8}>8</option>
      <option value={9}>9</option>
      <option value={10}>10</option>
    </select>
  </div>
  </>
}

  const updateSpeed = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        slideShowSpeed:e.target.value ? parseInt(e.target.value): state.slideShowSpeed,
      };
    });
  };


  const fetchImages = async () => {
    const response = await fetch(
      `http://3.80.91.134/api/list-images?folderName=${id}`
    );
    // const response = await fetch(
    //   `http://localhost:3000/api/list-images?folderName=${id}`
    // );
    const data = await response.json();

    data.images.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
    });

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
      if (document.fullscreenElement) document.exitFullscreen();
    }

    setState((prevState) => {
      return {
        ...prevState,
        isFullScreen: !prevState.isFullScreen,
      };
    });
  };

  const handleEscapeKey = () => {
    if (!document.fullscreenElement) {
      setState((prevState) => {
        return {
          ...prevState,
          isFullScreen: false,
        };
      });
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleEscapeKey);
    document.addEventListener("keydown", handleKeyDown);
    fetchImages();
    return () => {
      if (state.intervalHandler) {
        clearInterval(state.intervalHandler);
      }
    };
  }, []);

  useEffect(()=>{
    console.log("State ", state)
  })

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowRight":
        navigate("next");
        break;
      case "ArrowLeft":
        navigate("back");
        break;
      case " ":
        navigate("next  ");
    }
  };

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
        imageLoaded: false,
      };
    });
  };

  const router=useRouter();
  const home = () => {
    router.push("/albums");
  };

  const handleImageLoad = () => {
    setState((prevState) => {
      return {
        ...prevState,
        imageLoaded: true,
      };
    });
  };

  const slideShowOn = () => {
    const intervalHandler = setInterval(() => {
      navigate("next");
    }, state.slideShowSpeed * 1000);
    setState((prevState) => {
      return {
        ...prevState,
        intervalHandler,
      };
    });
  };

  const slideShowOff = () => {
    if (state.intervalHandler) {
      clearInterval(state.intervalHandler);
      setState((prevState) => {
        return {
          ...prevState,
          intervalHandler: null,
        };
      });
    }
  };

  const toggleAuto = () => {
    let slideShowActive = false;
    if (!state.slideShowActive) {
      // document.documentElement.requestFullscreen();
      slideShowOn();
      slideShowActive = true;
    } else {
      // document.exitFullscreen();
      slideShowOff();
      slideShowActive = false;
    }
    setState((prevState) => {
      return {
        ...prevState,
        slideShowActive,
      };
    });
  };

  
  return {
    state,
    fetchImages,
    toggleFullScreen,
    handleEscapeKey,
    handleKeyDown,
    navigate,
    home,
    handleImageLoad,
    slideShowOn,
    slideShowOff,
    toggleAuto,
    updateSpeed,
    Speed
  };
};

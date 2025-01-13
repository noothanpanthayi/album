import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
// import styles from "./page.module.css";
// import { svg } from "./svgs";

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

  const fetchImages = async () => {
    // const response = await fetch('http://3.80.91.134/api/list-images?folderName=travel');
    const response = await fetch(
      `http://localhost:3000/api/list-images?folderName=${id}`
    );
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
    }, 7000);
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

  const updateSpeed = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        slideShowSpeed: parseInt(e.target.value),
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
  };
};

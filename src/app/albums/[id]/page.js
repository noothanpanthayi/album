"use client";
import React from "react";
// import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { svg } from "./svgs";
import { useAlbum } from "./useAlbum";

function Page() {
  const {
    state,
    toggleFullScreen,
    navigate,
    home,
    handleImageLoad,
    toggleAuto,
    Speed,
    togglePlayAudio,
    audioRef
  } = useAlbum();

  
  return (
    <>
      <div>
        {!state.isFullScreen ? (
          <div className={imageTitle}>
            <div onClick={home} title="Albums Page">
              {svg.home}
            </div>

            <div onClick={home} style={{ textTransform: "capitalize" }}>
              {decodeURI(
                state.s3images[state.currentIndex]
                  ?.split("/")[4]
                  .split("?")[0]
                  .split("_")
                  .join(" ")
                  .split(".")[0]
              )}
            </div>
            <div>
              <div className={utils} style={{ display: "flex", alignItems: "center" }}>
                <div 
                title={`${state.musicOn?"Turn Music Off":"Turn Music On"}`}
                onClick={togglePlayAudio} className={`${music} ${state.musicOn?red:''}`}>
                   ♫
                </div>
                
                {!state.slideShowActive && (
                  <>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Speed />
                    </div>
                    <div
                      title="Start Slide Show"
                      onClick={toggleAuto}
                      style={{ cursor: "pointer", color: "#fff" }}
                    >
                      {svg.play}
                    </div>
                  </>
                )}
                {state.slideShowActive && (
                  <div style={{ display: "flex", gap: 10 }}>
                    <div className={currSpeed}>{state.slideShowSpeed}</div>

                    <div title="Stop Slide Show" onClick={toggleAuto}>
                      {svg.stop}
                    </div>
                  </div>
                )}
                <div title="Full Screen" onClick={toggleFullScreen}>
                  {svg.fullScreen}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              title="Exit Full Screen"
              onClick={toggleFullScreen}
              className={`${exitFullScreen} ${
                state.slideShowActive ? exitActive : exitNormal
              } `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill={state.slideShowActive ? "#f00" : "#fff"}
              >
                <path d="m136-80-56-56 264-264H160v-80h320v320h-80v-184L136-80Zm344-400v-320h80v184l264-264 56 56-264 264h184v80H480Z" />
              </svg>
            </div>
          </div>
        )}

        <div
          className={`${state.isFullScreen ? fullScreen : ""}`}
        >

          <div className={navContainer}>
          {state.showNav && state.imageLoaded && (
            <div
              title="Click to Navigate Back"
              onClick={() => navigate("back")}
              className={backLayer}
            >
              {svg.navBack}
            </div>
          )}

          <div onClick={toggleFullScreen} className={navMiddle}>&nbsp;</div>

          {state.showNav && state.imageLoaded && (
            <div
              title="Click to Navigate Forward"
              onClick={() => navigate("next")}
              className={nextLayer}
            >
              {svg.navNext}
            </div>
          )}
</div>
          {state.s3images?.length > 0 && (
            <>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  alt="Carousel Image"
                  src={state.s3images[state.currentIndex]}
                  // loading="lazy"
                  decoding="async"
                  className={state.imageLoaded ? imgActive : image}
                  style={{
                    maxWidth: state.windowDIM.width,
                    maxHeight: state.windowDIM.height,
                  }}
                  onLoad={handleImageLoad}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <audio ref={audioRef}>
          {/* <source src="/assets/music/abbapiano.mp3" type="audio/mpeg" /> */}
          <source src="https://jking.cdnstream1.com/b22139_128mp3" type="audio/mpeg" />
          {/* <source src="http://radio.streemlion.com:2310/stream" type="audio/mpeg" /> */}

          {/* http://radio.streemlion.com:2310/stream */}
        </audio>
      </div>
    </>
  );
}

const {
  backLayer,
  nextLayer,
  imageTitle,
  exitFullScreen,
  image,
  utils,
  exitActive,
  exitNormal,
  imgActive,
  currSpeed,
  fullScreen,
  music,
  red,
  navContainer,
  navMiddle
} = styles;
export default Page;

"use client";
import Image from "next/image";

import { useState, useEffect } from "react";

const PhotosPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("http://3.80.91.134/api/list-images?folderName=nyalbum");
      const data = await response.json();
      setImages(data.images);
    };
    fetchImages();
  }, []);

  

  return (
    <>
      <div>Photos</div>
      <div>
        {
         images?.length>0 &&    <Image
                    aria-hidden
                    src={images[1]}
                    alt="File icon"
                    width={200}
                    height={200}
                    priority
                  />
        }
        {images?.length>0?images[0]:'No Images'}
        {images?.length>0?images[1]:'No Images'}
        </div>
    </>
  );
};

export default PhotosPage

"use client";
import { Fragment, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const [state] = useState({
    albums: [
      {
        id: "1001",
        title: "New York",
        date: "June 20, 2022",
        coverImage:
          "https://amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com/nyalbum/ny2.jpg",
      },
      {
        id: "1002",
        title: "Atlanta",
        date: "June 20, 2022",
        coverImage:
          "https://amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com/travel/travel/20220528_125943.jpg",
      },
      {
        id: "1003",
        title: "Dallas",
        date: "June 20, 2022",
        coverImage:
          "https://amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com/travel/travel/20220719_135921.jpg",
      },
      {
        id: "1004",
        title: "Colorado",
        date: "June 20, 2022",
        coverImage:`https://amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com/travel/travel/20220721_165946.jpg`
      },
      {
        id: "1005",
        title: "Washington",
        date: "June 20, 2022",
        coverImage:`https://amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com/travel/travel/texas.JPG`,                 
      },
      {
        id: "1006",
        title: "Florida",
        date: "June 20, 2022",
        coverImage:
          "https://amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com/travel/travel/20231223_130618.jpg",
      },
    ],
  });

  const router=useRouter();

  const navigate=()=>{
     router.push("/albums/album");
  }

  return (
    <div className={page}>
      <div className={grid}>
        {state.albums.map(({ id, coverImage, title }) => {
          return (
            <Fragment key={id}>
              <div className={card} onClick={navigate}>
                <div className={cardTitle}>{title}</div>
                <img
                    className={photoImg}
                  src={coverImage}
                  alt="NY Pics"
                />
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

const { grid, card, page, cardTitle, photoImg} = styles;

export default Page;

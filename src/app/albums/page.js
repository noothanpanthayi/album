"use client";
import { Fragment, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const [state, setState] = useState({
    albums: [
      {
        id: "1001",
        title: "New York Visit",
        date: "June 20, 2022",
        coverImage:
          "https://amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com/nyalbum/ny2.jpg",
      },
      {
        id: "1002",
        title: "New York Visit",
        date: "June 20, 2022",
        coverImage:
          "https://amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com/nyalbum/ny2.jpg",
      },
      {
        id: "1003",
        title: "New York Visit",
        date: "June 20, 2022",
        coverImage:
          "https://amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com/nyalbum/ny2.jpg",
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
                <Image
                  width={320}
                  height={320}
                  //   className={img}
                  src={coverImage}
                  layout="responsive"
                  priority
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

const { grid, card, page, cardTitle } = styles;

export default Page;

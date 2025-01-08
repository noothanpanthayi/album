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
          "https://amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com/travel/travel/20220528_125943.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA45Y2R5CYDJD7UYE5%2F20250108%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20250108T155226Z&X-Amz-Expires=600&X-Amz-Signature=59c7ae82a5449c3199811b709560c6ed167daf752ccc870da79c2a7b185cb5c0&X-Amz-SignedHeaders=host&x-id=GetObject",
      },
      {
        id: "1003",
        title: "Dallas",
        date: "June 20, 2022",
        coverImage:
          "https://amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com/travel/travel/20220719_135921.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA45Y2R5CYDJD7UYE5%2F20250108%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20250108T160042Z&X-Amz-Expires=600&X-Amz-Signature=530dac8161f4291ab7afb289770028f5b8c510d525a637a2012a3da2ea719305&X-Amz-SignedHeaders=host&x-id=GetObject",
      },
      {
        id: "1004",
        title: "Colorado",
        date: "June 20, 2022",
        coverImage:
          `https://amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com/travel/travel/20220719_130713.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA45Y2R5CYDJD7UYE5%2F20250108%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20250108T155327Z&X-Amz-Expires=600&X-Amz-Signature=23c08daf44068a5dab36a5a25708fcfcd03779b5fb1c00d8361ff987e88fc0b1&X-Amz-SignedHeaders=host&x-id=GetObject
`,
      },
      {
        id: "1005",
        title: "Washington",
        date: "June 20, 2022",
        coverImage:
          `https://amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com/travel/travel/20220721_165946.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA45Y2R5CYDJD7UYE5%2F20250108%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20250108T155327Z&X-Amz-Expires=600&X-Amz-Signature=33563c55b2e1da9c11a03c9882234d194e4bcabeb27466c2e7f645c596ec72cd&X-Amz-SignedHeaders=host&x-id=GetObject`,
      },
      {
        id: "1006",
        title: "Florida",
        date: "June 20, 2022",
        coverImage:
          "https://amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com/travel/travel/20231223_130618.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA45Y2R5CYDJD7UYE5%2F20250108%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20250108T155952Z&X-Amz-Expires=600&X-Amz-Signature=773ce4bbb0c2e97d6d60da2414be9a0c5a7e8e32b5e56d80e59e635c24a42829&X-Amz-SignedHeaders=host&x-id=GetObject",
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

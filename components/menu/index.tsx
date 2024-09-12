import Image from "next/image";
import { useRouter } from "next/router";
import { forwardRef, useState } from "react";
import styles from "./_.module.scss";

const Menu = forwardRef(() => {
  const [isShow, setShow] = useState<boolean>(false);
  const router = useRouter();

  const movePage = (link: string) => {
    setShow((prev) => !prev);
    router.push(link);
  };
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`w-10 h-10 ${styles.menuIcon}`}
        onClick={() => !isShow && setShow((prev) => !prev)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
        />
      </svg>
      <div className={`${styles.menu} ${isShow && styles.active}`}>
        <div className={styles.menuCard} onClick={() => movePage("/about-me")}>
          {isShow && (
            <div
              className={styles.close}
              onClick={(e) => {
                setShow(!isShow);
                e.stopPropagation();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
          <div className={styles.menuCardPhoto}>
              <div className={styles.menuCardPhotoBgc}></div>
              <div className={styles.menuCardPhotoInside}></div>
              <Image
                    src="/author.png"
                    alt=""
                    width={64}
                    height={64}
                    className={styles.image}
                />
          </div>
          <p>Tác giả</p>
        </div>
        <div className={styles.menuCard} onClick={() => movePage("/rules")}>
        <div className={styles.menuCardPhoto}>
              <div className={styles.menuCardPhotoBgc}></div>
              <div className={styles.menuCardPhotoInside}></div>
              <Image
                    src="/rules.png"
                    alt=""
                    width={64}
                    height={64}
                    className={styles.image}
                />
          </div>
          <p>Nguyên tắc</p>
        </div>
        <div
          className={styles.menuCard}
          onClick={() => movePage("/how-to-learn")}
        >
          <div className={styles.menuCardPhoto}>
              <div className={styles.menuCardPhotoBgc}></div>
              <div className={styles.menuCardPhotoInside}></div>
              <Image
                    src="/user-guide.png"
                    alt=""
                    width={64}
                    height={64}
                    className={styles.image}
                />
          </div>
          <p>Cách học</p>
        </div>
        <div className={styles.menuCard} onClick={() => movePage("/table-age")}>
        <div className={styles.menuCardPhoto}>
              <div className={styles.menuCardPhotoBgc}></div>
              <div className={styles.menuCardPhotoInside}></div>
              <Image
                    src="/learning.png"
                    alt=""
                    width={64}
                    height={64}
                    className={styles.image}
                />
          </div>
          <p>Học</p>
        </div>
      </div>
    </>
  );
});

export default Menu;

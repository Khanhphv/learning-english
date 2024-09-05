import Image from "next/image";
import Layout from "components/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./_.module.scss";
type tocData = {
  id: number;
  content: string;
  image: string;
  src: string;
};

const tocs: tocData[] = [
  {
    id: 2,
    content: "Lứa tuổi: 3",
    image: "/table-of-contents/hello.png",
    src: "/group-age/age3",
  },
  {
    id: 3,
    content: "Lứa tuổi: 4",
    image: "/table-of-contents/one-hundred.png",
    src: "/group-age/age4",
  },
  {
    id: 4,
    content: "Lứa tuổi: 5",
    image: "/table-of-contents/one-hundred.png",
    src: "/group-age/age5",
  },
  {
    id: 5,
    content: "Lứa tuổi: 6",
    image: "/table-of-contents/number-blocks.png",
    src: "/group-age/age6",
  },
  {
    id: 6,
    content: "Lứa tuổi: 7",
    image: "/table-of-contents/schedule.png",
    src: "/group-age/age7",
  },
  {
    id: 7,
    content: "Lứa tuổi: 8",
    image: "/table-of-contents/color-palette.png",
    src: "/group-age/age8",
  },
  {
    id: 8,
    content: "Lứa tuổi: 9",
    image: "/table-of-contents/family.png",
    src: "/group-age/age9",
  },
  {
    id: 9,
    content: "Lứa tuổi: 10",
    image: "/table-of-contents/house.png",
    src: "/group-age/age10",
  },
  {
    id: 10,
    content: "Lứa tuổi: 11",
    image: "/table-of-contents/school.png",
    src: "/group-age/age11",
  },
  {
    id: 11,
    content: "Lứa tuổi: 12",
    image: "/table-of-contents/presentation.png",
    src: "/group-age/age12",
  },
];

const TableOfContents = () => {
  const router = useRouter();

  const moveOnPage = (link: string) => {
    router.push(link);
  };

  return (
    <div id={styles.content}>
      <Head>
        <title>Mục lục</title>
      </Head>
      <div id={styles.tocContainer} className={styles.noBullets}>
        <p className={styles.tocTitle}>Học theo lứa tuổi</p>
        <ul className={styles.tocList}>
          {tocs.map((tocs) => (
            <li key={`toc_${tocs.id}`}>
              <div className={styles.a} onClick={() => router.push(tocs.src)}>
                <span className={styles.tocNumber}></span> {tocs.content}
                <Image
                  src={tocs.image}
                  alt=""
                  width={24}
                  height={24}
                  className={styles.image}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div id={styles.practice}>
        <span>Ôn tập</span>
        <div
          className={styles.practiceItem}
          onClick={() => {
            moveOnPage("/love");
          }}
        >
          <p>Danh sách yêu thích</p>
        </div>

        <div
          className={styles.practiceItem}
          onClick={() => {
            moveOnPage("/practice");
          }}
        >
          <h2>Ôn tập từ vựng</h2>
          <p style={{ color: "#7f7f7f" }}>Tổng từ vựng: 1000</p>
        </div>
      </div>
    </div>
  );
};
TableOfContents.getLayout = Layout;
export default TableOfContents;

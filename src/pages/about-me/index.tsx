import React, { useRef } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import styles from "./_.module.scss";
import Head from "next/head";
import Layout from "components/layout";
// Little helpers ...
const url = (name: string, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

export default function AboutMe() {
  const parallax = useRef<IParallax>(null!);
  return (
    <>
      <Head>
        <title>Giới thiệu</title>
      </Head>
      <div className={styles.container}>
        <Parallax ref={parallax} pages={3}>
          <ParallaxLayer offset={1} speed={1} className={styles.section1} />
          <ParallaxLayer offset={2} speed={1} className={styles.section2} />

          <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            style={{
              backgroundImage: url("stars", true),
              backgroundSize: "cover",
            }}
          />

          <ParallaxLayer
            offset={1.3}
            speed={-0.3}
            style={{ pointerEvents: "none" }}
          >
            <img
              src={url("satellite4")}
              style={{ width: "15%", marginLeft: "70%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
            <img
              src={url("cloud")}
              style={{ display: "block", width: "20%", marginLeft: "55%" }}
            />
            <img
              src={url("cloud")}
              style={{ display: "block", width: "10%", marginLeft: "15%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
            <img
              src={url("cloud")}
              style={{ display: "block", width: "20%", marginLeft: "70%" }}
            />
            <img
              src={url("cloud")}
              style={{ display: "block", width: "20%", marginLeft: "40%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            <img
              src={url("cloud")}
              style={{ display: "block", width: "10%", marginLeft: "10%" }}
            />
            <img
              src={url("cloud")}
              style={{ display: "block", width: "20%", marginLeft: "75%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
            <img
              src={url("cloud")}
              style={{ display: "block", width: "20%", marginLeft: "60%" }}
            />
            <img
              src={url("cloud")}
              style={{ display: "block", width: "25%", marginLeft: "30%" }}
            />
            <img
              src={url("cloud")}
              style={{ display: "block", width: "10%", marginLeft: "80%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
            <img
              src={url("cloud")}
              style={{ display: "block", width: "20%", marginLeft: "5%" }}
            />
            <img
              src={url("cloud")}
              style={{ display: "block", width: "15%", marginLeft: "75%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2.5}
            speed={-0.4}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <img src={url("earth")} style={{ width: "30%" }} />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0.3}
            style={{
              backgroundSize: "80%",
              backgroundPosition: "center",
            }}
          />

          <ParallaxLayer
            offset={0}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(1)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <img src={url('server')} style={{ width: '20%' }} /> */}
            <div className={styles.content1}>
              <p>Bạn lo lắng con của mình không thể học tốt tiếng anh?</p>
              <p>
                Bạn nghĩ mình phải mất rất nhiều thời gian và tiền bạc mới có
                thể giỏi tiếng anh?
              </p>
              <p>
                Bạn cũng đã tự học hay học ở nhiều trung tâm nhưng tiếng anh vẫn
                chưa thể nói tốt?
              </p>
              <p>
                Bạn đang làm nhân viên bình thường và tự biết phải học tiếng anh
                để thăng tiến,
                <br /> nâng lương nhưng bản thân thì mãi không bắt tay vào học,
                hoặc học mãi mà vẫn không nghe nói được?
              </p>
              <p>
                Bạn đã quá mệt mỏi, nhiều lần bỏ cuộc với việc học tiếng anh của
                mình?
              </p>
              <p>
                Hãy để tôi giúp bạn! Cuốn sách này được thiết kế giành riêng cho
                bạn.
              </p>
              <p>
                Sách dành cho các bạn muốn nghe nói tốt tiếng anh trong 6 tháng.
              </p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={1}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(2)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <img src={url('bash')} style={{ width: '40%' }} /> */}
            <div className={styles.content1}>
              <p>
                Tôi là Hải Nguyễn, một nhà quản lý trong lĩnh vực công nghệ
                thông tin. <br />
                Tôi có thể nghe nói tốt tiếng Anh, tiếng Nhật, tiếng Trung.
                <br /> Tôi học ngoại ngữ ban đầu là vì tiền, vì muốn bản thân
                được thăng tiến, <br /> có thể đảm nhiệm vị trí cao hơn trong
                công ty.
              </p>
              <p>
                Kinh nghiệm bản thân học tiếng Nhật trong 9 tháng từ con số 0
                tới trình độ N2,
                <br /> học tiếng anh trong 3 tháng từ trình độ sơ cấp lên trên
                trung cấp.
                <br /> Và thời điểm tôi bắt đầu viết cuốn sách này tôi bắt đầu
                học tiếng Trung <br /> và tôi tự tin sau khi cuốn sách này được
                xuất bản tôi có thể nói tốt tiếng Trung.
              </p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => parallax.current.scrollTo(0)}
          >
            <div className={`${styles.content1} ${styles.textBlack}`}>
              <p>
                Qua quá trình làm việc, gặp gỡ bạn bè người thân <br /> tôi đã
                thấy các bạn trẻ vật lộn trong việc học tiếng anh,
                <br /> các ông bố bà mẹ trăn trở cho con học ở trung tâm nào,
                học ngữ pháp hay nghe nói trước...
              </p>
              <p>
                Đặc biệt là chi phí học tiếng anh còn quá đắt ở VIệt Nam <br />
                trong khi nó phải là ngôn ngữ phổ cập của học sinh sinh viên{" "}
                <br /> thì chúng ta mới hi vọng con đường sự nghiệp sau này dễ
                dàng, thuận lợi.
              </p>
              <p>Đó chính là lý do tôi hạ quyết tâm viết cuốn sách này.</p>
              <p>
                Cuốn sách này dành cho các bạn muốn đạt được nghe, nói tự tin
                trước người bản xứ <br /> trong thời gian ngắn.( 6 tháng ) với
                chi phí bằng 1 cốc Cafe.
              </p>
              <p>
                Cuốn sách không dành cho các bạn muốn dùng 1 ngôn ngữ tiếng anh
                <br />
                đúng ngữ pháp, từ vựng hay, khó, <br />
                và không dành cho các bạn muốn thi chứng chỉ tiếng anh trong
                thời gian ngắn.
              </p>
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>
    </>
  );
}

// AboutMe.getLayout = Layout;

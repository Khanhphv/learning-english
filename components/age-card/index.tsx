import AgeCard from "components/age-card";
import * as React from "react";
import styles from "./_.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"; // Import module.scss
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Layout from "components/layout";
import { useRouter } from "next/router";
const AgeCardView = () => {
  const router = useRouter();

  const ageCards = [
    { id: "age3", image: "../age-images/age3.png" },
    { id: "age4", image: "../age-images/age4.png" },
    { id: "age5", image: "../age-images/age5.png" },
    { id: "age6", image: "../age-images/age6.png" },
    { id: "age7", image: "../age-images/age7.png" },
    { id: "age8", image: "../age-images/age8.png" },
    { id: "age9", image: "../age-images/age9.png" },
    { id: "age10", image: "../age-images/age10.png" },
    { id: "age11", image: "../age-images/age11.png" },
    { id: "age12", image: "../age-images/age12.png" },
  ];

  return (
    <div
      className={`${styles.listAgeContainer} container mx-auto px-14  text-center`}
    >
      <div className={styles.title}>How old are you?</div>
      <div className={styles.description}>(Bạn bao nhiêu tuổi?)</div>
      <Swiper
        className={styles.sliderContainer}
        modules={[A11y, Navigation, Pagination, Scrollbar]}
        spaceBetween={30}
        slidesPerView="auto"
        navigation
        scrollbar={{ draggable: true }}
        breakpoints={{
          668: { slidesPerView: 2 },
          768: { slidesPerView: 3, spaceBetween: 5 },
          1024: { slidesPerView: 3 },
        }}
      >
        {ageCards.map((ageCard) => (
          <SwiperSlide key={ageCard.id} className={styles.slide}>
            <div>
              <div className="relative flex items-center justify-center">
                <img className="rounded-2xl mb-4" src={ageCard.image} alt="" />
                <button onClick={() => router.push(`learning-content/${ageCard.id}`)}>Learn</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AgeCardView;

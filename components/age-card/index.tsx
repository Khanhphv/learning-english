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
const AgeCardView = () => {
  const ageCards = [
    { id: 1, image: "../age-images/age3.png" },
    { id: 2, image: "../age-images/age4.png" },
    { id: 3, image: "../age-images/age5.png" },
    { id: 4, image: "../age-images/age6.png" },
    { id: 5, image: "../age-images/age7.png" },
    { id: 6, image: "../age-images/age8.png" },
    { id: 7, image: "../age-images/age9.png" },
    { id: 8, image: "../age-images/age10.png" },
    { id: 9, image: "../age-images/age11.png" },
    { id: 10, image: "../age-images/age12.png" },
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
                <button className="">Learn</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AgeCardView;

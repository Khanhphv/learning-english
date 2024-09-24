import AgeCard from "components/age-card";
import  React, { useRef } from "react";
import styles from "./_.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"; // Import module.scss
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Layout from "components/layout";
import { useRouter } from "next/router";
import useSwr from "swr";
import { toast } from "sonner";
import { type } from "os";
const AgeCardView = () => {
  type AgeGroup = {
    id: string;
    name: string;
    image: string;
  };

  const router = useRouter();
  const ageGroups = useRef<AgeGroup[]>([]);
  const { data, error, isLoading } = useSwr("/age-group", {
    revalidateOnMount: true,
  });

  if (error) {
    toast.error(error.message);
  }

  if (data && data.result) {
    ageGroups.current = data.result;
  }


  
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
        {ageGroups.current.map((ageCard: AgeGroup) => (
          <SwiperSlide key={ageCard.id} className={styles.slide}>
            <div>
              <div className="relative flex items-center justify-center">
                <img className="rounded-2xl mb-4" src={ageCard.image} alt="" />
                <button
                  onClick={() => router.push(`learning-content/${ageCard.id}`)}
                >
                  Learn
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AgeCardView;

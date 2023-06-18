import { Swiper, SwiperSlide } from 'swiper/react';
import { FaBeer } from 'react-icons/fa';


import "swiper/css";
import "swiper/css/navigation";
import './PostCard.css';

import { Navigation } from "swiper";
const PostCard = ({ post }) => {

    console.log(post);

    const { title, img } = post


    return (
        <div className="bg-white rounded-lg w-full swiper-bg shadow-md">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                navigation={true}
                loop={true}
                modules={[Navigation]}
                className='w-full'
            >
                {
                    img.map(i => <SwiperSlide key={i}>
                        <img className='lg:max-h-44 max-h-32 w-full object-cover rounded-[8px_8px_0px_0px]' src={i} alt="" />
                    </SwiperSlide>)
                }
            </Swiper>
            <div className='p-3'>
                <h1>{title}</h1>
            </div>
        </div>
    );
};

export default PostCard;
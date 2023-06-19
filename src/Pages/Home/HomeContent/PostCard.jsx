import { Swiper, SwiperSlide } from 'swiper/react';
import { FaBath, FaBed, FaBeer } from 'react-icons/fa';


import "swiper/css";
import "swiper/css/navigation";
import './PostCard.css';

import { Navigation } from "swiper";
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
    const navigate = useNavigate()
    const { _id, title, img, rooms, bathrooms, rent } = post


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
            <div onClick={() => navigate(`/post/${_id}`)} className='p-3 space-y-2 cursor-pointer'>
                <h1 className='text-xl font-semibold line-clamp-2'>{title}</h1>
                <p>BDT <span className='text-green-500'>{rent}</span>/ per month</p>
                <div className='gap-4 flex'>
                    {
                        rooms !== 0 && <div className='flex gap-2 items-center'>
                            <FaBed></FaBed>
                            {rooms}
                        </div>
                    }
                    {
                        bathrooms !== 0 && <div className='flex gap-2 items-center'>
                            <FaBath></FaBath>
                            {bathrooms}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default PostCard;
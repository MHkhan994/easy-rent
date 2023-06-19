import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';


import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper";

const Post = () => {
    const id = useParams().id

    const { data: post = {}, isLoading: postLoading } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/post/${id}`)
            return res.data
        }
    })

    const { img } = post
    console.log(img);

    if (postLoading) {
        return <div>
            <h1>loading</h1>
        </div>
    }

    return (
        <div className="my-container min-h-screen pt-10">
            <div className="flex justify-center">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false
                    }}
                    loop={true}
                    modules={[Navigation, Autoplay]}
                    className='lg:w-3/5 w-2/3'
                >
                    {
                        img.map(i => <SwiperSlide key={i}>
                            <img className='w-full object-cover rounded-lg' src={i} alt="" />
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Post;
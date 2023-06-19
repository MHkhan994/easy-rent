import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import PostCard from "./PostCard";
import { useQuery } from "@tanstack/react-query";


const HomeContent = () => {

    const [beds, setBeds] = useState('')
    const [maxPrice, setMaxPrice] = useState()
    const [minPrice, setMinPrice] = useState(0)
    const [baths, setBaths] = useState('')
    const [seats, setSeats] = useState('')
    const [type, setType] = useState('')
    const [roomFacilities, setRoomFacilities] = useState('')
    const [otherFacilities, setOtherFacilities] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5000/posts/max-price')
            .then(res => {
                setMaxPrice(res.data.price)
            })
    }, [])

    const { data: posts = [] } = useQuery({
        queryKey: ['posts', type, beds, baths, otherFacilities, maxPrice, minPrice],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/posts', {
                params: {
                    type,
                    beds,
                    baths,
                    otherFacilities,
                    maxPrice,
                    minPrice
                }
            })
            return res.data
        }
    })

    console.log(maxPrice);

    return (
        <div className="lg:grid grid-cols-[1fr_3fr] gap-10 relative transition-all">
            <SideBar
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                beds={beds}
                setBeds={setBeds}
                baths={baths}
                setBaths={setBaths}
                seats={seats}
                setSeats={setSeats}
                type={type}
                setType={setType}
                roomFacilities={roomFacilities}
                setRoomFacilities={setRoomFacilities}
                otherFacilities={otherFacilities}
                setOtherFacilities={setOtherFacilities}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
            ></SideBar>


            <div>
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
                    {
                        posts.map(post => <PostCard key={post._id} post={post}></PostCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default HomeContent;
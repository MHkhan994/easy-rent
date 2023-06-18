import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import PostCard from "./PostCard";


const HomeContent = () => {

    const [posts, setPosts] = useState([])

    const [beds, setBeds] = useState('')
    const [baths, setBaths] = useState('')
    const [seats, setSeats] = useState('')
    const [type, setType] = useState('')
    const [roomFacilities, setRoomFacilities] = useState('')
    const [otherFacilities, setOtherFacilities] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then(res => {
                setPosts(res.data)
            })
    }, [])

    console.log(posts);

    return (
        <div className="lg:grid grid-cols-[1fr_3fr] gap-10 relative transition-all">
            <SideBar
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
            ></SideBar>


            <div className="min-h-screen grid lg:grid-cols-3 grid-cols-2 gap-4">
                {
                    posts.map(post => <PostCard key={post._id} post={post}></PostCard>)
                }
            </div>
        </div>
    );
};

export default HomeContent;
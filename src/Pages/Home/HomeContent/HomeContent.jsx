import SideBar from "./SideBar";


const HomeContent = () => {

    return (
        <div className="lg:grid grid-cols-[1fr_3fr] gap-10 relative transition-all">
            <SideBar></SideBar>
            <div className="bg-white h-screen">
            </div>
        </div>
    );
};

export default HomeContent;
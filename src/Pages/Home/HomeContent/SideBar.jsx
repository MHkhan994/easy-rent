import { useEffect, useRef, useState } from "react";

const SideBar = ({ beds, setBeds, baths, setBaths, roomFacilities, setRoomFacilities, seats, setSeats, setOtherFacilities, otherFacilities, type, setType }) => {


    const filterRef = useRef(null)

    const [isOpen, setIsOpen] = useState(false)

    const numOfBeds = [1, 2, 3, 4, 5, 6, 7]
    const numOfBaths = [1, 2, 3, 4, 5, 6]
    const numOfSeats = [1, 2, 3]
    const numOfTypes = ['apartment', 'room', 'seat']
    const allRoomFacilities = ['bath', 'balcony']
    const allOtherFacilities = ['lift', 'garage']


    const handleBedFilter = num => {
        if (beds.includes(num)) {
            const filterBeds = beds.filter(bed => bed !== num)
            setBeds(filterBeds)
        }
        else {
            setBeds([...beds, num])
        }
    }

    const handleBathFilter = num => {
        if (baths.includes(num)) {
            const filterBaths = baths.filter(bath => bath !== num)
            setBaths(filterBaths)
        }
        else {
            setBaths([...baths, num])
        }
    }

    const handleRoomFilter = facility => {
        if (roomFacilities.includes(facility)) {
            const filterFacilities = roomFacilities.filter(f => f !== facility)
            setRoomFacilities(filterFacilities)
        }
        else {
            setRoomFacilities([...roomFacilities, facility])
        }
    }

    const handleSeatFilter = num => {
        if (seats.includes(num)) {
            const filterSeats = seats.filter(seat => seat !== num)
            setSeats(filterSeats)
        }
        else {
            setSeats([...seats, num])
        }
    }

    const handleFacilityFilter = facility => {
        if (otherFacilities.includes(facility)) {
            const filterFacilities = otherFacilities.filter(f => f !== facility)
            setOtherFacilities(filterFacilities)
        }
        else {
            setOtherFacilities([...otherFacilities, facility])
        }
    }

    const handleTypeFilter = type => {
        if (type === 'room' || type === 'seat') {
            setBaths('')
            setBeds('')
        }
        if (type === 'apartment' || type === 'room') {
            setSeats('')
        }

        if (type === 'apartment' || type === 'seat') {
            setRoomFacilities('')
        }
        setType(t)
    }



    useEffect(() => {
        const handler = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);


    return (
        <div className="capitalize">
            <div className="bg-white min-h-screen lg:flex flex-col gap-5 hidden px-3 rounded-lg">
                <h1 className="text-center text-2xl font-semibold pt-4">Filter</h1>

                <div className="flex justify-between">
                    {
                        numOfTypes.map(ty => <button key={ty} onClick={() => handleTypeFilter(ty)} className={type === ty ? "border-green-800 border bg-green-200 rounded-lg py-1 px-3" : "border-green-800 border rounded-lg py-1 px-3"}>
                            {ty}
                        </button>)
                    }
                </div>



                {/*renders filters relevent to type apartment */}
                {
                    type === 'apartment' && <>
                        {/* filter beds */}
                        <div>
                            <h2 className="text-xl font-semibold py-2">Beds:</h2>
                            <div className="flex gap-3 flex-wrap">
                                {numOfBeds.map(num => {
                                    return <div key={num}>
                                        <button
                                            onClick={() => handleBedFilter(num)}
                                            className={beds.includes(num) ? "border border-green-700 bg-green-200 rounded-xl px-5 py-2" : "border rounded-xl px-5 py-2"}>

                                            {num !== 7 ? num : `${num}+`}
                                        </button>
                                    </div>
                                })}
                            </div>
                        </div>

                        {/* filter baths */}
                        <div>
                            <h2 className="text-xl font-semibold py-2">Baths:</h2>
                            <div className="flex gap-3 flex-wrap">
                                {numOfBaths.map(num => {
                                    return <div key={num}>
                                        <button
                                            onClick={() => handleBathFilter(num)}
                                            className={baths.includes(num) ? "border border-green-700 bg-green-200 rounded-xl px-5 py-2" : "border rounded-xl px-5 py-2"}>

                                            {num !== 6 ? num : `${num}+`}
                                        </button>
                                    </div>
                                })}
                            </div>
                        </div>
                    </>
                }


                {/* renders filters relevent to room */}
                {
                    type === 'room' && <>
                        <div>
                            <h2 className="text-xl font-semibold py-2">Room Facilities:</h2>
                            <div className="flex gap-3 flex-wrap">
                                {allRoomFacilities.map(num => {
                                    return <div key={num}>
                                        <button
                                            onClick={() => handleRoomFilter(num)}
                                            className={roomFacilities.includes(num) ? "border border-green-700 bg-green-200 rounded-xl px-5 py-2" : "border rounded-xl px-5 py-2"}>
                                            {num !== 6 ? num : `${num}+`}
                                        </button>
                                    </div>
                                })}
                            </div>
                        </div>
                    </>
                }

                {/* renders filters relevent to room */}
                {
                    type === 'seat' && <>
                        <div>
                            <h2 className="text-xl font-semibold py-2">seats:</h2>
                            <div className="flex gap-3 flex-wrap">
                                {numOfSeats.map(num => {
                                    return <div key={num}>
                                        <button
                                            onClick={() => handleSeatFilter(num)}
                                            className={seats.includes(num) ? "border border-green-700 bg-green-200 rounded-xl px-5 py-2" : "border rounded-xl px-5 py-2"}>
                                            {num !== 3 ? num : `${num}+`}
                                        </button>
                                    </div>
                                })}
                            </div>
                        </div>
                    </>
                }


                {/* renders filters relevent to other facilities */}
                <div>
                    <h2 className="text-xl font-semibold py-2">Other Facilities:</h2>
                    <div className="flex gap-3 flex-wrap">
                        {allOtherFacilities.map(facility => {
                            return <div key={facility}>
                                <button
                                    onClick={() => handleFacilityFilter(facility)}
                                    className={otherFacilities.includes(facility) ? "border border-green-700 bg-green-200 rounded-xl px-5 py-2" : "border rounded-xl px-5 py-2"}>
                                    {facility !== 3 ? facility : `${facility}+`}
                                </button>
                            </div>
                        })}
                    </div>
                </div>


            </div>














            {/* phone */}
            <div ref={filterRef} className="flex lg:hidden relative transition-all bg-gray-100">
                <button onClick={() => setIsOpen(true)} className="bg-white shadow-sm border px-5 py-2">filter</button>
                {
                    isOpen && <div className="bg-blue-200 w-full absolute left-0 z-20 top-10 p-4">
                        <button onClick={() => setIsOpen(false)}>
                            close
                        </button>
                        <div>
                            <h2 className="text-xl font-semibold py-2">Beds:</h2>
                            <div className="flex gap-3 flex-wrap">
                                {numOfBeds.map(num => {
                                    return <div key={num}>
                                        <button
                                            onClick={() => handleBedFilter(num)}
                                            className={beds.includes(num) ? "border border-green-700 bg-green-200 rounded-xl px-5 py-2" : "border rounded-xl px-5 py-2"}>

                                            {num !== 7 ? num : `${num}+`}
                                        </button>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold py-2">Baths:</h2>
                            <div className="flex gap-3 flex-wrap">
                                {numOfBaths.map(num => {
                                    return <div key={num}>
                                        <button
                                            onClick={() => handleBathFilter(num)}
                                            className={baths.includes(num) ? "border border-green-700 bg-green-200 rounded-xl px-5 py-2" : "border rounded-xl px-5 py-2"}>

                                            {num !== 7 ? num : `${num}+`}
                                        </button>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default SideBar;
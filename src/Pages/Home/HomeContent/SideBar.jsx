import { useEffect, useRef, useState } from "react";
import { GrClose } from 'react-icons/gr';

const SideBar = ({ beds, setMinPrice, minPrice, setBeds, baths, setMaxPrice, maxPrice, setBaths, roomFacilities, setRoomFacilities, seats, setSeats, setOtherFacilities, otherFacilities, type, setType }) => {


    const filterRef = useRef(null)

    const [isOpen, setIsOpen] = useState(false)

    const numOfBeds = [1, 2, 3, 4, 5, 6, 7]
    const numOfBaths = [1, 2, 3, 4, 5, 6]
    const numOfSeats = [1, 2, 3]
    const numOfTypes = ['Apartment', 'Room', 'Seat']
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

    const handleTypeFilter = ty => {
        if (type === ty) {
            setType('')
        }
        else {
            if (ty === 'Room' || ty === 'Seat') {
                setBaths('')
                setBeds('')
            }
            if (ty === 'Apartment' || ty === 'Room') {
                setSeats('')
            }

            if (ty === 'Apartment' || ty === 'Seat') {
                setRoomFacilities('')
            }
            setType(ty)
        }
    }

    const handleFilterReset = () => {
        setType('')
        setBaths('')
        setBeds('')
        setRoomFacilities('')
        setOtherFacilities('')
        setSeats('')
        setIsOpen(false)
        setMaxPrice(maxPrice)
    }


    function validateMinInput(event) {
        const input = event.target;
        const key = event.key;

        // Check if the minus sign is typed as the first character
        if (key === "-") {
            event.preventDefault();
        }

        setMinPrice(input.value)
    }

    function validateMaxInput(event) {
        const input = event.target;
        const key = event.key;

        // Check if the minus sign is typed as the first character
        if (key === "-") {
            event.preventDefault();
        }

        setMaxPrice(input.value)
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


    // --------------------------------------------------filter div---------------------------------
    const filters = <div className="flex flex-col gap-3">
        <h1 className="text-center text-2xl font-semibold pt-4 hidden lg:block">Filter</h1>
        <div>
            <h2 className="text-xl font-semibold py-2">Price:</h2>
            <div className="ps-4 pb-2">
                <div className="flex flex-col gap-1">
                    <label className="label">
                        <span className="text-md font-semibold">Min</span>
                    </label>
                    <input onChange={validateMinInput} type="number" min={0} max={maxPrice} defaultValue={0} className="h-10 px-3 border" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="label">
                        <span className="text-md font-semibold">Max</span>
                    </label>
                    <input onChange={validateMaxInput} type="number" min={0} max={maxPrice} defaultValue={maxPrice} className="h-10 px-3 border" />
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <h2 className="text-xl font-semibold py-2">Type:</h2>
            <div className="space-x-2">
                {
                    numOfTypes.map(ty => <button key={ty} onClick={() => handleTypeFilter(ty)} className={type === ty ? "border-green-800 border bg-green-200 rounded-lg py-1 px-3" : "border-green-800 border rounded-lg py-1 px-3"}>
                        {ty}
                    </button>)
                }
            </div>
        </div>
        {/*renders filters relevent to type apartment */}
        {
            type === 'Apartment' && <>
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
            type === 'Room' && <>
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
            type === 'Seat' && <>
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
        <div className="flex justify-center">
            <button onClick={handleFilterReset} className="bg-green-600 px-5 py-2 text-white rounded-lg">Reset</button>
        </div>
    </div>


    return (
        <div className="capitalize">
            <div className="bg-white min-h-screen lg:flex flex-col hidden px-3 rounded-lg">
                {filters}
            </div>

            {/* phone */}
            <div ref={filterRef} className="flex lg:hidden relative transition-all bg-gray-100">
                <button onClick={() => setIsOpen(!isOpen)} className="bg-white shadow-sm border mb-2 px-5 py-2">filter</button>
                {
                    isOpen && <div className="bg-white w-full absolute left-0 z-20 top-10 p-4">
                        <div className="flex justify-end">
                            <button onClick={() => setIsOpen(false)}>
                                <GrClose></GrClose>
                            </button>
                        </div>

                        {filters}
                    </div>
                }
            </div>
        </div>
    );
};

export default SideBar;
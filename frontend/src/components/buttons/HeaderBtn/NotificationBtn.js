'use client'
import {IoNotifications} from "react-icons/io5";
import {useState} from "react";

export default function NotificationBtn() {

    const [isNotification, setIsNotification] = useState(true);

    return (
        <div
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white text-black cursor-pointer">
            <IoNotifications size={25}/>
            {isNotification ?
                <>
                    <span className="absolute inline-flex size-2 animate-ping rounded-full bg-red-400 opacity-90 top-2 right-3 -translate-x-1/5"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-red-500 -top-2 -left-2.5"></span>
                </>
                : null
            }
        </div>
    )
}
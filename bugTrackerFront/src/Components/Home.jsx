import { useState } from "react"
import Login from "./Login"


export default function Home() {

    return(
        
        <div className="bg-gray-950"> 
        <nav className="flex justify-around items-center h-14 bg-gray-700 px-4">
            <div>
            <h1 className="text-3xl text-white font-bold">
                <a href="https://www.google.com"><i>BugTracker</i></a>
            </h1>
            </div>
    
            <div>
            <ul className="hidden md:flex gap-6">
                <li className="text-white cursor-pointer">Roles</li>
                <li className="text-white cursor-pointer">Projects</li>
                <li className="text-white cursor-pointer">Notifications</li>
                <li className="text-white cursor-pointer">Others</li>
            </ul>

            <div className="md:hidden">
                <a href="#" className="text-3xl">&#8801;</a>
            </div>
            </div>

        </nav>
        <Login />
        
    </div>


    )
}

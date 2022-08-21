import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Landing()
{
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    return(
        <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
            <p className="text-3xl text-gray-700 font-bold mb-5">
                Welcome!
            </p>
            <p className="text-green-500 text-lg">
                There's nothing here yet but I'm workin on it
            </p>
        </div>
    );
}

export default Landing;
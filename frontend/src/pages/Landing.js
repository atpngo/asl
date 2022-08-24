import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sign from "../components/Sign";
import SlidingButton from "../components/SlidingButton";

function Landing()
{
    const navigate = useNavigate();
    const signfingo_letters = 'SIGNFINGO'.split("");

    useEffect(() => {
    }, []);

    return(
        <div className="flex flex-col gap-20 h-screen border-10 justify-center items-center">
            <div className="flex flex-col items-center gap-4 text-center lg:gap-10">
                    <p className="text-6xl lg:text-9xl text-green-header hover:scale-[1.1] duration-300">Signfingo</p>
                    <div className="flex flex-row gap-1">
                        {signfingo_letters.map((letter, index) => <Sign color="#30B700" className="w-8 lg:w-20" value={letter} key={index}/>)}
                    </div>
                    <p className="lg:text-xl">Learn how to <b>SIGN</b> with your <b>FING</b>ers hahahahhahahahahah</p>
            </div>

            <div className="flex flex-col max-w-full items-center gap-4 lg:flex-row">
                <SlidingButton color="#8EF160" onClick={() => navigate('/practice')}>
                    PRACTICE
                </SlidingButton>
                <SlidingButton color="#49B17F" onClick={() => navigate('/learn')}>
                    LEARN
                </SlidingButton>
            </div>
        </div>
    );
}

export default Landing;
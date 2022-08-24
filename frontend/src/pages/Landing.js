import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sign from "../components/Sign";
import SlidingButton from "../components/SlidingButton";
import { motion } from "framer-motion";

function Landing()
{
    const navigate = useNavigate();
    const signfingo_letters = 'SIGNFINGO'.split("");

    useEffect(() => {
    }, []);

    return(
        <motion.div 
            key="landing"
            initial={{x: 0, opacity: 0, scale: 0.9}}
            animate={{x: 0, opacity: 1, scale: 1}}
            transition={{duration: 0.5, ease: "easeOut"}}
            className="flex flex-col gap-20 h-screen justify-center items-center">
            <motion.div 
                key="landing-title"
                initial={{scale: 2}}
                animate={{scale: 1}}
                className="flex flex-col items-center gap-4 text-center lg:gap-10">
                    <p className="text-6xl lg:text-9xl text-green-header hover:scale-[1.1] duration-300">Signfingo</p>
                    <div className="flex flex-row gap-1">
                        {signfingo_letters.map((letter, index) => <Sign color="#30B700" className="w-8 lg:w-20" value={letter} key={index}/>)}
                    </div>
                    <p className="lg:text-xl">Learn how to <b>SIGN</b> with your <b>FING</b>ers hahahahhahahahahah</p>
            </motion.div>

            <div className="flex flex-col max-w-full items-center gap-4 lg:flex-row">
                <SlidingButton color="#8EF160" onClick={() => navigate('/practice')}>
                    PRACTICE
                </SlidingButton>
                <SlidingButton color="#49B17F" onClick={() => navigate('/learn')}>
                    LEARN
                </SlidingButton>
            </div>
        </motion.div>
    );
}

export default Landing;
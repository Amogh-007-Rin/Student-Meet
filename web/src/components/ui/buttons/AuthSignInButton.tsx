'use client'

import { motion } from "framer-motion";

interface AuthSignInButtonProps {
    iconSrc: string;
    className?: string;
}

export default function AuthSignInButton({ iconSrc, className }: AuthSignInButtonProps) {
    return (
        <motion.button
            whileHover="hover"
            className="w-24 h-24 bg-[#09090B] hover:bg-[#0f0f11] border border-[#1C1C1F] rounded-full flex justify-center items-center"
        >
            <motion.div className="w-full h-full bg-[#09090B] hover:bg-[#0f0f11] rounded-full flex justify-center items-center"
                variants={{
                    hover: {
                        rotate: [0, 25, -25, 20, -20, 0],
                        transition: { duration: 0.5 },
                    },
                }}
                >
                    <img src={iconSrc} alt="" className={className} style={{ filter: 'brightness(0) invert(1)' }} />
            </motion.div>
        </motion.button>
    );
};
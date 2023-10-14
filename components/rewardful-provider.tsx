"use client";

import { useEffect } from "react";

export const RewardfulProvider = () => {
    useEffect(() => {
        (function(w:any ,r){
            w._rwq = r;
            w[r] = w[r] || function() {
                (w[r].q = w[r].q || []).push(arguments)
            }
        })(window, 'rewardful');
        
        let s = document.createElement('script');
        s.async = true;
        s.src = 'https://r.wdfl.co/rw.js';
        s.setAttribute('data-rewardful', process.env.NEXT_PUBLIC_REWARDFUL_KEY!);
        document.head.appendChild(s);
        // optionally remove the tag once you don't need them.
    }, []);
    
    return (
        <div></div>
    )
}
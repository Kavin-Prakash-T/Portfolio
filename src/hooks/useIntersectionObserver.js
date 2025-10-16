import { useState, useEffect } from "react";

export const useIntersectionObserver = () => {
    const [hasAnimated, setHasAnimated] = useState({});
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    //only animate if it is not already animated
                    if (entry.isIntersecting && !hasAnimated[entry.target.id]) {
                        setHasAnimated(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            { threshold: 0.1 }
        );
        document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
        return () => {
            observer.disconnect();
        };
    }, [hasAnimated]);
    return hasAnimated;
};

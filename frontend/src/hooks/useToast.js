import { useState, useEffect, useRef } from "react";

function useToast(duration = 3000) {
    const [toast, setToast] = useState(null);
    const fadeTimeoutRef = useRef(null);
    const removeTimeoutRef = useRef(null);

    useEffect(() => {
    return () => {
        clearTimeout(fadeTimeoutRef.current);
        clearTimeout(removeTimeoutRef.current);
    };
}, []);

    function showToast({ message, type }) {
    clearTimeout(fadeTimeoutRef.current);
    clearTimeout(removeTimeoutRef.current);

    setToast({
        message,
        type,
        visible: true
    });

    fadeTimeoutRef.current = setTimeout(() => {
        setToast(prev =>
            prev
            ? { ...prev, visible: false }
            : null
        );
    }, duration - 300);

    removeTimeoutRef.current = setTimeout(() => {
        setToast(null);
    }, duration);
}

    return {
        toast, showToast
    }
}

export default useToast;
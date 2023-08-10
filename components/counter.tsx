import { useEffect, useState } from "react";

interface CounterComponentProps {
    started: boolean;
    initialCount: number;
    onFinished: Function;
}

const CounterComponent = ({ started, initialCount, onFinished }: CounterComponentProps) => {
    const [count, setCount] = useState(initialCount);

    useEffect(() => {
        if (!started) return;
        if (count > 0) {
            const timeout = setTimeout(() => {
                setCount(count => count - 1);
            }, 1000);

            return () => clearTimeout(timeout);
        } else {
            onFinished();
            setCount(initialCount);
        }
    }, [started, count]);

    if (!started || count < 1) return null

    return <div>{count}</div>
}

export default CounterComponent
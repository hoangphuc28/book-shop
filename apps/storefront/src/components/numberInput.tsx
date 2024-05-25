import React, { useState } from 'react';

const CounterInput = () => {
    const [count, setCount] = useState(0);

    return (
        <input value={count} onChange={(event: any) => {
            if (event.target.value < 0 || event.target.value === null || isNaN(event.target.value) || event.target.value === '') {
                setCount(0)
                return
            }
            if (event.target.value > 10) {
                setCount(10)
                return
            }

            setCount(event.target.value)
        }} type="number" className="mr-5 w-8/12 input-style" />

    );
};

export default CounterInput;

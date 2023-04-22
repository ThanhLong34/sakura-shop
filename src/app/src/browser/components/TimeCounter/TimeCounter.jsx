import { useState, useEffect, useImperativeHandle, memo, forwardRef } from "react";

const TimeCounter = forwardRef(({}, ref) => {
	useImperativeHandle(ref, () => ({
		getTimes() {
			return {
				hour,
				minute,
				updSecond,
				seconds,
			};
		},
	}));

	const [seconds, setSeconds] = useState(0);

	const hour = Math.floor(seconds / 3600);
	const minute = Math.floor((seconds - hour * 3600) / 60);
	const updSecond = seconds - (hour * 3600 + minute * 60);

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((prevState) => prevState + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return <span>{`${minute}:${updSecond}`}</span>;
});

export default memo(TimeCounter);

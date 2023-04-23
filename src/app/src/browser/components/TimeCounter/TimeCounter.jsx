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
		pause() {
			setIsPause(true);
		},
		start() {
			setIsPause(false);
			setSeconds(0);
		},
	}));

	const [isPause, setIsPause] = useState(false);
	const [seconds, setSeconds] = useState(0);

	const hour = Math.floor(seconds / 3600);
	const minute = Math.floor((seconds - hour * 3600) / 60);
	const updSecond = seconds - (hour * 3600 + minute * 60);

	useEffect(() => {
		const interval = setInterval(() => {
			if (!isPause) {
				setSeconds((prevState) => prevState + 1);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [isPause]);

	return <span>{`${minute}:${updSecond}`}</span>;
});

export default memo(TimeCounter);

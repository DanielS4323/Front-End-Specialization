import React from 'react';
import { getCourseDuration } from '../../../../../../helpers/index';
import { DurationClockProps } from './DurationClock.types';

const DurationClock = ({ duration }: DurationClockProps) => {
	return <>{duration > 0 && <span>{getCourseDuration(duration)}</span>}</>;
};

export default DurationClock;

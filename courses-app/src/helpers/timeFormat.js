const timeFormat = (string) => {
	const hours = '' + Math.trunc(+string / 60);
	const min = '' + (+string % 60);
	return string ? `${hours.padStart(2, '0')}:${min.padStart(2, '0')}` : '00:00';
};

export default timeFormat;

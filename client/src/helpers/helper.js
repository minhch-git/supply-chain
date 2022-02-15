export const convertWeiToEther = number => {
	return window.web3.utils.fromWei(number, 'ether')
}

export const convertStepToState = step => {
	return (
		(step === '0' && 'Đang bán') ||
		(step === '1' && 'Đã Mua') ||
		(step === '2' && 'Delivered')
	)
}

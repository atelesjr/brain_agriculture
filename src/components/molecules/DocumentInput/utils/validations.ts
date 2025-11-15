export const onlyDigits = (v: string) => v.replace(/\D/g, '');

const formatCPF = (digits: string) => {
	const d = digits.slice(0, 11);
	if (!d) return '';
	return d
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const formatCNPJ = (digits: string) => {
	const d = digits.slice(0, 14);
	if (!d) return '';
	return d
		.replace(/(\d{2})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1/$2')
		.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
};

export const formatDocument = (digits: string) => {
	if (!digits) return '';
	if (digits.length > 11) return formatCNPJ(digits);
	return formatCPF(digits);
};

export const isValidCPF = (digits: string) => {
	if (!/^[0-9]{11}$/.test(digits)) return false;
	if (/^([0-9])\1+$/.test(digits)) return false;
	const nums = digits.split('').map(Number);
	let sum = 0;
	for (let i = 0; i < 9; i++) sum += nums[i] * (10 - i);
	let rev = (sum * 10) % 11;
	if (rev === 10) rev = 0;
	if (rev !== nums[9]) return false;
	sum = 0;
	for (let i = 0; i < 10; i++) sum += nums[i] * (11 - i);
	rev = (sum * 10) % 11;
	if (rev === 10) rev = 0;
	return rev === nums[10];
};

export const isValidCNPJ = (digits: string) => {
	if (!/^[0-9]{14}$/.test(digits)) return false;
	if (/^([0-9])\1+$/.test(digits)) return false;
	const nums = digits.split('').map(Number);
	const calc = (slice: number[], factors: number[]) => {
		let sum = 0;
		for (let i = 0; i < factors.length; i++) sum += slice[i] * factors[i];
		const mod = sum % 11;
		return mod < 2 ? 0 : 11 - mod;
	};
	const factors1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
	const factors2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
	const v1 = calc(nums.slice(0, 12), factors1);
	if (v1 !== nums[12]) return false;
	const v2 = calc(nums.slice(0, 13), factors2);
	return v2 === nums[13];
};

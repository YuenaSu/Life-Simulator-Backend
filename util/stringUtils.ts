export function formatDollar(number: number) {
  const formattedNumber = number.toLocaleString();

  const parts = formattedNumber.split(',');

  return '$' + parts.join(',');
}

export default { formatDollar };

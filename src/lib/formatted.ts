export function formatCurrencyString(input: string) {
  const lowercaseInput = input.toLowerCase();

  const regex = /^(.*?)(рублей|рубля|рублей)(\s+\d+\s+копеек)$/u;
  const matches = lowercaseInput.match(regex);

  if (matches) {
    const formattedString = `(${matches[1].trim()}) ${
      matches[2]
    } ${matches[3].trim()}`;
    return formattedString;
  }

  return input;
}

export function formatNumber(num: string) {
  const formatter = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
  });

  let formattedNumber = formatter.format(Number(num));

  formattedNumber = formattedNumber.replace(".", ",");

  return formattedNumber;
}

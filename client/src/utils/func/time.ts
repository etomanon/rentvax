// localeMatcher?: string;
// weekday?: string;
// era?: string;
// year?: string;
// month?: string;
// day?: string;
// hour?: string;
// minute?: string;
// second?: string;
// timeZoneName?: string;
// formatMatcher?: string;
// hour12?: boolean;
// timeZone?: string;

export const timeParse = (dateLike: string) => {
  // const options: Intl.DateTimeFormatOptions = {
  //   weekday: 'long',
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // }
  const options = {}
  const date = new Date(dateLike)
  return date.toLocaleDateString('cs-CZ', options)
}

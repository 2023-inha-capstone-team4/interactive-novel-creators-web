/**
 * Date 객체를 받아 'yyyy. m. d.' 포맷의 문자열을 반환합니다.
 */
export function dateToString(date: Date): string {
  console.log(typeof date);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  return `${y}. ${m}. ${d}.`;
}

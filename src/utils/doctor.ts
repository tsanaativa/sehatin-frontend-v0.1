export function getYearsOfExp(startYear: number) {
  const yearsOfExp = new Date().getFullYear() - startYear;
  if (yearsOfExp === 0) {
    return '< 1 year';
  } else if (yearsOfExp === 1) {
    return '1 year';
  } else {
    return yearsOfExp + ' years';
  }
}

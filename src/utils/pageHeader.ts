export function getPageName(pathName: string) {
  switch (pathName) {
    case 'meds':
      return 'Meds';
    case 'category':
      return 'Category';
    default:
      return 'Search';
  }
}

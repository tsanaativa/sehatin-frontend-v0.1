import { MEDS_PATHS_MAP } from '@/constants/menus';

export function getPathNames(paths: string) {
  return paths.split('/').filter((path) => {
    return !!path;
  });
}

export function getPageName(pathName: string) {
  const menu = MEDS_PATHS_MAP[pathName as keyof typeof MEDS_PATHS_MAP];
  return menu;
}

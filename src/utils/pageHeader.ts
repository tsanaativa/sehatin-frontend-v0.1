import { PATHS_MAP } from '@/constants/menus';

export function getPathNames(paths: string) {
  return paths.split('/').filter((path) => {
    return !!path;
  });
}

export function getPageName(pathName: string) {
  const menu = PATHS_MAP[pathName as keyof typeof PATHS_MAP];
  return menu;
}

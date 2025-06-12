function parsePathnameSegments(pathname) {
  return pathname.split('/').filter(segment => segment);
}

function constructRouteFromSegments(pathSegments) {
  return '/' + pathSegments.join('/');
}

function getActivePathname() {
  return location.hash.replace('#', '') || '/';
}

export function getActiveRoute() {
  const pathname = getActivePathname();
  const pathSegments = parsePathnameSegments(pathname);
  return constructRouteFromSegments(pathSegments);
}

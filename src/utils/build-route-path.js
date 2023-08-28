export function buildRoutePath(path) {
  const routeParamsRegex = /:([a-zA-Z]+)/g;
  const pathParams = path.replaceAll(routeParamsRegex, "(?<$1>[a-z0-9-_]+)");
  const pathRegex = new RegExp(`^${pathParams}(?<query>\\?(.*))?$`);
  return pathRegex;
}

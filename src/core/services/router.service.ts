import { RouterStateSerializer } from "@ngrx/router-store";
import {
  ActivatedRouteSnapshot,
  Data,
  Params,
  RouterStateSnapshot,
  DefaultUrlSerializer,
  UrlTree,
} from "@angular/router";
import { AppRoute } from "@types";

export const mergeRouteParams = (route:ActivatedRouteSnapshot|null,getter:(r:ActivatedRouteSnapshot) => Params):Params|null => {
  if (!route) {return null;}
  const currentParams = getter(route);
  const primaryChild = route.children.find(c => c.outlet === "primary") || route.firstChild;
  return {...currentParams, ...mergeRouteParams(primaryChild, getter)};
};
export const mergeRouteData = (route:ActivatedRouteSnapshot|null):Data|null => {
  if (!route) {return null;}
  const currentData = route.data;
  const primaryChild = route.children.find(c => c.outlet === "primary") || route.firstChild;
  return {...currentData, ...mergeRouteData(primaryChild)};
};
export class AppRouterStateSerializer implements RouterStateSerializer<AppRoute> {
  serialize(routerState:RouterStateSnapshot):AppRoute {
    console.log(routerState.root);
    const params = mergeRouteParams(routerState.root,r => r.params);
    const query = mergeRouteParams(routerState.root,r => r.queryParams);
    const data = mergeRouteData(routerState.root);
    return {
      url:routerState.url||"/",
      ...data && Object.keys(data).length?{data}:null,
      ...query && Object.keys(query).length?{query}:null,
      ...params && Object.keys(params).length?{params}:null,
    };
  }
}
export class AppRouterUrlSerializer extends DefaultUrlSerializer {
  override parse(url:string):UrlTree {
    // Change plus signs to encoded spaces
    url = url.replace(/\+/g,"%20");
    // Use the default serializer that you can import to just do the 
    // default parsing now that you have fixed the url.
    return super.parse(url);}
  override serialize(tree:UrlTree): string {
    // Use the default serializer to create a url and replace any spaces with + signs
    return super.serialize(tree).replace(/%20/g,"+");
  }
}
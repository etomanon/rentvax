import { Home } from '@/modules/home/Home'
import { Review } from '@/modules/review/Review'
import { Search } from '@/modules/search/Search'
import { Flat } from '@/modules/flat/Flat'

export enum RoutePathEnum {
  HOME = '/',
  REVIEW = '/review',
  SEARCH = '/search',
  FLAT = '/flat',
}

export enum RoutePermissionEnum {
  USER,
  PUBLIC,
}

export interface Route {
  component: () => JSX.Element
  path: RoutePathEnum
  permission: RoutePermissionEnum
}

export const routes: Route[] = [
  {
    component: Home,
    path: RoutePathEnum.HOME,
    permission: RoutePermissionEnum.PUBLIC,
  },
  {
    component: Review,
    path: RoutePathEnum.REVIEW,
    permission: RoutePermissionEnum.USER,
  },
  {
    component: Search,
    path: RoutePathEnum.SEARCH,
    permission: RoutePermissionEnum.PUBLIC,
  },
  {
    component: Flat,
    path: RoutePathEnum.FLAT,
    permission: RoutePermissionEnum.PUBLIC,
  },
]
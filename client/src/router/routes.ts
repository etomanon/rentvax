import { Home } from '@/modules/home/Home'
import { Review } from '@/modules/review/Review'
import { Search } from '@/modules/search/Search'
import { Flat } from '@/modules/flat/Flat'
import { MyReviews } from '@/modules/myReviews/MyReviews'

export enum RoutePathEnum {
  HOME = '/',
  REVIEW = '/review',
  SEARCH = '/search',
  FLAT = '/flat',
  MY_REVIEWS = '/my-reviews',
}

export enum RoutePermissionEnum {
  USER,
  PUBLIC,
}

export interface Route {
  component: () => JSX.Element
  path: string
  permission: RoutePermissionEnum
  disableExact?: boolean
}

export const routes: Route[] = [
  {
    component: Home,
    path: RoutePathEnum.HOME,
    permission: RoutePermissionEnum.PUBLIC,
  },
  {
    component: Review,
    path: `${RoutePathEnum.REVIEW}`,
    permission: RoutePermissionEnum.USER,
    disableExact: false,
  },
  {
    component: Review,
    path: `${RoutePathEnum.REVIEW}/:id`,
    permission: RoutePermissionEnum.USER,
    disableExact: false,
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
  {
    component: MyReviews,
    path: RoutePathEnum.MY_REVIEWS,
    permission: RoutePermissionEnum.USER,
  },
]

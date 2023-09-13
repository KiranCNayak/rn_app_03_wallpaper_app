# Wallpaper App by KCN

### Features included in this app

- [Pexels API](https://www.pexels.com/api/) for loading the images
- [React Navigation](https://reactnavigation.org/) for in-app navigation
- [React Native Snap Carousel](https://github.com/meliorence/react-native-snap-carousel/) for image carousel in Home page
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) is needed by snap carousel for its use
- [PermissionsAndroid](https://reactnative.dev/docs/permissionsandroid.html) to handle different scenarios of `PERMISSIONS.WRITE_EXTERNAL_STORAGE`. Have added [Rationale options](https://reactnative.dev/docs/permissionsandroid.html#request) to request method, when the user denies permission for the first time.
- Utilizing memoization techniques using [`useCallback`](https://react.dev/reference/react/useCallback), [`useMemo`](https://react.dev/reference/react/useMemo) and [`React.memo`](https://react.dev/reference/react/memo).

### Screenshots of the app

1. Home page

<img src="./screenshots/First Page (Home page).jpg" height="600" width="280" />

2. Category page - Items are rendered using a two column FlatList

<img src="./screenshots/Second Page (Category selected).jpg" height="600" width="280" />

3. Image Display page - User can download the image by clicking on the download button

<img src="./screenshots/Third page (On clicking any image).jpg" height="600" width="280" />

4. Alert on successfully downloading the image

<img src="./screenshots/Success alert on image download.jpg" height="600" width="280" />

5. Search capability on Home page (Here the user has searched for "Bengaluru")

<img src="./screenshots/Search capability on Home page.jpg" height="600" width="280" />

6. Search successfully renders itself as a `Category`

<img src="./screenshots/Search Result.jpg" height="600" width="280" />

7. Once the user reaches the end of the list, an alert is shown for the same. The exact line in code can be seen [here](https://github.com/KiranCNayak/rn_app_03_wallpaper_app/blob/main/src/views/CategoryView/CategoryView.js#L45)

<img src="./screenshots/Feedback alert on reaching end of image list.jpg" height="600" width="280" />

---

### Using `ProGuard` has decreased the App size by more than 7.5MB. The exact line in code can be seen [here](https://github.com/KiranCNayak/rn_app_03_wallpaper_app/blob/main/android/app/build.gradle#L57)

Without `ProGuard`

<img src="./screenshots/App size without ProGuard.jpg" height="600" width="600" />

---

With `ProGuard`

<img src="./screenshots/App size with ProGuard.jpg" height="600" width="600" />

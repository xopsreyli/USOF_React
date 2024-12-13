import {createRoot} from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import './styles/styles.css'
import './styles/colors.css'
import './styles/theme.css'
import SignUp from './pages/Auth/SignUp/SignUp.jsx'
import SignIn from './pages/Auth/SignIn/SignIn.jsx'
import signInAction from './requests/actions/Auth/SignIn/signInAction.js'
import signUpAction from './requests/actions/Auth/SignUp/SignUpAction.js'
import ConfirmEmail from './pages/Auth/ConfirmEmail/ConfirmEmail.jsx'
import Auth from './pages/Auth/Auth.jsx'
import VerifyEmail from './pages/Auth/VerifyEmail/VerifyEmail.jsx'
import verifyEmail from './requests/actions/Auth/VerifyEmail/verifyEmailAction.js'
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword.jsx'
import resetPasswordAction from './requests/actions/Auth/ResetPassword/ResetPasswordAction.js'
import App from './pages/App/App.jsx'
import AuthProvider from './providers/Auth/AuthProvider.jsx'
import Profile from './pages/App/Profile/Profile.jsx'
import profileInfoLoader from './requests/loaders/App/Profile/profileInfoLoader.js'
import Error from './components/Error/Error.jsx'
import Settings from './pages/App/Profile/Settings/Settings.jsx'
import ProfilePosts from './pages/App/Profile/Posts/Posts.jsx'
import Favorites from './pages/App/Profile/Favorites/Favorites.jsx'
import favoritesLoader from './requests/loaders/App/Profile/Favorites/favoritesLoader.js'
import profilePostsLoader from './requests/loaders/App/Profile/Posts/profilePostsLoader.js'
import Leaderboard from './pages/App/Leaderboard/Leaderboard.jsx'
import leaderboardLoader from './requests/loaders/App/Leaderboard/leaderboardLoader.js'
import Edit from './pages/App/Profile/Edit/Edit.jsx'
import Avatar from './pages/App/Profile/Edit/Avatar/Avatar.jsx'
import updateAvatarAction from './requests/actions/App/Profile/Edit/Avatar/updateAvatarAction.js'
import FullName from './pages/App/Profile/Edit/FullName/FullName.jsx'
import updateFullNameAction from './requests/actions/App/Profile/Edit/FullName/updateFullNameAction.js'
import Login from './pages/App/Profile/Edit/Login/Login.jsx'
import updateLoginAction from './requests/actions/App/Profile/Edit/Login/updateLoginAction.js'
import Password from './pages/App/Profile/Edit/Password/Password.jsx'
import updatePasswordAction from './requests/actions/App/Profile/Edit/Password/updatePasswordAction.js'
import Email from './pages/App/Profile/Edit/Email/Email.jsx'
import updateEmailAction from './requests/actions/App/Profile/Edit/Email/updateEmailAction.js'
import Categories from './pages/App/Categories/Categories.jsx'
import categoriesLoader from './requests/loaders/App/Categories/categoriesLoader.js'
import Category from './pages/App/Category/Category.jsx'
import categoryLoader from './requests/loaders/App/Category/categoryLoader.js'
import Users from './pages/App/Users/Users.jsx'
import usersLoader from './requests/loaders/App/Users/usersLoader.js'
import Posts from './pages/App/Posts/Posts.jsx'
import postsLoader from './requests/loaders/App/Posts/postsLoader.js'
import CreatePost from './pages/App/CreatePost/CreatePost.jsx'
import createPostAction from './requests/actions/App/CreatePost/createPostAction.js'
import UpdatePost from './pages/App/UpdatePost/UpdatePost.jsx'
import updatePostLoader from './requests/loaders/App/UpdatePost/updatePostLoader.js'
import updatePostAction from './requests/actions/App/UpdatePost/updatePostAction.js'
import Post from './pages/App/Post/Post.jsx'
import postLoader from './requests/loaders/App/Post/postLoader.js'
import Home from './pages/App/Home/Home.jsx'
import homeLoader from './requests/loaders/App/Home/homeLoader.js'
import postAction from './requests/actions/App/Post/postAction.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Auth />}>
        <Route
          path='/signup'
          element={<SignUp />}
          action={signUpAction}
        />
        <Route
          path='/confirm-email'
          element={<ConfirmEmail />}
        />
        <Route
          path='/signin'
          element={<SignIn />}
          action={signInAction}
        />
        <Route
          path='/verify-email'
          element={<VerifyEmail />}
          action={verifyEmail}
        />
        <Route
          path='/reset-password'
          element={<ResetPassword />}
          action={resetPasswordAction}
        />
      </Route>
      <Route
        path='/'
        element={<App />}
      >
        <Route
          index
          element={<Home />}
          loader={homeLoader}
          errorElement={<Error />}
        />
        <Route
          path='/profile/:id'
          element={<Profile />}
          loader={profileInfoLoader}
          errorElement={<Error />}
        >
          <Route
            path='/profile/:id/edit'
            element={<Edit />}
            errorElement={<Error />}
          />
          <Route
            path='/profile/:id/edit/avatar'
            element={<Avatar />}
            action={updateAvatarAction}
            errorElement={<Error />}
          />
          <Route
            path='/profile/:id/edit/fullname'
            element={<FullName />}
            action={updateFullNameAction}
            errorElement={<Error />}
          />
          <Route
            path='/profile/:id/edit/login'
            element={<Login />}
            action={updateLoginAction}
            errorElement={<Error />}
          />
          <Route
            path='/profile/:id/edit/email'
            element={<Email />}
            action={updateEmailAction}
            errorElement={<Error />}
          />
          <Route
            path='/profile/:id/edit/password'
            element={<Password />}
            action={updatePasswordAction}
            errorElement={<Error />}
          />
          <Route
            path='/profile/:id/posts'
            element={<ProfilePosts />}
            loader={profilePostsLoader}
          />
          <Route
            path='/profile/:id/favorites'
            element={<Favorites />}
            loader={favoritesLoader}
            errorElement={<Error />}
          />
          <Route
            path='/profile/:id/settings'
            element={<Settings />}
            errorElement={<Error />}
          />
        </Route>
        <Route
          path='/categories'
          element={<Categories />}
          loader={categoriesLoader}
        />
        <Route
          path='/category/:id'
          element={<Category />}
          loader={categoryLoader}
          errorElement={<Error />}
        />
        <Route
          path='/users'
          element={<Users />}
          loader={usersLoader}
        />
        <Route
          path='/leaderboard'
          element={<Leaderboard />}
          loader={leaderboardLoader}
        />
        <Route
          path='/posts'
          element={<Posts />}
          loader={postsLoader}
        />
        <Route
          path='/post/new'
          element={<CreatePost />}
          action={createPostAction}
          errorElement={<Error />}
        />
        <Route
          path='/post/:id'
          element={<Post />}
          loader={postLoader}
          action={postAction}
          errorElement={<Error />}
        />
        <Route
          path='/post/:id/update'
          element={<UpdatePost />}
          loader={updatePostLoader}
          action={updatePostAction}
          errorElement={<Error />}
        />
        <Route
          path='*'
          element={<Error />}
        />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)

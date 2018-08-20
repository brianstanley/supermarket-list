import {StackNavigator} from "vue-native-router"
import Login from '../components/Login'
import Main from '../components/Main'

const Router = StackNavigator(
    {
      Login,
      Main,
    },
    {
      initialRouteName: 'Main'
    }
);
export default Router;
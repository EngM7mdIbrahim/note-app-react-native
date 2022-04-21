import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider as BlogProvider } from "./src/context/BlogContext";
import BlogDetailScreen from "./src/screens/BlogDetailScreen";
import IndexScreen from "./src/screens/IndexScreen";
import CreateNoteScreen from "./src/screens/CreateNoteScreen";
const navigator = createStackNavigator(
  {
    Home: IndexScreen,
    BlogDetail: BlogDetailScreen,
    CreateNote: CreateNoteScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerTintColor:'white',
      headerStyle: {
        borderColor: "black",
        backgroundColor: "black",
      },
      title: "Notes",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <BlogProvider>
      <App />
    </BlogProvider>
  );
};

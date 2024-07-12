import React, { useEffect, useState } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import PostListComponent from "./postListComponent"
import { Button, Center, NativeBaseProvider } from "native-base"
import { buttonHot, getHotPosts, buttonBest, buttonNew, fetchPosts } from "../services/getPosts";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

/**
 * This function is use to see of we are in the bottom
 * of the scroll view to call the fetchMore to get more
 * posts and display it.
 * @param {} nativeEvent
*/
export const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

/**
 * This function create and display all of the button
 * in the tab bar.
 * She get the Hot posts for the first time with call of
 * the wrapper snoowrap
 * She will display a loader since she didn't have any posts
 * She display 3 buttons to chose between Hot, Best and New.
 * She call the component in a scroll view
 * which display all box with the posts inside.
 * She call the different function to switch in the
 * different screens.
*/
const PostList = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const callSnoop = async () => {
      setPosts(await getHotPosts());
    }
    callSnoop();
  }, []);

  if(!posts) {
    return (
      <View>
          <ActivityIndicator size={130} color="#FF0000" />
      </View>
    );
  }
  else {
    const Items = posts.map(post => (
      <PostListComponent
        key={post.created}
        post={post}
      />
    ));
    return (
      <ScrollView onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent))
          fetchPosts(setPosts, posts);
      }}>
        <View>
          <NativeBaseProvider>
            <Button.Group mx={{ base: "auto", md: 0, }} mt="2">
              <Button colorScheme="danger" height="40px" width="90px" onPress={ () => buttonNew(setPosts) } leftIcon={<FontAwesome5 name="newspaper" color="white" size={12} />}>New</Button>
              <Button mr="5" ml="5" colorScheme="danger" height="40px" width="90px" onPress={ () => buttonHot(setPosts) } leftIcon={<FontAwesome5 name="hotjar" color="white" size={12} />}>Hot</Button>
              <Button colorScheme="danger" height="40px" width="90px" onPress={ () => buttonBest(setPosts) } leftIcon={<FontAwesome5 name="gem" color="white" size={12} />}>Best</Button>
            </Button.Group>
            {Items}
          </NativeBaseProvider>
        </View>
      </ScrollView>
    );
  }
}

export default PostList;
import React from "react";
import { View, Text, Image } from 'react-native'
import { Box, NativeBaseProvider } from "native-base";

/**
 * This component is call int the PostComponent.
 * We use it to display each posts in a box with his tittle, the text,
 * if there is an image, the image and the autor name with the
 * the subreddit to which it belongs.
 * @param {var} post - board with all information about one post get by the API
 * @return The view with the box which containt informations about the post
*/
const PostListComponent = ({ post }) => {
  return (
    <View >
      <NativeBaseProvider>
        <Box alignItems="center" p="4" my="2" mx="3" rounded="8" bg="white">
          <Text fontSize={20} color="white" style={{ fontWeight: "bold", textAlign: "center" }}>{post.title}</Text>
          <Text color="cyan.50" style={{ fontWeight: "normal" }} mt="5" mb="5" fontWeight="medium" fontSize={15}>{post.selftext.substring(0, 500)}</Text>
          { (post.url.includes('.png') || post.url.includes('.jpg')) && <Image source={{uri: post.url}} style={{width:150, height: 150 }} /> }
          <Text fontSize={10} style={{ fontStyle: 'italic' }} color="grey">{post.author.name} | {post.subreddit_name_prefixed}</Text>
        </Box>
      </NativeBaseProvider>
    </View>
  );
}

export default PostListComponent;
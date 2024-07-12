import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";
import { getSubName } from "../services/getPosts";
import { Button, Center, NativeBaseProvider, Text } from "native-base"
import PostListComponent from "../components/postListComponent"
import { buttonHot, buttonBest, buttonNew, fetchPosts } from "../services/getPosts";
import { isCloseToBottom } from "../components/listComponent";

/**
 * This function is create and display the search bar.
 * She also call the function getSubName to search the subreddit
 * in the API with the name that we search as parameter.
 * She also display the 3 buttons like in the home page to chose
 * between Hot, Best and New
 * @param {var} navigation - use to move to another string
 * @return The view with the search bar and more in case of there is more
*/

function searchScreen ({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');

    const [sub, setSub] = useState(null);

    const [research, setResearch] = useState(null);

    const onChangeSearch = query => setSearchQuery(query);

    if (!research) {
        return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                onIconPress={ () => getSubName(setSub, searchQuery, setResearch)}
            />
        </View>
        );
    } else {
        const Items = research.map(post => (
            <PostListComponent
              key={post.created}
              post={post}
            />
        ));
        return (
            <ScrollView onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent))
                  fetchPosts(setResearch, research);
              }}>
                <View>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        onIconPress={() => getSubName(setSub, searchQuery, setResearch)}
                    />
                    <NativeBaseProvider>
                        <Button.Group mx={{ base: "auto", md: 0, }} mt="2">
                            <Button colorScheme="danger" height="40px" width="60px" onPress={ () => buttonNew(setResearch, searchQuery) }>New</Button>
                            <Button mr="5" ml="5" colorScheme="danger" height="40px" width="60px" onPress={ () => buttonHot(setResearch, searchQuery) }>Hot</Button>
                            <Button colorScheme="danger" height="40px" width="60px" onPress={ () => buttonBest(setResearch, searchQuery) }>Best</Button>
                        </Button.Group>
                        {Items}
                    </NativeBaseProvider>
                </View>
            </ScrollView>
        );
    }
};

export default searchScreen;
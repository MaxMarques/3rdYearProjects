import { snoop } from "../services/snoopwrap";

/**
 * This function is called when you press the Hot button in
 * the home page or in the search page.
 * This function is a async function.
 * @param {function} setPosts - this is a function which must define the value of the hot posts retrieved by the call to the getHotPosts function.
 * @param {string} name - this is only useful when searching against subreddit.
*/
export async function buttonHot(setPosts, name = null) {
    setPosts(await getHotPosts(name));
}

/**
 * This function is called when you press the Best button in
 * the home page or in the search page.
 * This function is a async function.
 * @param {function} setPosts - this is a function which must define the value of the hot posts retrieved by the call to the getHotPosts function.
 * @param {string} name - this is only useful when searching against subreddit.
*/
export async function buttonBest(setPosts, name = null) {
    setPosts(await getBestPosts(name));
}

/**
 * This function is called when you press the New button in
 * the home page or in the search page.
 * This function is a async function.
 * @param {function} setPosts - this is a function which must define the value of the hot posts retrieved by the call to the getHotPosts function.
 * @param {string} name - this is only useful when searching against subreddit.
*/
export async function buttonNew(setPosts, name = null) {
    setPosts(await getNewPosts(name));
}

/**
 * This function is called when you are in the buttom of the page
 * where you can see the posts and she call the API to get more
 * post to display it.
 * This function is a async function.
 * @param {function} setPosts - this is a function which must define the value of the hot posts retrieved by the call to the getHotPosts function.
 * @param {string} name - this is only useful when searching against subreddit.
*/
export async function fetchPosts(setPosts, posts) {
    setPosts(await posts.fetchMore({ amount: 5 }));
}

/**
 * This function is called by the Hot button.
 * This function is a async function.
 * She call the function where we use snoowrap and she use the result
 * of this function to get the Hot post with a limit of 10 Hot posts
 * @param {string} name - this is only useful when searching against subreddit.
 * @return 10 Hot posts that she get
*/
export async function getHotPosts(name = null) {
    const snoopResult = await snoop();
    const values = await snoopResult.getHot(name, { limit: 10 });
    return values;
}

/**
 * This function is called by the Best button.
 * This function is a async function.
 * She call the function where we use snoowrap and she use the result
 * of this function to get the Best post with a limit of 10 Best posts
 * @param {string} name - this is only useful when searching against subreddit.
 * @return 10 Hot posts that she get
*/
export async function getBestPosts(name = null) {
    const snoopResult = await snoop();
    const values = await snoopResult.getTop(name, { limit: 10 });
    return values;
}

/**
 * This function is called by the New button.
 * This function is a async function.
 * She call the function where we use snoowrap and she use the result
 * of this function to get the New post with a limit of 10 New posts
 * @param {string} name - this is only useful when searching against subreddit.
 * @return 10 Hot posts that she get
*/
export async function getNewPosts(name = null) {
    const snoopResult = await snoop();
    const values = await snoopResult.getNew(name, { limit: 10 });
    return values;
}

/**
 * This function is called when you are in the Search page and write what you
 * are looking for and press enter.
 * This function is a async function.
 * She call the function where we use snoowrap.
 * @param {function} upd - this is a function which must get the subreddit with the research name.
 * @param {string} name - this is only useful when searching against subreddit.
 * @param {function} func - this is a function which must define the value of the hot posts retrieved by the call to the getHotPosts function.
*/
export async function getSubName(upd, name, func) {
    const snoopResult = await snoop();
    upd(await snoopResult.getSubreddit(name));
    func(await getHotPosts(name));
}
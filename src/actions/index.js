import _ from 'lodash';
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
	// need to dispatch result manually when calling dispatch from inside another dispatch
	await dispatch(fetchPosts());

	// get userId from each post as an array, then get unique ids within array
	const userIds = _.uniq(_.map(getState().posts, 'userId'));
	userIds.forEach(id => dispatch(fetchUser(id)));

};

export const fetchPosts = () => async dispatch => {
	const response = await jsonPlaceholder.get('/posts');

	dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (id) => async dispatch => {
	const response = await jsonPlaceholder.get(`/users/${id}`);
		
	dispatch({ type: 'FETCH_USER', payload: response.data});
};

// ***************** memoized version **********************
// export const fetchUser = (id) => dispatch => {
// 	_fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
// 	const response = await jsonPlaceholder.get(`/users/${id}`);
	
// 	dispatch({ type: 'FETCH_USER', payload: response.data});
// });
// ***************** memoized version end *******************
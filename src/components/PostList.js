import React from "react";
import { connect } from 'react-redux';
import { fetchPosts } from "../actions";
import UserHeader from './UserHeader';

class PostList extends React.Component {
	componentDidMount() {
		this.props.fetchPosts();
	}
	
	render() {
		return (
			<div>Post List</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return { posts: state.posts };
}

export default connect(mapStateToProps, {fetchPosts})(PostList);
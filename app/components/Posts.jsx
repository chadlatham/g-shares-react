import Post from 'components/Post';
import React from 'react';
import PostForm from 'components/PostForm';
import weakKey from 'weak-key';

const Posts = React.createClass({
  render() {
    const { editing, params } = this.props;
    let { posts } = this.props;

    // Conditionally filtering ports
    if (params.topic) {
      posts = posts.filter((post) => post.topic === this.props.params.topic);
    }

    // Sort the posts by votes
    posts.sort((p1, p2) => p1.votes < p2.votes);

    return <main>
      {posts.map((post) => {
        if (post === editing) {
          return <PostForm
            key={weakKey(post)}
            post={post}
            stopEditingPost={this.props.stopEditingPost}
            updatePost={this.props.updatePost}
          />;
        }

        return <Post
          decrementVotes={this.props.decrementVotes}
          incrementVotes={this.props.incrementVotes}
          key={weakKey(post)}
          post={post}
        />;
      })}
    </main>;
  }
});

export default Posts;

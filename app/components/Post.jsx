import { Link } from 'react-router';
import React from 'react';
import KeyboardArrowDown
  from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import Paper from 'material-ui/Paper';

const Post = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.post !== this.props.post;
  },

  handleTouchTapUp() {
    this.props.incrementVotes(this.props.post);
  },

  handleTouchTapDown() {
    this.props.decrementVotes(this.props.post);
  },

  render() {
    const { post } = this.props;
    const stylePaper = {
      display: 'flex',
    };
    const styleVotes = {
      marginLeft: '7px'
    };
    const styleAside = {
      minWidth: '60px'
    };
    const styleSubTitle = {
      fontSize: '14px',
      marginTop: '8px'
    };
    const styleTitle = {
      fontSize: '22px',
      textDecoration: 'none'
    };
    const styleTopic = {
      color: this.context.muiTheme.palette.primary1Color,
      textDecoration: 'none'
    };
    const styleAction = Object.assign({}, styleTopic, {
      cursor: 'pointer',
      fontWeight: 500,
      marginRight: '8px'
    });

    return <Paper className="paper" style={stylePaper}>
      <aside style={styleAside}>
        <KeyboardArrowUp onTouchTap={this.handleTouchTapUp}/>
        <div style={styleVotes}>
          {post.votes}
        </div>
        <KeyboardArrowDown onTouchTap={this.handleTouchTapDown}/>
      </aside>

      <article>
        <a href={post.url} style={styleTitle}>
          {post.title}
        </a>

        <div style={styleSubTitle}>
          submitted by {post.submitter} to {' '}

          <Link style={styleTopic} to={`/topics/${post.topic}`}>
            {`/topics/${post.topic}`}
          </Link>
        </div>

        <div style={styleSubTitle}>
          <a style={styleAction}>
            edit
          </a>

          <a style={styleAction}>
            delete
          </a>
        </div>
      </article>
    </Paper>;
  }
});

export default Post;

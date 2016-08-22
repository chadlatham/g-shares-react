import AssignmentReturned
  from 'material-ui/svg-icons/action/assignment-returned';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import Joi from 'joi';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import TextField from 'material-ui/TextField';

const schema = Joi.object({
  title: Joi.string().trim().max(255),
  topic: Joi.string().trim().max(50),
  url: Joi.string().uri({ scheme: /https?/ })
});

const PostForm = React.createClass({
  getInitialState() {
    // Sets the initial values to the empty strings from the new post passed in props.
    return {
      errors: {},
      post: this.props.post
    };
  },

  handleTouchTapCancel() {
    this.props.stopEditingPost(this.props.post);
  },

  handleChange(event) {
    const { name, value } = event.target;
    const nextPost = Object.assign({}, this.state.post, { [name]: value });
    const nextErrors = Object.assign({}, this.state.errors);
    const result = Joi.validate({ [name]: value }, schema);

    if (result.error) {
      for (const detail of result.error.details) {
        nextErrors[detail.path] = detail.message;
      }

      return this.setState({ errors: nextErrors, post: nextPost });
    }

    delete nextErrors[name];
    this.setState({ errors: nextErrors, post: nextPost });
  },

  // handleBlur(event) {
  //
  // },

  handleTouchTapSave() {
    const result = Joi.validate(this.state.post, schema, {
      abortEarly: false,
      allowUnknown: true
    });

    if (result.error) {
      const nextErrors = {};

      for (const detail of result.error.details) {
        nextErrors[detail.path] = detail.message;
      }

      return this.setState({ errors: nextErrors });
    }

    const nextPost = Object.assign({}, result.value, { votes: 1 });

    this.props.updatePost(this.props.post, nextPost);
  },

  render() {
    const { errors, post } = this.state;

    const styleTextField = {
      display: 'block'
    };

    const styleRaisedButton = {
      marginRight: '10px',
      marginTop: '40px'
    };

    return <Paper className="paper">
      <h3>New Post</h3>

      <TextField
        errorText={errors.url}
        floatingLabelText="url"
        fullWidth={true}
        name="url"
        onChange={this.handleChange}
        // style={styleTextField}
        value={post.url}
      />

      <TextField
        errorText={errors.title}
        floatingLabelText="title"
        fullWidth={true}
        name="title"
        onChange={this.handleChange}
        // style={styleTextField}
        value={post.title}
      />

      <TextField
        errorText={errors.topic}
        floatingLabelText="topic"
        fullWidth={true}
        name="topic"
        onChange={this.handleChange}
        // style={styleTextField}
        value={post.topic}
      />

       <RaisedButton
        icon={<Cancel />}
        label="Cancel"
        // labelPosition="before"
        onTouchTap={this.handleTouchTapCancel}
        primary={true}
        style={styleRaisedButton}
      />

      <RaisedButton
        icon={<AssignmentReturned />}
        label="Save"
        // labelPosition="before"
        onTouchTap={this.handleTouchTapSave}
        primary={true}
        style={styleRaisedButton}
      />
    </Paper>;
  }
});

export default PostForm;

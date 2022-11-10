import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Avatar,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { lovePost,likePost, deletePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [loves, setLoves] = useState(post?.loves);
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLovedPost = post.loves.find((love) => love === userId);
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
        
          <ThumbUpAltIcon fontSize="small" color="primary"/>
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" color="primary"/>
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    };

    return (
        <>
          <ThumbUpAltOutlined fontSize="small" color="primary"/>
          &nbsp;Like
        </>
      );
  };

  const handleLove = async () => {
    dispatch(lovePost(post._id));

    if (hasLovedPost) {
      setLoves(post.loves.filter((id) => id !== userId));
    } else {
      setLoves([...post.loves, userId]);
    }
  };

  const Loves = () => {
    if (loves.length > 0) {
      return likes.find((love) => love === userId) ? (
        <>
        
          <FavoriteIcon fontSize="small" color="secondary"/>
          &nbsp;
          {loves.length > 2
            ? `You and ${loves.length - 1} others`
            : `${loves.length} love${loves.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          
          <FavoriteIcon fontSize="small" color="secondary" />
          &nbsp;{loves.length} {loves.length === 1 ? "Love" : "Loves"}
        </>
      );
    }

    return (
      <>
       <FavoriteIcon fontSize="small" color="secondary"/>&nbsp;Love
      </>
    );
    };


  const openPost = (e) => {
    // dispatch(getPost(post._id, history));
    history.push(`/posts/${post._id}`);
  };


  return (
    <Card className={classes.card} raised elevation={6}>
      <div className={classes.overlay}>
        <Avatar className={classes.blue} alt={post.name} src={post.name}>
          {post.name.charAt(0)}
        </Avatar>
        <div>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
        </div>
      </div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: "gray" }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag}`)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <div>
      <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLove}
        >
          <Loves />
        </Button>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="textSecondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;


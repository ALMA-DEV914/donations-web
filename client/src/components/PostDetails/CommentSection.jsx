import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Avatar } from "@material-ui/core/";
import { useDispatch } from "react-redux";
import moment from "moment";
import { commentPost } from "../../actions/posts";
import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(
      commentPost(`${user?.result?.name}: ${comment}`, post._id)
    );

    setComment("");
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <>
              <Typography key={i} gutterBottom variant="subtitle1">
                <div className={classes.avatarComment}>
                <Avatar
                  className={classes.blue}
                  alt={user?.result?.name}
                  src={user?.result?.name}
                >
                  {user?.result?.name.charAt(0)}
                </Avatar>{" "}<strong className={classes.name}>{c.split(": ")[0]}</strong>
                </div>
                <Typography variant="p" color="textSecondary">
                  {moment(comment.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </Typography>{" "}
                - {c.split(":")[1]}
              </Typography>
            </>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: "70%" }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment.length}
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;

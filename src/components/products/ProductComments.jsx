import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Divider,
  CircularProgress,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { getProductComments } from "../../services/ProductsService";

const ProductComments = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getProductComments(productId);
        const commentsData = response.data.$values;
        setComments(commentsData);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [productId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" color="text.secondary">
        <Typography variant="body1">{error}</Typography>
      </Box>
    );
  }

  if (comments.length === 0) {
    return (
      <Box textAlign="center" color="text.secondary">
        <Typography variant="body1">No comments yet. Be the first to review!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, borderRadius: 2, bgcolor: "background.paper", boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Customer Reviews
      </Typography>
      <List>
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={comment.userName} src={comment.userName} />
              </ListItemAvatar>
              <Box sx={{ width: "100%" }}>
                <Box display="flex" justifyContent="space-between">
                  <ListItemText
                    primary={comment.userName}
                    secondary={formatDistanceToNow(new Date(comment.reviewDate), { addSuffix: true })}
                  />
                  <Rating value={comment.rating} precision={0.5} readOnly />
                </Box>
                <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
                  {comment.comment}
                </Typography>
              </Box>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

ProductComments.propTypes = {
    productId: PropTypes.string.isRequired,
};

export default ProductComments;

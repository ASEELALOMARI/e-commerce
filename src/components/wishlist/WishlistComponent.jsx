import React from "react";
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import UseWishlistContext from "../../hooks/UseWishlistContext";
import EmptyWishlist from "./EmptyWishlist";

const WishlistComponent = () => {
  const {
    wishlistItems,
    removeProductFromWishlist,
    resetWishlistForUser,
  } = UseWishlistContext();

  // Handle product deletion
  const handleDelete = (productId) => {
    removeProductFromWishlist(productId);
  };

  // Handle reset
  const handleReset = () => {
    resetWishlistForUser();
  };

  return (
    <Paper
      sx={{
        padding: 4,
        maxWidth: 800,
        margin: "auto",
        marginTop: 4,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="left">
        My Wishlist
      </Typography>

      {wishlistItems.length === 0 ? (
        <Box textAlign="center" sx={{ mt: 4 }}>
          <EmptyWishlist/>
        </Box>
      ) : (
        <>
          <List>
            {wishlistItems.map((item) => (
              <React.Fragment key={item.productId}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={item.imageURL}
                      alt={item.name}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={`Price: $${item.price.toFixed(2)}`}
                  />
                  <IconButton
                    onClick={() => handleDelete(item.productId)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              startIcon={<RestartAltIcon />}
              onClick={handleReset}
            >
              Reset Wishlist
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default WishlistComponent;

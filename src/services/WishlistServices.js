import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}/wishlists`;

// Add product to wishlist

//Get user Wishlists
export const userWishlists = async(token, userID, signal) =>{
    const response = await axios.get(`${API_BASE_URL}/${userID}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        signal: signal,
    });
    return response.data;
}

//Add product to wishlist
export const addToWishlist = async(token, userID, productId) => {
    const response = await axios.post(`${API_BASE_URL}`, {
        userId: userID,
        productId: productId,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

//Remove product from wishlist by productID 
export const removeFromWishlist = async(token, productId) => {
    const response = await axios.delete(`${API_BASE_URL}/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

// reset wishlist by userID

export const resetWishlist = async(token, userID) => {
    const response = await axios.delete(`${API_BASE_URL}/${userID}/reset`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}
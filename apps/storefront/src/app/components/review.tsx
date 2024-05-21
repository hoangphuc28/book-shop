"use client";
import React, { useState } from "react";
import { TextField, Button, Rating, Avatar } from "@mui/material";
import { styled } from "@mui/system";

const reviewsData = [
  {
    avatar: "https://i.pravatar.cc/300",
    name: "John Doe",
    rating: 4,
    content: "Great product!",
  },
  {
    avatar: "https://i.pravatar.cc/301",
    name: "Jane Smith",
    rating: 5,
    content: "Excellent quality, highly recommend.",
  },
];

const StyledContainer = styled("div")({
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "20px",
});

const StyledReview = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "8px",
});

const Review = () => {
  const [reviews, setReviews] = useState(reviewsData);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    content: "",
    avatar: "https://i.pravatar.cc/300",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setReviews([newReview, ...reviews]);
    setNewReview({
      name: "",
      rating: 0,
      content: "",
      avatar: "https://i.pravatar.cc/300",
    });
  };

  return (
    <StyledContainer>
      <h1 className="text-2xl font-bold mb-4">Đánh Giá Sản Phẩm</h1>
      <div className="flex">
        <div className="w-8/12">
          {reviews.map((review, index) => (
            <StyledReview key={index}>
              <Avatar src={review.avatar} alt={review.name} className="mr-4" />
              <div>
                <h3 className="font-semibold">{review.name}</h3>
                <Rating name="read-only" value={review.rating} readOnly />
                <p>{review.content}</p>
              </div>
            </StyledReview>
          ))}
        </div>
        <div className="w-4/12 ml-5">
          <form onSubmit={handleSubmit} className="mb-8">
            <Rating
              name="simple-controlled"
              value={newReview.rating}
              onChange={(event, newValue) => {
                setNewReview({ ...newReview, rating: newValue });
              }}
              className="mb-4"
            />
            <TextField
              label="Nội dung review"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={4}
              className="mb-4"
              value={newReview.content}
              onChange={(e) =>
                setNewReview({ ...newReview, content: e.target.value })
              }
            />
            <a
              href="#"
              className="btn-style1 px-2 py-3 mt-1 block text-center"
            >
              Submit
            </a>
          </form>
        </div>
      </div>
    </StyledContainer>
  );
};

export default Review;

import React, { useEffect, useState } from "react";
import { TextField, Rating, Avatar, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Review } from "../utils/interfaces/review";
import { createReview } from "../utils/api/graphQL/query";
import { useMutation } from "@apollo/client";
import Image from "next/image";

interface Props {
  reviewsData: Review[];
  productId: string
}

const ReviewComponent = ({ reviewsData, productId }: Props) => {
  const [reviews, setReviews] = useState<Review[]>(reviewsData);
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState('')
  useEffect(() => {
    setReviews(reviewsData)
  }, [reviewsData, setReviews])
  const [createReviewMutation] = useMutation(createReview)
  const onSubmit = async (event: any) => {
    try {
      if(rating <= 0) {
        alert('Please provide a rating before submitting your review.');
        return
      }
      if(content === '') {
        alert('Please provide a content before submitting your review.');
        return
      }
      const res = await createReviewMutation({
        variables: {
            productId: productId,
            content: content,
            rating: rating
        }
      });
      console.log(res);
      alert('Review successfully')
    } catch (error) {
      console.error('Error creating review:', error);
      alert('Cannot review');
    }
  };
  return (
    <StyledContainer>
      <h1 className="text-2xl font-bold mb-4">Đánh Giá Sản Phẩm</h1>
      <div className="flex">
        <div className="w-8/12">
          {reviews?.map((review, index) => (
            <StyledReview key={index}>
              <Image width={50} height={50} style={{borderRadius: '50%', objectFit: 'contain'}} src={review?.accounts?.avatar} alt={review?.accounts?.fullName} className="mr-4" />
              <div>
                <h3 className="font-semibold">{review?.accounts?.fullName}</h3>
                <Rating name="read-only" value={review?.rating} readOnly />
                <p>{review?.content}</p>
              </div>
            </StyledReview>
          ))}
        </div>
        <div className="w-4/12 ml-5">
          <form onSubmit={onSubmit} className="mb-8">
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                if (newValue) {
                  setRating(newValue)
                }
              }}
              className="mb-4"
            />
            <TextField
              label="Nội dung review"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              onChange={(event) => setContent(event.target.value)}
            />
            <button
              className="btn-style1 px-2 py-3 mt-1 block text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </StyledContainer>
  );
};

export default ReviewComponent;

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

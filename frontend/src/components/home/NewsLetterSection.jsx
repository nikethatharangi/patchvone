import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack, Alert } from "@mui/material";
import { subscribeNewsletter } from "../../api/newsLetterApi";
 

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (email.trim() === "") return;
      setLoading(true);
      setError("");

      try {
        const response = await subscribeNewsletter(email);

        if (response.status === 201) {
          setSuccess(true);
          setEmail("");

          setTimeout(() => setSuccess(false), 3000);
        }
      } catch (err) {
        setError(
          err.response?.data || "Subscription failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        textAlign: "center",
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 6, md: 12 },
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 1.5,
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        OUR NEWEST PRODUCTS STRAIGHT TO YOUR INBOX
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mb: 4,
          maxWidth: 600,
          mx: "auto",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        Be the first to know about our products, limited-time offers,
        community events, and more.
      </Typography>

      {/* Email Input + Button */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: 500, mx: "auto", mb: 2 }}
      >
        <TextField
          label="Enter your email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            bgcolor: "white",
            borderRadius: 1,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            width: { xs: "100%", sm: "180px" },
            px: 4,
            py: 1.2,
            fontWeight: 600,
            fontFamily: "Montserrat, sans-serif",
            textTransform: "none",
            backgroundColor: "#111B1E",
            color: "#fafafa"
          }}
        >
          Sign Up
        </Button>
      </Stack>

      {/* Success Message */}
      {success && (
        <Alert
          severity="success"
          sx={{
            maxWidth: 400,
            mx: "auto",
            mt: 2,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
           Thank you for subscribing!
        </Alert>
      )}
    </Box>
  );
};

export default NewsletterSection;
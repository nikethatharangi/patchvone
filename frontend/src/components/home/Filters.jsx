import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Slider } from "@mui/material";

export default function Filters({ priceRange, setPriceRange, availability, setAvailability }) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <FormControl>
        <InputLabel>Availability</InputLabel>
        <Select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          label="Availability"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="in">In Stock</MenuItem>
          <MenuItem value="out">Out of Stock</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ width: 200 }}>
        <InputLabel>Price Range</InputLabel>
        <Slider
          value={priceRange}
          onChange={(e, newVal) => setPriceRange(newVal)}
          valueLabelDisplay="auto"
          min={0}
          max={500}
        />
      </Box>
    </Box>
  );
}
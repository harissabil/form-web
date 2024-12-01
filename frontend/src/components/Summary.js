import React from "react";
import {Box, Typography} from "@mui/material";

const Summary = ({formData}) => {
    return (
        <Box
            sx={{
                maxWidth: 500,
                margin: "20px auto",
                padding: 2,
                boxShadow: 2,
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" textAlign="center" gutterBottom>
                Submitted Data
            </Typography>
            <Typography>Name: {formData.name}</Typography>
            <Typography>Phone: {formData.phone}</Typography>
            <Typography>Email: {formData.email}</Typography>
            <Typography>Password: {formData.password}</Typography>
            <Typography>Age: {formData.age}</Typography>
        </Box>
    );
};

export default Summary;
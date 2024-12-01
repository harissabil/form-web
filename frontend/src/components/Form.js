import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const Form = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        age: "",
    });

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState(""); // To handle API errors

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.name.match(/^[A-Za-z\s]+$/)) {
            tempErrors.name = "Name should only contain alphabets.";
        }
        if (!formData.phone.match(/^\d+$/)) {
            tempErrors.phone = "Phone number should only contain numbers.";
        }
        if (!formData.email.includes("@")) {
            tempErrors.email = "Invalid email address.";
        }
        if (formData.password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters.";
        }
        if (!formData.age.match(/^\d+$/)) {
            tempErrors.age = "Age should be a number.";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                // Send data to the Flask API
                const response = await fetch("http://103.49.238.161/api/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (response.ok) {
                    if (data["success"] === false) {
                        setApiError(data.errors || "Something went wrong.");
                        return;
                    }
                    // Successfully submitted, pass the data to the parent component
                    onSubmit(formData);
                } else {
                    // Handle errors from the API
                    setApiError(data.errors || "Something went wrong.");
                }
            } catch (error) {
                setApiError("An error occurred while submitting the form.");
            }
        }
    };

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
                Registration Form
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    error={!!errors.age}
                    helperText={errors.age}
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Submit
                </Button>
            </form>

            {/* Display API error if there is one */}
            {apiError && (
                <Typography color="error" textAlign="center" mt={2}>
                    {apiError}
                </Typography>
            )}
        </Box>
    );
};

export default Form;
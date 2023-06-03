import React, { useState } from "react";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
const Start = ({ handleSetDate }) => {
  const [difficulty, setDifficulty] = useState("begginer");

  const presetData = {
    begginer: { width: 10, height: 10, mines: 10 },
    intermediate: { width: 16, height: 16, mines: 40 },
    expert: { width: 20, height: 20, mines: 99 },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("difficulty", difficulty);
    handleSetDate(presetData[difficulty]);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="center">
        <h1 style={{ marginBottom: "5px" }}>Start Page</h1>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Start Page
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <FormControl>
              <FormLabel id="difficulty-group-label">Difficulty</FormLabel>
              <RadioGroup
                aria-labelledby="difficulty-group-label"
                defaultValue="Beginner"
                name="difficulty-buttons-group"
              >
                <FormControlLabel
                  value="begginer"
                  control={<Radio />}
                  label="Begginer"
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                <FormControlLabel
                  value="intermediate"
                  control={<Radio />}
                  label="Intermediate"
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                <FormControlLabel
                  value="expert"
                  control={<Radio />}
                  label="Expert"
                  onChange={(e) => setDifficulty(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Start The Game
            </Button>
          </Box>
        </Box>
      </div>
    </Container>
  );
};

export default Start;

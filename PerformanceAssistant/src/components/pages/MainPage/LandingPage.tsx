import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import big from "../../images/bigpicture.jpg";
import Navbar from './LandingPageNavbar';

const LandingPage: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [lineBreakIndex, setLineBreakIndex] = useState(0);
  const fullText = 'Unleashing\nExcellence Through\nDetailed Insights';
  const typingSpeed = 100; // Adjust the typing speed as needed

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        const nextChar = fullText[currentIndex];
        setTypedText(prevText => {
          if (nextChar === '\n') {
            setLineBreakIndex(prevIndex => prevIndex + 1);
            return prevText + '\n';
          } else if (lineBreakIndex === 0 || lineBreakIndex === 1) {
            return prevText + nextChar;
          } else {
            return prevText.substr(0, prevText.lastIndexOf('\n') + 1) + nextChar;
          }
        });
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #38bdf8, #3b82f6, #9333ea)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar/>
      <Container
        sx={{
          display: 'flex',
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: 2,
              color: 'white',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 'bold',
                whiteSpace: 'pre-line',
                textShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                paddingTop:10
              }}
            >
              {typedText}
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(to right, #fbbf24, #f97316)',
                marginTop: 2,
                paddingX: 4,
                paddingY: 2,
                borderRadius: 50,
                transition: 'all 0.3s',
                '&:hover': {
                  background: 'linear-gradient(to right, #f59e0b, #ea580c)',
                },
                boxShadow: 3,
              }}
            >
              Get Started
            </Button>
          </Box>
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={big}
              alt="CCTECH Image"
              sx={{
                width: 500,
                height: 500,
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: 3,
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;

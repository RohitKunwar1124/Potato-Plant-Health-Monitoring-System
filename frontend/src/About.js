import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Paper } from "@material-ui/core";
import image from "./bg.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "calc(100vh - 70px)",
    paddingTop: "1.5rem",
    paddingBottom: "2rem",
  },
  paper: {
    padding: "2rem",
    maxWidth: 800,
    margin: "0 auto 1.5rem",
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
    backgroundColor: "rgba(255,255,255,0.97)",
    [theme.breakpoints.down("sm")]: {
      padding: "1.25rem",
    },
  },
  title: {
    color: "#be6a77",
    fontWeight: 700,
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "#000000b3",
    marginBottom: "1.5rem",
    lineHeight: 1.6,
  },
  sectionTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#be6a77",
    marginTop: "1.5rem",
    marginBottom: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  body: {
    color: "#000000cc",
    lineHeight: 1.7,
    marginBottom: "0.75rem",
  },
  categoryList: {
    listStyle: "disc",
    paddingLeft: "1.5rem",
    marginTop: "0.5rem",
  },
  categoryItem: {
    marginBottom: "0.35rem",
    lineHeight: 1.6,
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Paper className={classes.paper} elevation={0}>
          <Typography variant="h4" className={classes.title}>
            Potato Plant Health Monitoring System
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            This application uses artificial intelligence to check the health of potato leaves from an uploaded image.
            It studies the leaf photo with a trained deep learning model and classifies it into one of three categories:
          </Typography>
          <ul className={classes.categoryList}>
            <li className={classes.categoryItem}>Healthy</li>
            <li className={classes.categoryItem}>Early Blight</li>
            <li className={classes.categoryItem}>Late Blight</li>
          </ul>
          <Typography variant="body1" className={classes.body}>
            The main purpose is to give a quick first check so farmers and growers can spot disease early and reduce crop loss.
          </Typography>

          <Typography variant="h6" className={classes.sectionTitle}>
            How it works
          </Typography>
          <ul className={classes.categoryList}>
            <li className={classes.categoryItem}>You upload a clear image of a potato leaf</li>
            <li className={classes.categoryItem}>The system processes and standardizes the image</li>
            <li className={classes.categoryItem}>A trained neural network analyzes disease patterns</li>
            <li className={classes.categoryItem}>The result is shown with a confidence percentage</li>
            <li className={classes.categoryItem}>Basic advice and precautions are displayed for the detected condition</li>
            <li className={classes.categoryItem}>All processing happens within seconds through a web interface.</li>
          </ul>

          <Typography variant="h6" className={classes.sectionTitle}>
            Key features
          </Typography>
          <ul className={classes.categoryList}>
            <li className={classes.categoryItem}>Direct image upload from phone or computer</li>
            <li className={classes.categoryItem}>Instant prediction with confidence score</li>
            <li className={classes.categoryItem}>Clear status of plant health</li>
            <li className={classes.categoryItem}>Suggested actions and simple precautions</li>
            <li className={classes.categoryItem}>Option to upload a new image anytime</li>
            <li className={classes.categoryItem}>Clean, responsive, and easy to use design</li>
          </ul>

          <Typography variant="h6" className={classes.sectionTitle}>
            Technology stack
          </Typography>
          <ul className={classes.categoryList}>
            <li className={classes.categoryItem}>Machine learning model built with TensorFlow and Keras</li>
            <li className={classes.categoryItem}>FastAPI based backend for fast prediction responses</li>
            <li className={classes.categoryItem}>React and Material UI for the user interface</li>
            <li className={classes.categoryItem}>Container ready setup for easy deployment</li>
            <li className={classes.categoryItem}>Trained on a public potato leaf disease image dataset</li>
          </ul>

          <Typography variant="h6" className={classes.sectionTitle}>
            Use cases
          </Typography>
          <ul className={classes.categoryList}>
            <li className={classes.categoryItem}>Quick field level disease checking</li>
            <li className={classes.categoryItem}>Educational and demonstration purposes</li>
            <li className={classes.categoryItem}>Support tool for small and medium farms</li>
            <li className={classes.categoryItem}>Prototype for smart agriculture systems</li>
          </ul>
        </Paper>
      </Container>
    </div>
  );
};

export default About;

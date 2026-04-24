import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Paper, Box, Link } from "@material-ui/core";
import image from "./bg.png";
import Email from "@material-ui/icons/Email";
import Code from "@material-ui/icons/Code";
import LinkedIn from "@material-ui/icons/LinkedIn";

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
    maxWidth: 600,
    margin: "0 auto",
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
    fontSize: "1rem",
    fontWeight: 700,
    color: "#be6a77",
    marginTop: "1.25rem",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  body: {
    color: "#000000cc",
    lineHeight: 1.7,
    marginBottom: "0.5rem",
  },
  linkRow: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(1),
    flexWrap: "wrap",
  },
  link: {
    color: "#be6a77",
    fontWeight: 600,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  icon: {
    color: "#be6a77",
    marginRight: theme.spacing(0.5),
    verticalAlign: "middle",
    fontSize: 20,
  },
  contactList: {
    paddingLeft: theme.spacing(2.5),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
  },
}));

const Contact = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Paper className={classes.paper} elevation={0}>
          <Typography variant="h4" className={classes.title}>
            Contact
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            Developer and Support
          </Typography>
          <Typography variant="body1" className={classes.body}>
            If you have feedback, ideas for improvement, or face any problem while using the system, you are welcome to reach out.
          </Typography>
          <Typography variant="body1" className={classes.body}>
            You can contact the developer for:
          </Typography>
          <ul className={classes.contactList}>
            <li>Bug reports or errors</li>
            <li>Feature suggestions</li>
            <li>Collaboration on research or projects</li>
            <li>Questions about the model, data, or implementation</li>
          </ul>

          <Typography variant="h6" className={classes.sectionTitle}>
            Contact details
          </Typography>
          <Box className={classes.linkRow}>
            <Email className={classes.icon} />
            <Link href="mailto:rohitkunwar1124@gmail.com" className={classes.link} target="_blank" rel="noopener noreferrer">
              rohitkunwar1124@gmail.com
            </Link>
            <Link href="mailto:aman2127kumar@gmail.com" className={classes.link} target="_blank" rel="noopener noreferrer">
              aman2127kumar@gmail.com
            </Link>
          </Box>
          <Box className={classes.linkRow}>
            <Code className={classes.icon} />
            <Link href="https://github.com/RohitKunwar1124" className={classes.link} target="_blank" rel="noopener noreferrer">
              https://github.com/RohitKunwar1124
            </Link>
          </Box>
          <Box className={classes.linkRow}>
            <LinkedIn className={classes.icon} />
            <Link href="https://linkedin.com/in/rohitkunwar1124" className={classes.link} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/rohitkunwar1124
            </Link>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Contact;

import React, { useState, useEffect, useRef, useCallback } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  CardActionArea,
  CardMedia,
  Grid,
  Button,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import image from "./bg.png";
import { DropzoneArea } from "material-ui-dropzone";
import { common } from "@material-ui/core/colors";
import Clear from "@material-ui/icons/Clear";
import Info from "@material-ui/icons/Info";
import VolumeUp from "@material-ui/icons/VolumeUp";
import YouTube from "@material-ui/icons/YouTube";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    "&:hover": {
      backgroundColor: "#ffffff7a",
    },
  },
}))(Button);
const axios = require("axios").default;

// Fallback advice when API does not return it (e.g. old backend or TF Serving without advice)
const ADVICE_BY_CLASS = {
  Healthy: {
    current_status: "Plant looks healthy. No visible disease symptoms.",
    what_to_do: [
      "Continue regular watering",
      "Keep proper spacing between plants for airflow",
      "Monitor leaves every few days for spots or yellowing",
    ],
    approximate_quantity: [
      "No fungicide needed now",
      "Use only preventive organic spray if you usually follow a schedule, for example neem oil 3–5 ml per liter of water",
    ],
    precautions: [
      "Avoid overwatering",
      "Remove any fallen or dead leaves from soil",
      "Use clean tools when pruning",
    ],
  },
  "Early Blight": {
    current_status:
      "Fungal infection has started. Brown spots with rings may spread if untreated.",
    what_to_do: [
      "Remove heavily infected leaves",
      "Start fungicide spray as soon as possible",
      "Repeat spray every 7–10 days if symptoms continue",
    ],
    approximate_quantity: [
      "Option 1: Mancozeb — Around 2 to 2.5 grams per liter of water",
      "Option 2: Copper based fungicide — Around 2 grams per liter of water",
      "Spray until leaves are evenly wet, not dripping.",
    ],
    precautions: [
      "Spray in early morning or late evening",
      "Do not spray before rain",
      "Wear gloves and mask while spraying",
      "Stop spraying a few days before harvesting",
    ],
  },
  "Late Blight": {
    current_status:
      "Serious and fast spreading disease. Leaves may show dark, wet looking patches.",
    what_to_do: [
      "Remove and destroy badly infected plants or leaves",
      "Start strong fungicide treatment immediately",
      "Spray again after 5–7 days if weather is cool and humid",
    ],
    approximate_quantity: [
      "Option 1: Metalaxyl + Mancozeb mix — About 2 to 2.5 grams per liter of water",
      "Option 2: Cymoxanil based fungicide — Around 3 grams per liter of water",
      "Ensure full coverage on both sides of leaves.",
    ],
    precautions: [
      "Do not mix different fungicides unless label says safe",
      "Clean the sprayer after use",
      "Keep children and animals away from treated area",
      "Avoid working in the field until spray has dried",
    ],
  },
};

const useStyles = makeStyles((theme) => ({
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  media: {
    height: 400,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "0.75rem 1em 1rem 1em",
  },
  mainContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "calc(100vh - 70px)",
    paddingTop: "0.5rem",
  },
  imageCard: {
    margin: "auto",
    width: "100%",
    maxWidth: 400,
    minHeight: 500,
    backgroundColor: "transparent",
    boxShadow: "0px 9px 70px 0px rgb(0 0 0 / 30%) !important",
    borderRadius: "15px",
  },
  imageCardWithResult: {
    height: 480,
    minHeight: 480,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  imageCardEmpty: {
    minHeight: "auto",
  },
  content: {
    padding: "2rem",
  },
  tableContainer: {
    backgroundColor: "transparent !important",
    boxShadow: "none !important",
  },
  table: {
    backgroundColor: "transparent !important",
  },
  tableHead: {
    backgroundColor: "transparent !important",
  },
  tableRow: {
    backgroundColor: "transparent !important",
  },
  tableCell: {
    fontSize: "22px",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    color: "#000000a6 !important",
    fontWeight: "bolder",
    padding: "1px 24px 1px 16px",
  },
  tableCell1: {
    fontSize: "14px",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    color: "#000000a6 !important",
    fontWeight: "bolder",
    padding: "1px 24px 1px 16px",
  },
  tableBody: {
    backgroundColor: "transparent !important",
  },
  buttonGrid: {
    maxWidth: 400,
    width: "100%",
  },
  detail: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  loader: {
    color: "#be6a77 !important",
  },
  title: {
    marginTop: "1rem",
    color: "#be6a77",
  },
  adviceSection: {
    width: "100%",
    maxWidth: 400,
    textAlign: "left",
    padding: "0 1rem 1rem",
  },
  adviceHeading: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#000000a6",
    marginTop: "1rem",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  adviceParagraph: {
    fontSize: "15px",
    color: "#000000cc",
    margin: 0,
    lineHeight: 1.5,
  },
  adviceList: {
    margin: 0,
    paddingLeft: "1.25rem",
    fontSize: "15px",
    color: "#000000cc",
    lineHeight: 1.6,
  },
  adviceListItem: {
    marginBottom: "0.35rem",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: 400,
    flexShrink: 0,
  },
  iconGroup: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
    display: "flex",
    gap: 8,
  },
  imageIconBtn: {
    color: "rgba(255,255,255,0.95)",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#fff",
      backgroundColor: "rgba(190, 106, 119, 0.9)",
      boxShadow: "0 0 16px rgba(190, 106, 119, 0.6)",
    },
    "&:focus": {
      outline: "2px solid rgba(255,255,255,0.9)",
      outlineOffset: 2,
    },
  },
  imageIconBtnGlow: {
    animation: "$iconPulse 1.8s ease-in-out infinite",
  },
  "@keyframes iconPulse": {
    "0%, 100%": {
      boxShadow:
        "0 0 12px rgba(190, 106, 119, 0.8), 0 0 24px rgba(190, 106, 119, 0.5)",
      backgroundColor: "rgba(190, 106, 119, 0.75)",
    },
    "50%": {
      boxShadow:
        "0 0 20px rgba(190, 106, 119, 1), 0 0 40px rgba(190, 106, 119, 0.7)",
      backgroundColor: "rgba(190, 106, 119, 0.95)",
    },
  },
  resultBar: {
    padding: "0.75rem 1.25rem",
    backgroundColor: "white",
    borderTop: "1px solid rgba(0,0,0,0.08)",
    borderRadius: "0 0 15px 15px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "1rem",
  },
  resultBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    flex: 1,
    minWidth: 0,
  },
  resultBlockLeft: {
    alignItems: "flex-start",
    textAlign: "left",
  },
  resultBlockRight: {
    alignItems: "flex-end",
    textAlign: "right",
  },
  resultLabel: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#00000099",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  resultValue: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#be6a77",
  },
  resultConfidence: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#000000b3",
  },
  advicePanelCard: {
    width: "100%",
    maxWidth: 400,
    height: 480,
    minHeight: 480,
    flexShrink: 0,
    overflow: "auto",
    backgroundColor: "white",
    borderRadius: 15,
    boxShadow: "0px 9px 70px 0px rgb(0 0 0 / 30%)",
    border: "1px solid rgba(0,0,0,0.06)",
    padding: 0,
    transition: "box-shadow 0.3s ease",
    animation: "$panelFadeIn 0.35s ease",
    "&:hover": {
      boxShadow: "0 12px 40px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.1)",
    },
  },
  "@keyframes panelFadeIn": {
    from: { opacity: 0, transform: "translateX(12px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  advicePanelHeader: {
    padding: "1.25rem 1.5rem",
    background:
      "linear-gradient(135deg, rgba(190, 106, 119, 0.12) 0%, rgba(139, 90, 70, 0.08) 100%)",
    borderBottom: "2px solid rgba(190, 106, 119, 0.2)",
    borderRadius: "15px 15px 0 0",
  },
  advicePanelTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#000000b3",
    letterSpacing: "0.3px",
    margin: 0,
  },
  advicePanelSection: {
    padding: "1rem 1.5rem",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    transition: "background-color 0.2s ease",
    "&:last-of-type": { borderBottom: "none" },
    "&:hover": {
      backgroundColor: "rgba(190, 106, 119, 0.04)",
    },
  },
  advicePanelHeading: {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "#be6a77",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  advicePanelText: {
    fontSize: "0.9375rem",
    color: "#000000cc",
    margin: 0,
    lineHeight: 1.55,
  },
  actionLinksWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "0.25rem",
  },
  actionLinkBtn: {
    borderRadius: 999,
    textTransform: "none",
    fontWeight: 600,
    padding: "0.35rem 0.75rem",
    borderColor: "rgba(190, 106, 119, 0.45)",
    color: "#be6a77",
    backgroundColor: "rgba(190, 106, 119, 0.06)",
    "&:hover": {
      borderColor: "rgba(190, 106, 119, 0.9)",
      backgroundColor: "rgba(190, 106, 119, 0.12)",
    },
    "&:focus": {
      outline: "2px solid rgba(190, 106, 119, 0.35)",
      outlineOffset: 2,
    },
  },
  actionLinkBtnProduct: {
    borderColor: "rgba(70, 90, 150, 0.45)",
    color: "rgba(70, 90, 150, 0.95)",
    backgroundColor: "rgba(70, 90, 150, 0.06)",
    "&:hover": {
      borderColor: "rgba(70, 90, 150, 0.9)",
      backgroundColor: "rgba(70, 90, 150, 0.12)",
    },
  },
  advicePanelList: {
    margin: 0,
    paddingLeft: "1.25rem",
    fontSize: "0.9375rem",
    color: "#000000cc",
    lineHeight: 1.65,
  },
  advicePanelListItem: {
    marginBottom: "0.4rem",
  },
  resultLayout: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "1.5rem",
    width: "100%",
    maxWidth: 860,
    margin: "0 auto",
  },
  resultLayoutWithPanel: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
    width: "100%",
    maxWidth: 860,
    margin: "0 auto",
    alignItems: "stretch",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      gap: "1rem",
    },
  },
  leftBox: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  rightBox: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  },
  imageCardCentered: {
    width: "100%",
    maxWidth: 400,
  },
  infoPanelWrapper: {
    overflow: "hidden",
    transition: "opacity 0.35s ease, transform 0.35s ease",
    opacity: 0,
    transform: "translateX(12px)",
    pointerEvents: "none",
    height: 480,
    minHeight: 480,
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      minHeight: 400,
    },
  },
  infoPanelWrapperOpen: {
    opacity: 1,
    transform: "translateX(0)",
    pointerEvents: "auto",
  },
  listenButton: {
    marginTop: "0.75rem",
    marginBottom: "0.5rem",
    borderRadius: 10,
    padding: "0.6rem 1rem",
    background:
      "linear-gradient(135deg, rgba(100, 120, 180, 0.9) 0%, rgba(70, 90, 150, 0.9) 100%)",
    color: "#fff",
    fontSize: "0.9rem",
    fontWeight: 600,
    textTransform: "none",
    transition: "all 0.25s ease",
    "&:hover": {
      background:
        "linear-gradient(135deg, rgba(100, 120, 180, 1) 0%, rgba(70, 90, 150, 1) 100%)",
      transform: "translateY(-1px)",
    },
    "&:focus": {
      outline: "2px solid rgba(255,255,255,0.8)",
      outlineOffset: 2,
    },
  },
}));
export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [infoPanelOpen, setInfoPanelOpen] = useState(false);
  const [infoIconClicked, setInfoIconClicked] = useState(false);
  const [soundIconClicked, setSoundIconClicked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const advicePanelRef = useRef(null);
  let confidence = 0;

 const sendFile = useCallback(async () => {
  if (!selectedFile) return;

  setIsLoading(true);

  try {
    let formData = new FormData();
    formData.append("file", selectedFile);

    let res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/predict`,
      data: formData,
    });

    if (res.status === 200) {
      setData(res.data);
    }
  } catch (err) {
    alert("Server error or slow response. Try again.");
    console.error(err);
  } finally {
    setIsLoading(false);
  }
}, [selectedFile]);

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
    setInfoPanelOpen(false);
    setInfoIconClicked(false);
    setSoundIconClicked(false);
    setIsSpeaking(false);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const toggleInfoPanel = () => {
    setInfoIconClicked(true);
    setInfoPanelOpen((prev) => !prev);
  };

  const getPanelText = useCallback(
    (advice) => {
      if (!data) return "";
      const diseaseDescription =
        advice.disease_description || advice.current_status || "Not specified.";
      const symptomsList = Array.isArray(advice.symptoms)
        ? advice.symptoms
        : [];
      const symptomsText = symptomsList.length
        ? symptomsList.join(". ") + "."
        : advice.current_status
          ? advice.current_status + "."
          : "See description above.";
      const parts = [
        `Label: ${data.class}.`,
        `Confidence: ${confidence} percent.`,
        `Disease description: ${diseaseDescription}`,
        `Symptoms: ${symptomsText}`,
        "Recommended actions: " + (advice.what_to_do || []).join(". ") + ".",
        "Approximate quantity to use: " +
          (advice.approximate_quantity || []).join(". ") +
          ".",
        "Precautions: " + (advice.precautions || []).join(". ") + ".",
      ];
      return parts.join(" ");
    },
    [data, confidence],
  );

  const handleSoundClick = useCallback(() => {
    if (!infoPanelOpen) return;
    setSoundIconClicked(true);
    if (typeof window === "undefined" || !window.speechSynthesis || !data)
      return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const advice =
      data.advice &&
      (data.advice.current_status ||
        (data.advice.what_to_do && data.advice.what_to_do.length))
        ? data.advice
        : ADVICE_BY_CLASS[data.class] || {};
    const text = getPanelText(advice);
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.lang = "en-US";
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }, [infoPanelOpen, data, isSpeaking, getPanelText]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && infoPanelOpen) {
        setInfoPanelOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [infoPanelOpen]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsLoading(true);
    sendFile();
  }, [preview, sendFile]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  const getConfidenceColor = (level) => {
    if (level === "High") return "green";
    if (level === "Medium") return "orange";
    return "red";
  };

  return (
    <React.Fragment>
      <Container
        maxWidth={false}
        className={classes.mainContainer}
        disableGutters={true}
      >
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {!image && (
            <Grid item xs={12}>
              <Card
                className={`${classes.imageCard} ${classes.imageCardEmpty}`}
              >
                <CardContent className={classes.content}>
                  {/* Hidden camera input */}
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    id="cameraInput"
                    style={{ display: "none" }}
                    onChange={(e) => onSelectFile(e.target.files)}
                  />

                  {/*Camera Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      document.getElementById("cameraInput").click()
                    }
                    style={{ marginBottom: "10px" }}
                  >
                    Take Photo
                  </Button>

                  {/* Dropzone */}
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={"Drag, drop OR click OR use camera"}
                    onChange={onSelectFile}
                    inputProps={{ capture: "environment" }}
                  />
                </CardContent>
              </Card>
            </Grid>
          )}
          {image && !data && (
            <Grid item xs={12}>
              <Card className={classes.imageCard}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={preview}
                    component="img"
                    title="Potato leaf"
                  />
                </CardActionArea>
                {isLoading && (
                  <CardContent className={classes.detail}>
                    <CircularProgress
                      color="secondary"
                      className={classes.loader}
                    />
                    <Typography className={classes.title} variant="h6" noWrap>
                      Analyzing leaf... please wait
                    </Typography>
                  </CardContent>
                )}
              </Card>
            </Grid>
          )}
          {image &&
            data &&
            (() => {
              const advice =
                data.advice &&
                (data.advice.current_status ||
                  (data.advice.what_to_do && data.advice.what_to_do.length))
                  ? data.advice
                  : ADVICE_BY_CLASS[data.class] || {};
              const hasAdvice =
                advice.current_status ||
                (advice.what_to_do && advice.what_to_do.length);
              const diseaseDescription =
                advice.disease_description || advice.current_status || "";
              const symptoms = Array.isArray(advice.symptoms)
                ? advice.symptoms
                : [];
              const videos = advice.video || {};
              const hasVideos = Boolean(videos.english || videos.hindi);
              const products = Array.isArray(advice.products)
                ? advice.products
                : [];
              const hasProducts = products.length > 0;
              return (
                <Grid item xs={12}>
                  <div
                    className={
                      infoPanelOpen
                        ? classes.resultLayoutWithPanel
                        : classes.resultLayout
                    }
                  >
                    <div className={classes.leftBox}>
                      <Card
                        className={`${classes.imageCard} ${classes.imageCardWithResult} ${infoPanelOpen ? "" : classes.imageCardCentered}`}
                      >
                        <div className={classes.imageWrapper}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image={preview}
                              component="img"
                              title="Potato leaf"
                            />
                          </CardActionArea>
                          <div className={classes.iconGroup}>
                            <IconButton
                              className={`${classes.imageIconBtn} ${!infoIconClicked ? classes.imageIconBtnGlow : ""}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleInfoPanel();
                              }}
                              aria-expanded={infoPanelOpen}
                              aria-label={
                                infoPanelOpen
                                  ? "Hide information panel"
                                  : "Show information panel"
                              }
                              size="small"
                            >
                              <Info />
                            </IconButton>
                            <IconButton
                              className={`${classes.imageIconBtn} ${!soundIconClicked ? classes.imageIconBtnGlow : ""}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSoundClick();
                              }}
                              aria-label={
                                infoPanelOpen
                                  ? isSpeaking
                                    ? "Stop reading aloud"
                                    : "Listen to classification and care information"
                                  : "Open info panel first to listen"
                              }
                              size="small"
                              title={
                                infoPanelOpen
                                  ? isSpeaking
                                    ? "Stop"
                                    : "Listen"
                                  : "Open info panel first to listen"
                              }
                            >
                              <VolumeUp />
                            </IconButton>
                          </div>
                        </div>
                        <div className={classes.resultBar}>
                          <div
                            className={`${classes.resultBlock} ${classes.resultBlockLeft}`}
                          >
                            <span className={classes.resultLabel}>Label:</span>
                            <span className={classes.resultValue}>
                              {data.class}
                            </span>
                          </div>
                          <div
                            className={`${classes.resultBlock} ${classes.resultBlockRight}`}
                          >
                            <span className={classes.resultLabel}>
                              Confidence:
                            </span>
                            <span
                              className={classes.resultConfidence}
                              style={{
                                color: getConfidenceColor(
                                  data?.confidence_level,
                                ),
                              }}
                            >
                              {data?.confidence_level} ({confidence}%
                              confidence)
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>
                    {infoPanelOpen && (
                      <div className={classes.rightBox} ref={advicePanelRef}>
                        <div
                          className={`${classes.infoPanelWrapper} ${infoPanelOpen ? classes.infoPanelWrapperOpen : ""}`}
                          aria-hidden={!infoPanelOpen}
                          role="region"
                          aria-label="Classification details and care guide"
                        >
                          <Card className={classes.advicePanelCard}>
                            <div className={classes.advicePanelHeader}>
                              <Typography className={classes.advicePanelTitle}>
                                Classification & care guide
                              </Typography>
                            </div>
                            <div className={classes.advicePanelSection}>
                              <Typography
                                className={classes.advicePanelHeading}
                              >
                                Label:
                              </Typography>
                              <p className={classes.advicePanelText}>
                                {data.class}
                              </p>
                            </div>
                            <div className={classes.advicePanelSection}>
                              <Typography
                                className={classes.advicePanelHeading}
                              >
                                Confidence:
                              </Typography>
                              <p className={classes.advicePanelText}>
                                {data?.confidence_level} ({confidence}%
                                confidence)
                              </p>
                            </div>
                            {hasAdvice && (
                              <>
                                <div className={classes.advicePanelSection}>
                                  <Typography
                                    className={classes.advicePanelHeading}
                                  >
                                    Disease description
                                  </Typography>
                                  <p className={classes.advicePanelText}>
                                    {diseaseDescription || "Not specified."}
                                  </p>
                                </div>
                                <div className={classes.advicePanelSection}>
                                  <Typography
                                    className={classes.advicePanelHeading}
                                  >
                                    Symptoms
                                  </Typography>
                                  {symptoms.length > 0 ? (
                                    <ul className={classes.advicePanelList}>
                                      {symptoms.map((item, i) => (
                                        <li
                                          key={i}
                                          className={
                                            classes.advicePanelListItem
                                          }
                                        >
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className={classes.advicePanelText}>
                                      {advice.current_status ||
                                        "See description above."}
                                    </p>
                                  )}
                                </div>
                                <div className={classes.advicePanelSection}>
                                  <Typography
                                    className={classes.advicePanelHeading}
                                  >
                                    Recommended actions / treatments
                                  </Typography>
                                  <ul className={classes.advicePanelList}>
                                    {(advice.what_to_do || []).map(
                                      (item, i) => (
                                        <li
                                          key={i}
                                          className={
                                            classes.advicePanelListItem
                                          }
                                        >
                                          {item}
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                  <Typography
                                    className={classes.advicePanelHeading}
                                    style={{ marginTop: "0.75rem" }}
                                  >
                                    Approximate quantity to use
                                  </Typography>
                                  <ul className={classes.advicePanelList}>
                                    {(advice.approximate_quantity || []).map(
                                      (item, i) => (
                                        <li
                                          key={i}
                                          className={
                                            classes.advicePanelListItem
                                          }
                                        >
                                          {item}
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                </div>
                                <div className={classes.advicePanelSection}>
                                  <Typography
                                    className={classes.advicePanelHeading}
                                  >
                                    Precautions
                                  </Typography>
                                  <ul className={classes.advicePanelList}>
                                    {(advice.precautions || []).map(
                                      (item, i) => (
                                        <li
                                          key={i}
                                          className={
                                            classes.advicePanelListItem
                                          }
                                        >
                                          {item}
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                </div>
                              </>
                            )}
                            {(hasVideos || hasProducts) && (
                              <div className={classes.advicePanelSection}>
                                {hasVideos && (
                                  <>
                                    <Typography
                                      className={classes.advicePanelHeading}
                                    >
                                      <YouTube fontSize="small" />
                                      YouTube videos
                                    </Typography>
                                    <div className={classes.actionLinksWrap}>
                                      {videos.english && (
                                        <Button
                                          className={classes.actionLinkBtn}
                                          variant="outlined"
                                          size="small"
                                          href={videos.english}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          startIcon={
                                            <YouTube fontSize="small" />
                                          }
                                        >
                                          English
                                        </Button>
                                      )}
                                      {videos.hindi && (
                                        <Button
                                          className={classes.actionLinkBtn}
                                          variant="outlined"
                                          size="small"
                                          href={videos.hindi}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          startIcon={
                                            <YouTube fontSize="small" />
                                          }
                                        >
                                          Hindi
                                        </Button>
                                      )}
                                    </div>
                                  </>
                                )}
                                {hasProducts && (
                                  <>
                                    <Typography
                                      className={classes.advicePanelHeading}
                                      style={{
                                        marginTop: hasVideos ? "0.75rem" : 0,
                                      }}
                                    >
                                      <ShoppingCart fontSize="small" />
                                      Products (search links)
                                    </Typography>
                                    <div className={classes.actionLinksWrap}>
                                      {products.map((p, i) => (
                                        <Button
                                          key={`${p.name || "product"}-${i}`}
                                          className={`${classes.actionLinkBtn} ${classes.actionLinkBtnProduct}`}
                                          variant="outlined"
                                          size="small"
                                          href={p.search_link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          startIcon={
                                            <ShoppingCart fontSize="small" />
                                          }
                                        >
                                          {p.name || "Product"}
                                        </Button>
                                      ))}
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                            <div className={classes.advicePanelSection}>
                              <Button
                                className={classes.listenButton}
                                onClick={handleSoundClick}
                                aria-label={
                                  isSpeaking
                                    ? "Stop reading aloud"
                                    : "Listen to full information panel"
                                }
                                startIcon={<VolumeUp />}
                              >
                                {isSpeaking ? "Stop" : "Listen"}
                              </Button>
                            </div>
                          </Card>
                        </div>
                      </div>
                    )}
                  </div>
                </Grid>
              );
            })()}
          {data && (
            <Grid item xs={12} className={classes.buttonGrid}>
              <ColorButton
                variant="contained"
                className={classes.clearButton}
                color="primary"
                component="span"
                size="large"
                onClick={clearData}
                startIcon={<Clear fontSize="large" />}
              >
                Clear
              </ColorButton>
            </Grid>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import EcoIcon from "@material-ui/icons/Eco";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import OpacityIcon from "@material-ui/icons/Opacity";
import ScheduleIcon from "@material-ui/icons/Schedule";
import YouTubeIcon from "@material-ui/icons/YouTube";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RoomIcon from "@material-ui/icons/Room";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import image from "./bg.png";
import potatoimage from "./images/potatoimage.jpg";
import topcountry from "./images/topcountry.jpg";
import potatoStages from "./images/potatoStages.jpg";
import historyTc1 from "./images/history_tc1.jpg";
import historyTc2 from "./images/history_tc2.jpg";
import historyTc3 from "./images/history_tc3.jpg";
import indiaS1 from "./images/india_s1.jpg";
import indiaS2 from "./images/india_s2.jpg";
import indiaS3 from "./images/india_s3.jpg";
import stageSprouting from "./images/stage_sprouting.jpg";
import stageVegetative from "./images/stage_vegetative.jpg";
import stageTuberInitiation from "./images/stage_tuber_initiation.jpg";
import stageTuberDevelopment from "./images/stage_tuber_development.jpg";
import stageMaturityHarvesting from "./images/stage_maturity_harvesting.jpg";
import diseaseHealthy from "./images/disease_healthy.jpg";
import diseaseEarlyBlight from "./images/disease_early_blight.jpg";
import diseaseLateBlight from "./images/disease_late_blight.jpg";
import diseaseBacterialWilt from "./images/disease_bacterial_wilt.jpg";
import diseaseCommonScab from "./images/disease_common_scab.jpg";
import diseaseBlackScurf from "./images/disease_black_scurf.jpg";
import diseaseLeafRollVirus from "./images/disease_leaf_roll_virus.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "calc(100vh - 70px)",
    paddingTop: "1.5rem",
    paddingBottom: "2.25rem",
  },
  paper: {
    padding: "2rem",
    margin: "0 auto 1.5rem",
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
    backgroundColor: "rgba(255,255,255,0.97)",
    [theme.breakpoints.down("sm")]: {
      padding: "1.25rem",
    },
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "0.25rem",
    flexWrap: "wrap",
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 999,
    objectFit: "cover",
    boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
    border: "2px solid rgba(190,106,119,0.25)",
    background: "#fff",
  },
  title: {
    color: "#be6a77",
    fontWeight: 800,
    letterSpacing: 0.2,
  },
  subtitle: {
    color: "#000000b3",
    marginTop: "0.25rem",
    lineHeight: 1.7,
  },
  heroMedia: {
    width: "100%",
    borderRadius: 16,
    marginTop: "1.25rem",
    boxShadow: "0 12px 30px rgba(0,0,0,0.14)",
    border: "1px solid rgba(190,106,119,0.14)",
    overflow: "hidden",
    background: "#fff",
  },
  galleryImg: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 14,
    boxShadow: "0 12px 26px rgba(0,0,0,0.14)",
    border: "1px solid rgba(190,106,119,0.12)",
    background: "#fff",
    [theme.breakpoints.down("xs")]: {
      height: 180,
    },
  },
  sectionMedia: {
    width: "100%",
    borderRadius: 14,
    marginTop: "0.75rem",
    marginBottom: "0.25rem",
    boxShadow: "0 10px 26px rgba(0,0,0,0.10)",
    border: "1px solid rgba(190,106,119,0.12)",
    background: "#fff",
  },
  stageCardImage: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    borderRadius: 12,
    marginBottom: "0.75rem",
    border: "1px solid rgba(190,106,119,0.14)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
  },
  metaChips: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  sectionTitle: {
    fontSize: "1.05rem",
    fontWeight: 800,
    color: "#be6a77",
    marginTop: "1.5rem",
    marginBottom: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
  },
  list: {
    margin: 0,
    paddingLeft: "1.25rem",
    color: "#000000cc",
    lineHeight: 1.75,
  },
  card: {
    height: "100%",
    borderRadius: 16,
    background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 100%)",
    boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
    border: "1px solid rgba(190,106,119,0.14)",
  },
  cardTitleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    flexWrap: "wrap",
    marginBottom: "0.25rem",
  },
  badge: {
    fontWeight: 800,
    borderRadius: 999,
    padding: "0.35rem 0.75rem",
    fontSize: "0.8rem",
    color: "#fff",
    boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
  },
  badgeHealthy: { background: "linear-gradient(135deg,#1b8f3a 0%, #2bb24d 100%)" },
  badgeEarly: { background: "linear-gradient(135deg,#cf6b1b 0%, #f0943b 100%)" },
  badgeLate: { background: "linear-gradient(135deg,#a51e1e 0%, #d83a3a 100%)" },
  badgeBacterial: { background: "linear-gradient(135deg,#3e3e3e 0%, #6a6a6a 100%)" },
  badgeScab: { background: "linear-gradient(135deg,#7d6a58 0%, #a48a71 100%)" },
  badgeScurf: { background: "linear-gradient(135deg,#1c1c1c 0%, #3a3a3a 100%)" },
  badgeVirus: { background: "linear-gradient(135deg,#b68a00 0%, #e1b100 100%)" },
  cardSectionLabel: {
    fontWeight: 800,
    color: "#000000bf",
    marginTop: "0.75rem",
    marginBottom: "0.25rem",
  },
  actions: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    gap: theme.spacing(1),
    flexWrap: "wrap",
  },
  actionBtn: {
    borderRadius: 999,
    textTransform: "none",
    fontWeight: 700,
  },
  divider: {
    marginTop: theme.spacing(2),
  },
}));

const DiseaseCard = ({
  title,
  badgeClass,
  description,
  symptoms,
  treatment,
  youtube,
  product,
  image,
  imageAlt,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} elevation={0}>
      <CardContent>
        <img className={classes.stageCardImage} src={image} alt={imageAlt} />
        <div className={classes.cardTitleRow}>
          <Typography variant="h6" style={{ fontWeight: 800, color: "#222" }}>
            {title}
          </Typography>
          <span className={`${classes.badge} ${badgeClass}`}>{title}</span>
        </div>
        <Typography variant="body2" style={{ color: "#000000b3", lineHeight: 1.65 }}>
          {description}
        </Typography>

        <Typography variant="subtitle2" className={classes.cardSectionLabel}>
          Symptoms
        </Typography>
        <ul className={classes.list}>
          {symptoms.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <Typography variant="subtitle2" className={classes.cardSectionLabel}>
          Treatment / Care
        </Typography>
        <ul className={classes.list}>
          {treatment.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </CardContent>
      <CardActions className={classes.actions}>
        {youtube ? (
          <Button
            className={classes.actionBtn}
            variant="contained"
            color="secondary"
            startIcon={<YouTubeIcon />}
            href={youtube}
            target="_blank"
            rel="noreferrer"
          >
            Watch video
          </Button>
        ) : null}
        {product ? (
          <Button
            className={classes.actionBtn}
            variant="outlined"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            href={product}
            target="_blank"
            rel="noreferrer"
          >
            Buy product
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

const PotatoGuide = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Paper className={classes.paper} elevation={0}>
          <div className={classes.headerRow}>
            <img
              src={`${process.env.PUBLIC_URL || ""}/potatoicon.jpg`}
              alt="Potato logo"
              className={classes.logo}
            />
            <Typography variant="h4" className={classes.title}>
              About Potato (Solanum tuberosum)
            </Typography>
          </div>
          <Typography variant="body1" className={classes.subtitle}>
            Potato is a staple crop rich in carbohydrates, fiber, vitamin C, and potassium. The edible part is the{" "}
            <b>tuber</b> (grows underground) and it is used in boiled potatoes, chips, fries, and curries.
          </Typography>

          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid item xs={12} sm={4}>
              <img className={classes.galleryImg} src={potatoimage} alt="Potato plant (start)" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <img className={classes.galleryImg} src={topcountry} alt="Potato farming (start)" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <img className={classes.galleryImg} src={potatoStages} alt="Potato in soil (start)" />
            </Grid>
          </Grid>

          <div className={classes.metaChips}>
            <Chip icon={<EcoIcon />} label="Key crop for food security" />
            <Chip icon={<ScheduleIcon />} label="India season: Oct – Feb (Rabi)" />
            <Chip icon={<OpacityIcon />} label="Ideal temp: 15°C – 25°C" />
          </div>

          <Typography className={classes.sectionTitle}>History</Typography>
          <ul className={classes.list}>
            <li>Originated in the Andes (South America) around 7,000–10,000 years ago.</li>
            <li>Introduced to Europe in the 16th century and later spread worldwide.</li>
            <li>Today potato is among the top 4 food crops globally (with rice, wheat, maize).</li>
            <li>Top producers: China, India, Russia, Ukraine, United States.</li>
          </ul>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <img className={classes.galleryImg} src={historyTc1} alt="Potato field rows" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <img className={classes.galleryImg} src={historyTc2} alt="Harvested potatoes in soil" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <img className={classes.galleryImg} src={historyTc3} alt="Potato crop field" />
            </Grid>
          </Grid>

          <Typography className={classes.sectionTitle}>Major potato growing states (India)</Typography>
          <ul className={classes.list}>
            <li>Uttar Pradesh (highest production)</li>
            <li>West Bengal</li>
            <li>Bihar</li>
            <li>Punjab</li>
            <li>Gujarat</li>
          </ul>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <img className={classes.galleryImg} src={indiaS1} alt="Uttar Pradesh potato producers chart" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <img className={classes.galleryImg} src={indiaS2} alt="Potato field in India" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <img className={classes.galleryImg} src={indiaS3} alt="Punjab potato production infographic" />
            </Grid>
          </Grid>

          <Typography className={classes.sectionTitle}>Best season & conditions</Typography>
          <ul className={classes.list}>
            <li>Cool climate supports proper tuber formation.</li>
            <li>Maintain good airflow and avoid overwatering to reduce disease risk.</li>
          </ul>

          <Divider className={classes.divider} />

          <Typography className={classes.sectionTitle}>Growth stages</Typography>
          <Grid container spacing={2}>
            {[
              {
                icon: <LocalFloristIcon />,
                title: "1) Sprouting",
                image: stageSprouting,
                alt: "Sprouting potato seed",
                points: [
                  "Shoots come out from ‘eyes’; roots begin forming.",
                  "Plants emerge in ~10–20 days after planting.",
                  "Care: good seed, avoid too much water, light earthing-up.",
                ],
              },
              {
                icon: <EcoIcon />,
                title: "2) Vegetative growth",
                image: stageVegetative,
                alt: "Vegetative growth in potato crop",
                points: [
                  "Fast stem and leaf growth; leaves dense and green.",
                  "Needs: nitrogen, water, sunlight.",
                  "Care: remove weeds, check pests/disease, balanced fertilizer.",
                ],
              },
              {
                icon: <RoomIcon />,
                title: "3) Tuber initiation",
                image: stageTuberInitiation,
                alt: "Tuber initiation under soil",
                points: [
                  "Small tubers start forming under soil; flowers may appear.",
                  "Too much nitrogen is bad at this stage.",
                  "Care: reduce nitrogen, add potassium, keep soil moist.",
                ],
              },
              {
                icon: <OpacityIcon />,
                title: "4) Tuber development",
                image: stageTuberDevelopment,
                alt: "Tuber development stage",
                points: [
                  "Tubers increase in size below soil; plant looks healthy above.",
                  "Needs: steady water supply and potassium.",
                  "Care: don’t let soil dry; cover tubers to avoid greening.",
                ],
              },
              {
                icon: <ScheduleIcon />,
                title: "5) Maturity & harvesting",
                image: stageMaturityHarvesting,
                alt: "Maturity and harvesting stage",
                points: [
                  "Leaves turn yellow and dry; plant starts dying back.",
                  "Harvest after ~90–120 days when plant is fully dry.",
                  "Care: stop watering before harvest; harvest in dry weather; cure in shade.",
                ],
              },
            ].map((s) => (
              <Grid item xs={12} sm={6} key={s.title}>
                <Card className={classes.card} elevation={0}>
                  <CardContent>
                    <img className={classes.stageCardImage} src={s.image} alt={s.alt} />
                    <Box display="flex" alignItems="center" gridGap={10} mb={1}>
                      {s.icon}
                      <Typography variant="h6" style={{ fontWeight: 800 }}>
                        {s.title}
                      </Typography>
                    </Box>
                    <ul className={classes.list}>
                      {s.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider className={classes.divider} />

          <Typography className={classes.sectionTitle}>Diseases & management</Typography>
          <Typography variant="body2" style={{ color: "#000000b3", lineHeight: 1.65 }}>
            Quick reference for common potato problems. If symptoms are severe, consult your local agriculture expert.
          </Typography>

          <Box mt={2} mb={1}>
            <Chip icon={<WhatshotIcon />} label="Prevention: neem spray, proper watering, good airflow" />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DiseaseCard
                title="Healthy Plant"
                badgeClass={classes.badgeHealthy}
                description="A healthy plant shows strong growth, green leaves, and no visible infection."
                image={diseaseHealthy}
                imageAlt="Healthy potato tubers"
                symptoms={["Uniform green leaves", "No spots or discoloration", "Leaves are firm and fresh"]}
                treatment={["Regular watering", "Proper spacing", "Preventive neem spray"]}
                youtube="https://youtu.be/pZ4jRu_J37A?si=aZc3QT-mXH_FVmaX"
                product="https://www.amazon.in/s?k=neem+oil+plant+spray"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DiseaseCard
                title="Early Blight"
                badgeClass={classes.badgeEarly}
                description="Fungal disease (Alternaria solani) affecting older leaves first, common in warm and humid conditions."
                image={diseaseEarlyBlight}
                imageAlt="Early blight lesions on potato leaf"
                symptoms={[
                  "Brown spots with ring (target-like) pattern",
                  "Yellowing around spots",
                  "Older leaves affected first",
                  "Leaves dry and fall",
                ]}
                treatment={[
                  "Remove infected leaves",
                  "Spray Mancozeb (2–2.5 g/L) or Copper fungicide (2 g/L)",
                  "Repeat every 7–10 days",
                ]}
                youtube="https://youtu.be/UKf5eCNBvBw?si=8t2beBaALZuSlsEz"
                product="https://www.amazon.in/s?k=mancozeb+fungicide"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DiseaseCard
                title="Late Blight"
                badgeClass={classes.badgeLate}
                description="Highly destructive disease (Phytophthora infestans) that spreads quickly in cool and humid weather."
                image={diseaseLateBlight}
                imageAlt="Late blight in potato plants"
                symptoms={[
                  "Dark, wet patches on leaves",
                  "Fast spreading black/brown lesions",
                  "White growth on underside in humidity",
                  "Leaves rot and collapse",
                ]}
                treatment={[
                  "Remove infected plants immediately",
                  "Use Metalaxyl + Mancozeb; spray every 5–7 days",
                  "Alternative: Cymoxanil fungicide (as recommended)",
                ]}
                youtube="https://youtu.be/xvvHUHpfQbw?si=sUd8_5_HbHAeoES9"
                product="https://www.amazon.in/s?k=metalaxyl+mancozeb+fungicide"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DiseaseCard
                title="Bacterial Wilt"
                badgeClass={classes.badgeBacterial}
                description="Bacterial disease that blocks water flow in the plant, causing sudden wilting."
                image={diseaseBacterialWilt}
                imageAlt="Bacterial wilt in potato crop"
                symptoms={["Sudden wilting", "Leaves droop quickly", "No yellowing initially"]}
                treatment={["Remove infected plants", "Practice crop rotation", "Avoid contaminated irrigation water"]}
                youtube="https://youtu.be/yerfj-iJClY?si=gTGpcwjZzRfLy7pk"
                product="https://share.google/XSwI6IheRuLQRoFr2"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DiseaseCard
                title="Common Scab"
                badgeClass={classes.badgeScab}
                description="Bacterial disease affecting skin quality of potatoes."
                image={diseaseCommonScab}
                imageAlt="Common scab symptoms on potato tuber"
                symptoms={["Rough skin", "Brown patches", "Cracks on potato"]}
                treatment={["Maintain soil moisture", "Use good quality seeds", "Avoid very alkaline soil where possible"]}
                youtube="https://youtu.be/iUwyW0LB8AU?si=P-FDTEWRzpHnnU10"
                product="https://www.amazon.in/s?k=soil+treatment+fungicide"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DiseaseCard
                title="Black Scurf"
                badgeClass={classes.badgeScurf}
                description="Fungal disease (Rhizoctonia) that affects tuber quality and can weaken plant growth."
                image={diseaseBlackScurf}
                imageAlt="Black scurf spots on potato tubers"
                symptoms={["Black spots on potato", "Weak plant growth"]}
                treatment={["Use certified seeds", "Seed/soil treatment as recommended", "Avoid planting in cold, wet soil"]}
                youtube="https://youtu.be/Q5SF8c44Gbc?si=SMJGWS5mP85XALSm"
                product="https://www.spraykaro.com/product/monceren-fungicide-crystal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DiseaseCard
                title="Leaf Roll Virus"
                badgeClass={classes.badgeVirus}
                description="Virus disease spread mainly by aphids (insects)."
                image={diseaseLeafRollVirus}
                imageAlt="Leaf roll virus in potato leaves"
                symptoms={["Leaves curl upward", "Reduced growth"]}
                treatment={["Control insects (aphids)", "Use healthy seeds", "Remove heavily infected plants if needed"]}
                youtube="https://youtu.be/caVlSPqUZ4E?si=HkYw_jszUVk7zNsh"
                product="https://www.amazon.in/s?k=aphid+insecticide"
              />
            </Grid>
          </Grid>

          <Typography className={classes.sectionTitle}>Farming tips</Typography>
          <ul className={classes.list}>
            <li>Use certified seeds</li>
            <li>Avoid overwatering</li>
            <li>Maintain spacing</li>
            <li>Monitor regularly</li>
            <li>Use preventive sprays</li>
            <li>Practice crop rotation</li>
          </ul>
        </Paper>
      </Container>
    </div>
  );
};

export default PotatoGuide;


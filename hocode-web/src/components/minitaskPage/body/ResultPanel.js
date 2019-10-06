import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import "./resultPanel.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <div style={{ padding: "10px 20px", background: "#f5f5f5" }}>
        {children}
      </div>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      style={{ minHeight: "100%" }}
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ResultPanel(props) {
  //result panel is called in minitask page
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  const unit_tests = props.unit_tests || [];
  const result = props.result;
  function renderResultPanel(result) {
    if (result.passedQuantity !== undefined) {
      if (result.status === "pass") {
        return <div>Đã thành công</div>;
      } else {
        return (
          <React.Fragment>
            <div>Đã pass được 0/2 test</div>
            <div>Mô tả error: đasadasdsadasdsa</div>
          </React.Fragment>
        );
      }
    } else {
      return <div>chưa test</div>;
    }
  }
  function renderTestsPanel(result) {
    if (result.passedQuantity !== undefined) { // if result is not {},  in test panel show description of tests after run code
      return (
        <React.Fragment>
          <div>1/2 sample tests passed.</div>
          {unit_tests.map((unit_test, index) => {
            // unit_tests
            return (
              <ExpansionPanel key={index}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ flexGrow: 1 }}>Test {index + 1}</div>
                    <div style={{ width: "1em" }}>
                      <img
                        style={{ width: "100%" }}
                        src={process.env.PUBLIC_URL + "/logo.png"}
                        alt="Kiwi standing on oval"
                      />
                    </div>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div>
                    <Grid container>
                      <Grid item>Input: </Grid>
                      <Grid item style={{ marginLeft: 10 }}>
                        {unit_test.inputs.map((input, index) => (
                          <div key={index}>
                            param{index + 1}: {input.value}
                          </div>
                        ))}{" "}
                        {/*dùng key ở đây nguy hiểm */}
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item>Output: </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item>
                        Output mong đợi: {unit_test.expected_output}
                      </Grid>
                    </Grid>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </React.Fragment>
      );
    } else { // if result is {}
      return (
        <React.Fragment>
      
          {unit_tests.map((unit_test, index) => {
            // unit_tests
            return (
              <ExpansionPanel key={index}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ flexGrow: 1 }}>Test {index + 1}</div>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div>
                    <Grid container>
                      <Grid item>Input: </Grid>
                      <Grid item style={{ marginLeft: 10 }}>
                        {unit_test.inputs.map((input, index) => (
                          <div key={index}>
                            param{index + 1}: {input.value}
                          </div>
                        ))}{" "}
                        {/*dùng key ở đây nguy hiểm */}
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item>
                        Output mong đợi: {unit_test.expected_output}
                      </Grid>
                    </Grid>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </React.Fragment>
      );
    }
  }
  return (
    <div
      className={classes.root}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Tabs
        style={{ minHeight: "30px" }}
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
      >
        <LinkTab label="Danh sách test" href="/drafts" {...a11yProps(0)} />
        <LinkTab label="Kết quả" href="/trash" {...a11yProps(1)} />
      </Tabs>
      <div
        className="scroll_test"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          background: "#f5f5f5"
        }}
      >
        <TabPanel value={value} index={0}>
          {renderTestsPanel(result)}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {renderResultPanel(result)}
        </TabPanel>
      </div>
    </div>
  );
}

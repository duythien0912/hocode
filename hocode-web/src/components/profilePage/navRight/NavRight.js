import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import { getUser } from "../../../js/actions/userAction";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Carousel from "react-material-ui-carousel";

//import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
});
class NavRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daily_minitask: {},
      isLoading: true,
      books: [],
      events: [],
      openDialogReadmore: false,
      bookcontent: "",
      booktitlet: "",
      bookImage: ""
    };
  }
  getApi = async () => {
    await Promise.all([
      axios.get(`https://hocodevn.com/api/v1/books`).then(res => {
        const books = res.data;
        console.log(books);
        this.setState({ books });
      }),
      axios.get(`https://hocodevn.com/api/v1/events`).then(res => {
        const events = res.data;
        console.log(events);
        this.setState({ events });
      })
    ]);
    this.setState({ isLoading: false });
  };
  handleClickDialogReadmoreOpen = (bookcontent, bookImage, booktitlet) => {
    this.setState({
      openDialogReadmore: true,
      bookcontent: bookcontent,
      bookImage: bookImage,
      booktitlet: booktitlet
    });
  };

  handleDialogReadmoreClose = () => {
    this.setState({ openDialogReadmore: false });
  };
  componentDidMount() {
    this.props.getUser();
    this.getApi();
  }
  limitText(text, limitNum) {
    let newText = text;
    if (text.length > limitNum) {
      newText = text.substring(0, limitNum);
    }
    return newText;
  }
  render() {
    const { classes } = this.props;

    const itemCard = (listitem, type, time) => (
      <Grid
        xs
        style={{
          flexDirection: "column",
          justifyContent: "center",
          display: "flex",

        }}
      >
        <Carousel indicators={false} interval={time}>
          {/* <Typography gutterBottom variant="h5" component="h2">
            Sách đề xuất
          </Typography> */}
          {listitem.map(book => {
            return (
              <React.Fragment key={book.id}>
                <Grid item xs={12} sm={12} md={12}>
                  <Grid
                    style={{
                      marginTop: 10,
                      marginBottom: 10
                    }}
                  >
                    <Card className={classes.card}>
                      <CardActionArea
                        onClick={() => {
                          if (type == "books") {
                            this.handleClickDialogReadmoreOpen(
                              book.content,
                              book.image,
                              book.title
                            );
                          }
                          if (type == "events") {
                            window.open(book.link, "_blank");
                          }
                        }}
                      >
                        {/* <img
                         
                          alt="complex"
                          src={book.image}
                        /> */}
                        <div
                          style={{
                            width: "100%",
                            height: type == "books" ? "200px" : "60px",
                            // objectFit: "cover",
                            background: `url(${book.image}) no-repeat center`,
                            backgroundSize: "cover"
                          }}
                        ></div>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            style={{
                              height: 55,
                              overflow: "hidden",
                              wordBreak: "break-word"
                            }}
                          >
                            {book.title}
                          </Typography>

                          {book.content.length > 100 ? (
                            <React.Fragment>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                style={{
                                  height: 48,
                                  overflow: "hidden",
                                  wordBreak: "break-word"
                                }}
                              >
                                {this.limitText(book.content, 100)}...
                              </Typography>
                            </React.Fragment>
                          ) : (
                            book.content
                          )}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          })}
        </Carousel>
        <Dialog
          open={this.state.openDialogReadmore}
          onClose={this.handleDialogReadmoreClose}
          aria-labelledby="customized-dialog-title"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.handleDialogReadmoreClose}
          >
            {this.state.booktitlet}
          </DialogTitle>

          <DialogContent dividers>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid
                item
                xs={4}
                style={{
                  background: `url(${this.state.bookImage}) no-repeat center`,
                  backgroundSize: "cover",
                  height: "300px"
                }}
              ></Grid>
              <Grid
                item
                xs={8}
                style={{
                  padding: "16px"
                }}
              >
                {/* <DialogContentText id="alert-dialog-description">
                  {this.state.booktitlet}

                </DialogContentText> */}

                <DialogContentText id="alert-dialog-description">
                  {this.state.bookcontent}
                </DialogContentText>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    );

    return (
      <React.Fragment>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          {itemCard(this.state.books, "books", 8000)}
          <Divider></Divider>
          {itemCard(this.state.events, "events", 12000)}

          {/* <Grid style={{ flexGrow: 1 }}>
            <Grid item xs={12} sm={12} md={12}>
              <Paper className={classes.paper}>
                <div style={{ fontWeight: "bold" }}>Sự kiện nổi bật</div>{" "}
                <Carousel>
                  {this.state.events.map(event => {
                    return (
                      <React.Fragment key={event.id}>
                        <Grid
                          style={{
                            border: "1px solid #0000001f",
                            borderRadius: "4px",
                            marginTop: 10,
                            marginBottom: 10
                          }}
                        >
                          <Card className={classes.card}>
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: "none" }}
                            >
                              <CardActionArea>
                                <img
                                  style={{
                                    width: "100%",
                                    height: "100",
                                    objectFit: "cover"
                                  }}
                                  alt="complex"
                                  src={event.image}
                                />
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                  >
                                    {event.title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                  >
                                    {event.content}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </a>
                          </Card>
                        </Grid>
                      </React.Fragment>
                    );
                  })}
                </Carousel>
              </Paper>
            </Grid>
          </Grid> */}
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
  errors: state.rootReducer.errors,
  user: state.rootReducer.user
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { getUser })(NavRight)
);

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getUser } from "../../../js/actions/userAction";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

//import { Link } from "react-router-dom";

const styles = theme => ({});
class NavRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daily_minitask: {},
      isLoading: true,
      books: [],
      openDialogReadmore: false,
      bookcontent: ""
    };
  }
  getApi = async () => {
    await Promise.all([
      axios.get(`https://hocodevn.com/api/v1/books`).then(res => {
        const books = res.data;
        console.log(books);
        this.setState({ books });
      })
    ]);
    this.setState({ isLoading: false });
  };
  handleClickDialogReadmoreOpen = bookcontent => {
    this.setState({ openDialogReadmore: true, bookcontent: bookcontent });
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
    return (
      <React.Fragment>
        <Grid>
          <div style={{ fontWeight: "bold" }}>Sách đề xuất</div>

          <Grid container spacing={3}>
            {this.state.books.map(book => {
              return (
                <React.Fragment key={book.id}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Grid
                      style={{
                        border: "1px solid #0000001f",
                        borderRadius: "4px",
                        marginTop: 10,
                        marginBottom: 10
                      }}
                    >
                      <Card className={classes.card}>
                        <CardActionArea
                          onClick={() => {
                            this.handleClickDialogReadmoreOpen(book.content);
                          }}
                        >
                          <img
                            style={{
                              width: "100%",
                              height: "100",
                              objectFit: "cover"
                            }}
                            alt="complex"
                            src={book.image}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {book.title}
                            </Typography>

                            {book.content.length > 100 ? (
                              <React.Fragment>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
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
            <Dialog
              open={this.state.openDialogReadmore}
              onClose={this.handleDialogReadmoreClose}
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {this.state.bookcontent}
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </Grid>
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

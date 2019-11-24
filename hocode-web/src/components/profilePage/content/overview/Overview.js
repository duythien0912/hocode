import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import EmojiNatureIcon from "@material-ui/icons/EmojiNature";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = {
  paper: {
    padding: 16,
    marginTop:16
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    // width: "100%",

    height: 180,
  },

};

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      courses: [],
      events: [],
      books: []
    };
    this.getApi = this.getApi.bind(this);
  }
    getApi=async () =>{
    await Promise.all([
      axios.get(`https://hocodevn.com/auth/usercourse`).then(res => {
        const courses = res.data;
        console.log(courses);
        this.setState({ courses: courses.course_info });
      }),
  
      axios.get(`https://hocodevn.com/api/v1/events`).then(res => {
        const events = res.data;
        console.log(events);
        this.setState({ events });
      }),
      axios.get(`https://hocodevn.com/api/v1/books`).then(res => {
        const books = res.data;
        console.log(books);
        this.setState({ books });
      }),]
    );
    this.setState({isLoading:false})
  }
  componentDidMount() {
    this.getApi();
    
  }

  render() {
    const {isLoading} = this.state;
    const { classes } = this.props;
    let url = this.props.url;
    return (
      <Grid container spacing={3} style={{height:'100%'}}>
        {isLoading?<div className="sweet-loading" style={{display:'flex',alignItems:"center",justifyContent:'center',width:'100%',height:'100vh'}}>
              <HashLoader
              
                sizeUnit={"px"}
                size={50}
                color={"#AEA8A8"}
                loading={isLoading}
              />
            </div> : (
              <React.Fragment>
                        <Grid item xs={12} sm={5} md={5}>
          <Paper className={classes.paper}>
            <Grid container style={{ marginBottom: 15 }}>
              <Grid item style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: "bold" }}>Kết quả học tập</div>{" "}
              </Grid>
              <Grid item>
                <div style={{ fontSize: 12, color: "#4978cc" }}>
                  Code point:{" "}
                  <EmojiNatureIcon style={{ fontSize: 16, marginRight: 1 }} />
                  {this.props.user.codepoint}
                </div>
              </Grid>
            </Grid>

            {this.state.courses.map(course => {
              return (
                <React.Fragment key={course.course_id}>
                  <Grid container style={{ alignItems: "center" }}>
                    <Grid item>
                      <img
                        className={classes.img}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                        alt="complex"
                        src={course.background_image}
                      />
                    </Grid>
                    <Grid item style={{ flexGrow: 1, padding: 10 }}>
                      <div style={{ fontWeight: "bold" }}>
                        <Link
                          className="item"
                          key={course.course_id}
                          style={{ textDecoration: "none" }}
                          to={`${url}/courses/${course.course_id}/tasks`}
                        >
                          {course.course_name}
                        </Link>
                      </div>
                      <div style={{ color: "#9d9d9d" }}>
                        {course.completed_tasks_count}/
                        {course.total_tasks_count}
                      </div>
                    </Grid>
                    <Grid item>
                      <LinearProgress
                        variant="determinate"
                        value={
                          (course.completed_tasks_count /
                            course.total_tasks_count) *
                          100
                        }
                        style={{ width: 115 }}
                      />
                    </Grid>
                  </Grid>
                  <Divider style={{ margin: "auto" }} />{" "}
                </React.Fragment>
              );
            })}
          </Paper>
          <Paper className={classes.paper}>
            <div style={{ fontWeight: "bold" }}>Sách đề xuất</div>{" "}
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
                        <img
                          style={{
                            width: "100%",
                            height: "100",
                            objectFit: "cover"
                          }}
                          alt="complex"
                          src={book.image}
                        />
                        <Grid
                          container
                          direction="column"
                          style={{ alignItems: "center" }}
                        >
                          <Grid item style={{fontWeight:'bold'}}>{book.title}</Grid>
                          <Grid item style={{textAlign:'justify',padding:10}} > {book.content}</Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                );
              })}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          <Paper className={classes.paper}>
            <div style={{ fontWeight: "bold" }}>Sự kiện nổi bật</div>{" "}
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

{/* <Card className={classes.card}>
      <CardActionArea >
        <CardMedia
          className={classes.media}
          image={event.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {event.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {event.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{justifyContent: 'center'}}>
        <Button size="small" color="primary">
          Chi tiết
        </Button>
      </CardActions>
    </Card> */}
 

                    <img
                      style={{
                        width: "100%",
                        height: "100",
                        objectFit: "cover"
                      }}
                      alt="complex"
                      src={event.image}
                    />
                    <Grid
                      container
                      direction="column"
                      style={{ alignItems: "center" }}
                    >
                      <Grid item style={{ }}>
                      <a href={event.link} style={{fontWeight: "bold",textAlign:"center",textDecoration:"none"}} >{event.title}</a>
                        
                      </Grid>
                      <Grid item style={{ textAlign: "justify", padding: 10 }}>
                        {" "}
                        {event.content}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider style={{ width: 100, margin: "auto" }} />
                </React.Fragment>
              );
            })}
          </Paper>
        </Grid>
        
              </React.Fragment>
            )}

   
        
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  user: state.rootReducer.user
});
export default withStyles(styles)(
  connect(
    mapStateToProps,
    {}
  )(Overview)
);

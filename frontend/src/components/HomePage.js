import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
  }

  async componentDidMount() {
    fetch('/api/user-in-room')
      .then((response) => response.json())
      .then((data) => {
        
        this.setState({
          roomCode: data.code,
        });
      });
  }

  HomePagerendering() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    ); 
  }

  renderHomePage() {
    var page;
    this.state.roomCode ? page = <Redirect to={`/room/${this.state.roomCode}`} />: page = this.HomePagerendering();
    console.log(page)
    return page;
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" render={() => { return this.renderHomePage() }} />

          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
      </Router>
    );
  }
}

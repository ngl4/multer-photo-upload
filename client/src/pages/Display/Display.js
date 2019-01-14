import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import "./Display.css";
import Nav from "../../components/Nav";
// const BASE_URL = "http://localhost:3000/";
// import BearCard from "../../components/BearCard";
import ThreeScene from "../../components/ThreeScene";

class Display extends Component {
  state = {
    score: 0,
    topScore: 0,
    array: [],
    guessedCorrect: true,
    images: [],
    imageUrls: [],
    imageUrl: "",
    message: "",
    errMessage: "",
    uploadMessage: "",
    about_title: "",
    about_textarea: ""
  };

  componentDidMount() {
    // axios.get(BASE_URL + "api/images")
    // .then(response => {
    //   console.log(response);
    // });

    //part of multer npm  --- section is not needed 
    // axios.get("/api/section/1").then(response => {
    //   if (response.data.length === 0) {
    //     this.setState({
    //       imageUrl: ""
    //     });
    //   } else {
    //     this.setState({
    //       imageUrl: "uploads/" + response.data[0].image_filename
    //     });
    //   }
    // });

    axios.get("/api/testgetimages").then(response => {
      if (response.data.length === 0) {
        this.setState({
          imageUrl2: ""
        });
      } else {
        this.setState({
          imageUrl2: "uploads/" + response.data[0].image_filename
        });
      }
    });

    axios.get("/api/displayText").then(response => {
      if (response.data.length === 0) {
        this.setState({
          about_title: "",
          about_textarea: ""
        });
      } else {
        this.setState({
          about_title: response.data[0].content,
          about_textarea: response.data[1].content
        });
      }
    })
  }

  shuffleArray = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  handleClickImage = elem => {
    //console.log(elem);
    var newArray = [...this.state.array];

    if (newArray.length === 0) {
      newArray.push(elem);
      this.setState({
        guessedCorrect: true
      });
      if (this.state.score >= this.state.topScore) {
        this.setState({
          score: this.state.score + 1,
          topScore: this.state.topScore + 1,
          array: newArray,
          guessedCorrect: true
        });
        console.log("%cyou guessed correctly", "color: green");
      } else {
        this.setState({
          score: this.state.score + 1,
          topScore: this.state.topScore,
          array: newArray
        });
        console.log("%cyou guessed correctly", "color: green");
      }
    } else {
      const found = newArray.includes(elem);

      if (!found) {
        newArray.push(elem);
        if (this.state.score >= this.state.topScore) {
          this.setState({
            score: this.state.score + 1,
            topScore: this.state.topScore + 1,
            array: newArray,
            guessedCorrect: true
          });
          console.log("%cyou guessed correctly", "color: green");
        } else {
          this.setState({
            score: this.state.score + 1,
            topScore: this.state.topScore,
            array: newArray,
            guessedCorrect: true
          });
          console.log("%cyou guessed correctly", "color: green");
        }
      } else {
        this.setState({
          score: 0,
          topScore: this.state.topScore,
          array: [],
          guessedCorrect: false
        });
        console.log("%cyou guessed incorrectly", "color: red");
      }
    }

    console.log(newArray);
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          {/* Sticky Header: Name(link), state, Score and Top Score */}
          <header className="bg-danger p-4 fixed-top">
            <div className="container d-flex justify-content-between text-white font-weight-bold">
              {/* <div className="header-title"></div> */}
              <Nav />
              <div className="header-midtitle">Clickling Game</div>
              <div className="header-scoretitle">
                Score: {this.state.score} | Top Score: {this.state.topScore}{" "}
              </div>
            </div>
          </header>

          {/* Heading */}
          <div className="jumbotron jumbotron-fluid mt-5 heading-background text-white">
            <div className="container mt-5 mb-5 text-center">
              <h1 className="display-4">
                <strong>Clickling Game </strong>
              </h1>
              <p className="lead">
                Click on an image to earn points, but don't click on any more
                than once!
              </p>
            </div>
          </div>

          <ThreeScene />

          {/* Content: Clicky boxes */}
          <div className="container clicky-wrap">
            {/* {images.map((pic) => (<BearCard
              image={pic}
              handleClickImage={this.handleClickImage}
              key={pic}
            />))} */}

            {this.state.imageUrl2 ? (
              <img src={this.state.imageUrl2} alt={this.state.imageUrl2} />
            ) : (
              <img src="sample_images/bg_header.png" alt="sample" />
            )}

            <br />
            <br />

            <div class="aboutMe">
              <div
                className="abt"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <i class="fas fa-user" />
                <div class="card">
                  <div class="card-body">
                    {this.state.about_title ?  <h3 class="card-title">{this.state.about_title}</h3>: <h3 class="card-title">About Me</h3>}
                    {this.state.about_textarea ? <p class="card-text">
                      {" "}
                      {this.state.about_textarea}
                    </p>: <p class="card-text">
                      {" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>}

                  </div>
                </div>
              </div>
            </div>


            
          </div>

          {/* Footer - force bottom */}
          <footer className="container-fluid bg-danger text-white p-3">
            <div className="container">
              <p>Copyright 2018 React Clickling Game</p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Display;

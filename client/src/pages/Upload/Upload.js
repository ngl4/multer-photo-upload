import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Upload.css";
import Nav from "../../components/Nav";
import ColoredLine from "../../components/ColoredLine";
// import API from "../../utils/API";
// import BearCard from "../../components/BearCard";
// const BASE_URL = "http://localhost:3000/";

class Upload extends Component {
  state = {
    score: 0,
    topScore: 0,
    array: [],
    guessedCorrect: true,
    images: [],
    imageUrls: [],
    imageUrl: "",
    imageUrl1: "",
    imageUrl2: "",
    message: "",
    errMessage: "",
    errMessage2: "",
    uploadMessage: "",
    uploadMessage2: "",
    about_title: "",
    about_title_id: "",
    about_textarea: "",
    about_textarea_id: "",
    portfolio_title: "",
    portfolio_title_id: "",
    portfolio_textarea: "",
    portfolio_textarea_id: "",
    isAboutSubmit: false,
    isPortfolioSubmit: false,

  };

  componentDidMount() {
    axios
      .get("/api/displayText")
      .then(res => {
        console.log(res);
        //adding this component variable, we can then access the "this" keyword/object 
        var component = this;
        if (res) { //TODO: seperate the about and portfolio section
          res.data.forEach(function(elem, i){
            if (elem.section === "about_title"){
              console.log(elem);
              console.log(component);
              component.setState({
                about_title_id: elem._id,
                about_title: elem.content,
                 isAboutSubmit: true
              });
            }
            if (elem.section === "about_textarea"){
              console.log(elem);
              component.setState({
                about_textarea_id: elem._id,
                about_textarea: elem.content,
                 isAboutSubmit: true
              });
            }
            if (elem.section === "portfolio_title"){
              console.log(elem);
              console.log(component);
              component.setState({
                portfolio_title_id: elem._id,
                portfolio_title: elem.content,
                 isPortfolioSubmit: true
              });
            }
            if (elem.section === "portfolio_textarea"){
              console.log(elem);
              component.setState({
                portfolio_textarea_id: elem._id,
                portfolio_textarea: elem.content,
                 isPortfolioSubmit: true
              });
            }
          });

        } else {
          this.setState({
            isAboutSubmit: false,
            isPortfolioSubmit: false
          });
        }
      })
      .catch(err => console.log(err));

    axios.get("/api/section/1").then(response => {
      if (response.data.length === 0) {
        this.setState({
          imageUrl1: ""
        });
      } else {
        this.setState({
          imageUrl1: "uploads/" + response.data[0].image_filename
        });
      }
    });

    axios.get("/api/testgetimages").then(response => {
      //console.log(response);
      if (response.data.length === 0) {
        this.setState({
          imageUrl2: ""
        });
      } else {
        this.setState({
          imageUrl2:
            "https://s3.amazonaws.com/cindytestbucket123/" +
            response.data[0].name
        });
      }
    });
  }

  selectImages = event => {
    let images = [];
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/));
    let message = `${images.length} valid image(s) selected`;
    // console.log(images);
    // console.log(message);

    this.setState({
      images: images,
      message: message
    });
  };

  //Image Upload #1: multer npm upload
  // uploadImages = event => {
  //   event.preventDefault();
  //   // console.log(this.state.images);
  //   // console.log(this.state.message);

  //   const uploaders = this.state.images.map(image => {
  //     const data = new FormData();
  //     data.append("myImage", image, image.name);
  //     console.log(image);

  //     // Make an AJAX upload request using Axios
  //     return axios
  //       .post("/api/upload", data)
  //       .then(response => {
  //         console.log(response);

  //         if (response.data.name === "MulterError") {
  //           this.setState({
  //             errMessage: response.data.message
  //           });
  //         } else {
  //           axios({
  //             method: "get",
  //             url: "/api/section/1"
  //           }).then(res => {
  //             console.log("RESEPONSE", res);

  //             if (res.data.length !== 0) {
  //               this.setState({
  //                 uploadMessage: "",
  //                 errMessage:
  //                   "Your previous uploaded image is saved; if you want to upload a new image, please delete the saved image."
  //               });
  //             } else {
  //               axios({
  //                 method: "post",
  //                 url: "/api/section",
  //                 params: {
  //                   section: "section_1",
  //                   image_id: response.data._id,
  //                   image_filename: response.data.filename
  //                 }
  //               })
  //                 .then(res => console.log(res))
  //                 .catch(err => console.log(err));
  //               this.setState({
  //                 // imageUrls: [response.data.path, ...this.state.imageUrls],
  //                 uploadMessage: "File(s) Uploaded!",
  //                 // imageUrl: "uploads/" + response.data.filename,
  //                 errMessage: ""
  //               });
  //             }
  //           });
  //         }
  //       })
  //       .catch(err => console.log(err));
  //   });

  //   // Once all the files are uploaded
  //   axios
  //     .all(uploaders)
  //     .then(() => {
  //       console.log("done");
  //     })
  //     .catch(err => alert(err.message + " and each upload file limit is 2mb"));
  // };

  // savetoPage = event => {
  //   event.preventDefault();

  //   axios.get("/api/section/1").then(response => {
  //     if (response.data.length === 0) {
  //       this.setState({
  //         imageUrl1: ""
  //       });
  //     } else {
  //       this.setState({
  //         imageUrl1: "uploads/" + response.data[0].image_filename
  //       });
  //     }
  //   });
  // };

  // deleteImage = event => {
  //   event.preventDefault();

  //   axios.delete("/api/section/1").then(response => {
  //     console.log(response);
  //     window.location.reload();
  //   });
  // };

  //Image Upload #1: multer npm upload method
  // uploadImage2 = event => {
  //   event.preventDefault();
  //   console.log(this.state.images);
  //   console.log(this.state.message);
  //   const uploaders = this.state.images.map(image => {
  //     const data = new FormData();
  //     data.append("myImage", image, image.name);
  //     console.log(data);

  //     // Make an AJAX upload request using Axios
  //     return axios
  //       .post(BASE_URL + "api/upload", data)
  //       .then(response => {
  //         console.log(response);
  //         if (response.data.name === "MulterError") {
  //           this.setState({
  //             errMessage2: response.data.message
  //           });
  //         } else {
  //           this.setState({
  //             // imageUrls: [response.data.path, ...this.state.imageUrls],
  //             uploadMessage2: "File(s) Uploaded!",
  //             imageUrl2: "uploads/" + response.data.filename,
  //             errMessage2: ""
  //           });
  //         }
  //       })
  //       .catch(err => console.log(err));
  //   });
  //   // Once all the files are uploaded
  //   axios
  //     .all(uploaders)
  //     .then(() => {
  //       console.log("done");
  //     })
  //     .catch(err => alert(err.message + " and each upload file limit is 2mb"));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //Image Upload #2: Amazon Upload
  uploadImage2Amazon = event => {
    event.preventDefault();
    const uploaders = this.state.images.map(image => {
      const data = new FormData();
      data.append("myImage", image, image.name);
      console.log(image);

      // Make an AJAX upload request using Axios
      return axios
        .post("/api/testupload", data)
        .then(response => {
          console.log(response);
          this.setState({
            imageUrl2: response.data
          });
        })
        .catch(err => console.log(err));
    });

    // Once all the files are uploaded
    axios
      .all(uploaders)
      .then(() => {
        console.log("done");
      })
      .catch(err => alert(err.message + " and each upload file limit is 2mb"));
  };

  //TextInput: About Section (Submit - Post Request)
  handleFormSubmit = event => {
    event.preventDefault();
    console.log("this is clicked!");
    console.log(this.state.about_title);
    console.log(this.state.about_textarea);
    console.log(this.state.portfolio_title);
    console.log(this.state.portfolio_textarea);

    const type = event.target.dataset.section;

    if (this.state.about_title) {

      axios({
        method: "post",
        url: "/api/saveText/" + type,
        params: {
          section: "about_title",
          content: this.state.about_title
        }
      })
        .then(res => {
          console.log(res);

        })
        .catch(err => console.log(err));

    }
    if (this.state.about_textarea) {
      axios({
        method: "post",
        url: "/api/saveText/" + type,
        params: {
          section: "about_textarea",
          content: this.state.about_textarea
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }
    if (this.state.portfolio_title) {  //you can do portfolioSS1, portofolioSS2 --> stands for each Small Section 1, 2 ...

      axios({
        method: "post",
        url: "/api/saveText/" + type,
        params: {
          section: "portfolio_title",
          content: this.state.portfolio_title
        }
      })
        .then(res => {
          console.log(res);

        })
        .catch(err => console.log(err));

    }
    if (this.state.portfolio_textarea) {
      axios({
        method: "post",
        url: "/api/saveText/" + type,
        params: {
          section: "portfolio_textarea",
          content: this.state.portfolio_textarea
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }

    this.setState({
      isAboutSubmit: true,
      isPortfolioSubmit: true
    });
  };

  //TextInput: About Section (Edit - Put Request)
  handleFormEdit = event => {
    event.preventDefault();
    var type = event.target.dataset.section

    if (this.state.about_title) {
      axios({
        method: "put",
        url: "/api/updateText/" + type,
        params: {
          _id: this.state.about_title_id,
          section: type + "_title",
          content: this.state.about_title
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }
    if (this.state.about_textarea) {
      axios({
        method: "put",
        url: "/api/updateText/" + type,
        params: {
          _id: this.state.about_textarea_id,
          section: type + "_textarea",
          content: this.state.about_textarea
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }
    if (this.state.portfolio_title) {
      axios({
        method: "put",
        url: "/api/updateText/" + type,
        params: {
          _id: this.state.portfolio_title_id,
          section: type + "_title",
          content: this.state.portfolio_title
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }
    if (this.state.portfolio_textarea) {
      axios({
        method: "put",
        url: "/api/updateText/" + type,
        params: {
          _id: this.state.portfolio_textarea_id,
          section: type + "_textarea",
          content: this.state.portfolio_textarea
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }

  };


  handleFormDelete = event => {
    const type = event.target.dataset.section;
    // debugger;
    event.preventDefault();
    // console.log(event);
    axios.delete("/api/deleteText/" + type).then(response => {
      console.log(response);
      window.location.reload();
    });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          {/* Sticky Header: Name(link), state, Score and Top Score */}
          <header className="bg-danger p-4 fixed-top">
            <div className="container d-flex justify-content-between text-white font-weight-bold">
              <Nav />
              <div className="header-title">Clickling Game</div>
              {/* <div className="header-midtitle"></div> */}
              <div className="header-scoretitle">
                Score: {this.state.score} | Top Score: {this.state.topScore}{" "}
              </div>
            </div>
          </header>

          {/* Heading */}
          <div className="jumbotron jumbotron-fluid mt-5 heading-background text-white">
            <div className="container mt-5 mb-5 text-center">
              <h1 className="display-4">
                <strong>Upload Contents Here </strong>
              </h1>
              <p className="lead" />
            </div>
          </div>

          {/* Content: Clicky boxes- upload images */}
          <div className="container">
            <h4>Section#1: Image</h4>
            {this.state.errMessage ? (
              <p className="text-danger ml-3">{this.state.errMessage}</p>
            ) : (
              ""
            )}
            {this.state.uploadMessage ? (
              <p className="text-success ml-3">{this.state.uploadMessage}</p>
            ) : (
              ""
            )}

            <div className="wrapper">
              {/* <p>{typeof msg !== undefined ? msg : ""}</p> */}
              <div className="row col-lg-12">
                <div className="col-md-4">
                  <form>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        name="myImage"
                        onChange={this.selectImages}
                        multiple
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose file
                      </label>
                    </div>
                    <button
                      className="btn btn-danger mt-3"
                      type="submit"
                      onClick={this.uploadImages}
                    >
                      Upload
                    </button>
                    <button
                      className="btn btn-success ml-5 mt-3"
                      onClick={this.savetoPage}
                    >
                      Save to Page
                    </button>
                  </form>
                </div>

                <div className="col-md-2 text-center">
                  <div className="vl mr-4" />
                  <div className="vl mr-4" />
                </div>

                <div className="col-md-4">
                  {this.state.imageUrl1 ? (
                    <div>
                      <img
                        src={this.state.imageUrl1}
                        className="img-rounded img-responsive"
                        alt="not available"
                      />
                      <button type="delete" onClick={this.deleteImage}>
                        Delete
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* <div className="row col-lg-12 mt-5"> */}
              {/* {this.state.imageUrls.map((url, i) => (
              <div className="col-lg-2" key={i}>
                <img
                  src={BASE_URL + "/" + url}
                  className="img-rounded img-responsive"
                  alt="not available"
                />
                <br />
              </div>
                     ))} */}
              {/* {this.state.imageUrl ? (
                <img
                  src={this.state.imageUrl}
                  className="img-rounded img-responsive"
                  alt="not available"
                />
              ) : (
                ""
              )} */}
              {/* </div> */}

              <ColoredLine color="lightpink" />

              <div className="mt-5">
                <h4>Section#2: Image</h4>

                {this.state.errMessage2 ? (
                  <p className="text-danger">{this.state.errMessage2}</p>
                ) : (
                  ""
                )}
                {this.state.uploadMessage2 ? (
                  <p className="text-success">{this.state.uploadMessage2}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="row col-lg-12">
                <form>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      name="myImage"
                      onChange={this.selectImages}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose file
                    </label>
                  </div>
                  <button
                    className="btn btn-danger mt-3"
                    type="submit"
                    onClick={this.uploadImage2Amazon}
                  >
                    Upload
                  </button>
                  <button
                    className="btn btn-success ml-5 mt-3"
                    onClick={this.receiveImage5Amazon}
                  >
                    Save to Page
                  </button>
                </form>
              </div>

              <div className="row col-lg-12 mt-5">
                {this.state.imageUrl2 ? (
                  <img
                    src={this.state.imageUrl2}
                    className="img-rounded img-responsive"
                    alt="not available"
                  />
                ) : (
                  ""
                )}
                <Link to="/display">
                  <button className="btn btn-success">See Preview Page</button>
                </Link>
              </div>

              <div className="row col-lg-12 mt-5" />
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title">About</h3>
                  <hr />
                  <p class="card-text">
                    <form>
                      <div class="form-group">
                        <label for="aboutFormControlInput1">About: Title</label>
                        <div class="d-flex justify-content">
                          <input
                            name="about_title"
                            value={this.state.about_title}
                            onChange={this.handleInputChange}
                            class="form-control w-75"
                            id="aboutFormControlInput1"
                            placeholder="About me"
                          />
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="aboutFormControlTextarea1">
                          About: Textarea
                        </label>
                        <div class="d-flex justify-content">
                          <textarea
                            name="about_textarea"
                            class="form-control w-75"
                            id="aboutFormControlTextarea1"
                            value={this.state.about_textarea}
                            onChange={this.handleInputChange}
                            rows="5"
                          />
                        </div>
                        {this.state.isAboutSubmit ? (
                          <button
                            type="button"
                            data-section="about"
                            class="btn btn-primary btn-sm mr-2 ml-2 h-25 mt-5"
                            disabled={
                              !(
                                this.state.about_title &&
                                this.state.about_textarea
                              )
                            }
                            onClick={this.handleFormEdit}
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            type="button"
                            data-section="about"
                            class="btn btn-primary btn-sm mr-2 ml-2 h-25 mt-5"
                            disabled={
                              !(
                                this.state.about_title &&
                                this.state.about_textarea
                              )
                            }
                            onClick={this.handleFormSubmit}
                          >
                            Submit
                          </button>
                        )}

                        <button
                          type="button"
                          class="btn btn-secondary btn-sm h-25 mt-5"
                          data-section="about"
                          onClick={this.handleFormDelete}
                        >
                          Delete All
                        </button>
                      </div>
                    </form>
                  </p>
                </div>
              </div>

              <div className="row col-lg-12 mt-5" />
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title">Portfolio</h3>
                  <hr />
                  <p class="card-text">
                    <form>
                      <div class="form-group">
                        <label for="portfolioFormControlInput1">Portfolio: Title</label>
                        <div class="d-flex justify-content">
                          <input
                            name="portfolio_title"
                            value={this.state.portfolio_title}
                            onChange={this.handleInputChange}
                            class="form-control w-75"
                            id="portfolioFormControlInput1"
                            placeholder="portfolio name"
                          />
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="portfolioFormControlTextarea1">
                          Portfolio: Textarea
                        </label>
                        <div class="d-flex justify-content">
                          <textarea
                            name="portfolio_textarea"
                            class="form-control w-75"
                            id="portfolioFormControlTextarea1"
                            value={this.state.portfolio_textarea}
                            onChange={this.handleInputChange}
                            rows="5"
                          />
                        </div>
                        {this.state.isPortfolioSubmit ? (
                          <button
                            type="button"
                            class="btn btn-primary btn-sm mr-2 ml-2 h-25 mt-5"
                            data-section="portfolio"
                            disabled={
                              !(
                                this.state.portfolio_title &&
                                this.state.portfolio_textarea
                              )
                            }
                            onClick={this.handleFormEdit}
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-primary btn-sm mr-2 ml-2 h-25 mt-5"
                            data-section="portfolio"
                            disabled={
                              !(
                                this.state.portfolio_title &&
                                this.state.portfolio_textarea
                              )
                            }
                            onClick={this.handleFormSubmit}
                          >
                            Submit
                          </button>
                        )}

                        <button
                          type="button"
                          class="btn btn-secondary btn-sm h-25 mt-5"
                          data-section="portfolio"
                          onClick={this.handleFormDelete}
                        >
                          Delete All
                        </button>
                      </div>
                    </form>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - force bottom */}
          <footer className="container-fluid bg-danger text-white p-3 mt-5">
            <div className="container">
              <p>Copyright 2018 React Clickling Game</p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Upload;

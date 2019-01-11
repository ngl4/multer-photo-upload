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
    uploadMessage2: ""
  };

  componentDidMount() {

    axios.get("/api/section/1")
    .then(response => {

      if (response.data.length === 0) {
        this.setState({
          imageUrl1: ""
        })

      } else {
        this.setState({
          imageUrl1: "uploads/" + response.data[0].image_filename
        })
      }
    });

    axios.get("/api/testgetimages")
    .then(response => {
      //console.log(response);
      if (response.data.length === 0) {
        this.setState({
          imageUrl2: ""
        })

      } else {
        this.setState({
          imageUrl2: "https://s3.amazonaws.com/cindytestbucket123/" + response.data[0].name
        })
      }
    })
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

  savetoPage = event => {
    event.preventDefault();

    axios.get("/api/section/1")
    .then(response => {

      if (response.data.length === 0) {
        this.setState({
          imageUrl1: ""
        })

      } else {
        this.setState({
          imageUrl1: "uploads/" + response.data[0].image_filename
        })
      }
    });
  }

  deleteImage = event => {
    event.preventDefault();

    axios.delete("/api/section/1")
    .then(response => {
      console.log(response);
      window.location.reload();
    });

  }

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
          })
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
  }

  // receiveImage5Amazon = event => {
  //   event.preventDefault();

   
  // }


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
                    <button className="btn btn-success ml-5 mt-3" onClick={this.savetoPage}>
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
                    <button type="delete" onClick={this.deleteImage}>Delete</button>
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
                  <button className="btn btn-success ml-5 mt-3" onClick={this.receiveImage5Amazon}>
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

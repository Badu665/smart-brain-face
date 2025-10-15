import "./App.css";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageLinkForm from "./components/ImageLinkForm";
import Rank from "./components/Rank";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import FaceRecognition from "./components/FaceRecognition";
import Signin from "./components/Signin";
import Register from "./components/Register";
import React from "react";
/* Some Comments */
const Appbak = () => {
  const [init, setInit] = useState(false);
  const [input, setInput] = useState("");
  const [imageurl, setImageurl] = useState("#");
  const [box, setBoxDimensions] = useState("{}");
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});
  const [entries, setEntries] = useState(0);
  const [userid, setUserId] = useState(0);
  var sentSubmission = false;

  useEffect(() => {
    // This code runs once after the initial render, like componentDidMount
    console.log("Component mounted!");

    // Example: Fetching data from an API
    fetch("https://smartbrainapi-194f32d9fc02.herokuapp.com/")
      .then((response) => response.json())
      .then(console.log)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Optional: Return a cleanup function for componentWillUnmount equivalent
    return () => {
      console.log("Component unmounted (cleanup)");
    };
  }, []); // The empty dependency array ensures this effect runs only once

  const onInputChange = (event) => {
    setInput(event.target.value);
    setImageurl(event.target.value);
    setBoxDimensions({});
  };

  const loadUser = (data) => {
    if (data.status != "entriesUpdate") {
      setImageurl("");
    }
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
    });
  };

  const calculateFaceLocation = (topRow, leftCol, bottomRow, rightCol) => {
    const image = document.getElementById("inputimage");
    /* let calcLeft = 0; */
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      calcLeft: leftCol * width,
      calcTopRow: topRow * height,
      calcBottomRow: height - bottomRow * height,
      calcRightCol: width - rightCol * width,
    };
  };

  const displayFaceBox = (box) => {
    setBoxDimensions(box);
  };

  const onRouteChange = (role) => {
    setRoute(role);
    if (role === "home") {
      setIsSignedIn(true);
      setEntries(user.entries);
      setUserId(user.id);
    } else {
      setIsSignedIn(false);
    }
  };

  async function updateEntries(user, entries, imageurl) {
    console.log("im in update entries");

    await fetch("https://smartbrainapi-194f32d9fc02.herokuapp.com/image", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        entries: entries,
        url: imageurl,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const regions = response.outputs[0].data.regions;

        regions.forEach((region) => {
          // Accessing and rounding the bounding box values
          const boundingBox = region.region_info.bounding_box;
          const topRow = boundingBox.top_row.toFixed(3);
          const leftCol = boundingBox.left_col.toFixed(3);
          const bottomRow = boundingBox.bottom_row.toFixed(3);
          const rightCol = boundingBox.right_col.toFixed(3);

          region.data.concepts.forEach((concept) => {
            // Accessing and rounding the concept value
            const name = concept.name;
            const value = concept.value.toFixed(4);
         /*    console.log(
              `${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`
            ); */
            displayFaceBox(
              calculateFaceLocation(topRow, leftCol, bottomRow, rightCol)
            );
          });
        });
        /*     .catch((error) => console.log("error", error)); */

        /* Capture the response to send clarif ai  - update the code below */
        if (response === "You have been registered") {
          const registeredUser = {
            name: this.state.name,
            entries: 0,
          };
          /*         this.props.loadUser(registeredUser);
          this.props.onRouteChange("home"); */
        }
     /*    console.log("I am about to return response to On submit"); */
        return response;
      });
  }

  const setRegisteredUser = (user, status) => {
    console.log("I am here");
    console.log(user);
    /*  console.log(status);

    if (status === "entriesUpdate") {
      var lclEntries = user.entries +1;
    } // Else clause to follow
 */
    const registeredUser = {
      id: 0,
      name: user.name,
      entries: user.entries + 1,
      email: user.email,
      status: status,
    };

    return registeredUser;
  };

  const onSubmit = (e, user, imageurl) => {
/*     console.log("Im in Submit");
 */
    loadUser(setRegisteredUser(user, "entriesUpdate"));
    updateEntries(user, user.entries + 1, imageurl);

    /* End of on submit */
  };

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log("");
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "white",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <div className="App">
        <Particles
          className="particles"
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />

        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
        {/*     {route='register' ? <Register /> : <div></div>} */}
        {route === "home" ? (
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={(e) => onSubmit(e, user, imageurl)}
            />
            <FaceRecognition box={box} imageurl={imageurl} />
          </div>
        ) : route === "register" ? (
          <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        ) : (
          <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
        )}
      </div>
    );
  }
};

export default Appbak;

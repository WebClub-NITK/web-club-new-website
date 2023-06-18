import React from "react";
import Helmet from "react-helmet";
import Loader from "react-loader-spinner";
// import axios from "axios";
import mixitup from "mixitup";
import Navbar from "./navbar.js"; 
import MemberCard from "./memberCard.js";
import Nav from "../Nav/Nav";
import SpreadSheetApi from "../../_services/spreadSheetApi";
import defaultPic from "../../assets/images/default.jpg";
import "../../styles/member.css";
import {
  membersWorkSheetId,
  // profileImagesRepositoryURL,
} from "./../../environment";

const lazyLoad = target => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        const img = entry.target.getElementsByTagName('img')[0];
        const src = img.getAttribute('data-lazy');

        img.setAttribute('src', src);

        observer.disconnect();
      }
    });
  });

  io.observe(target)
};

class Members extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      membersData: [],
      visible: true,
    };
    this.getData();
  }

  async getData() {
    var finalArray = await SpreadSheetApi.getWorkSheetData(membersWorkSheetId);
    let extensions = ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"];

    finalArray.forEach((val) => {
      let imageFound = false;
      const trimmedId = val.id.trim(); // Remove leading/trailing whitespace
      for (let extension of extensions) {
        try {
          val.imageURL = require(`../../assets/images/profile-pics/${trimmedId}.${extension}`);
          // console.log(`Image found for ${val.Name}`);
          imageFound = true;
          break;
        } catch (err) {
          // console.log(`No image found for ${val.Name}`);
        }
      }
      if (!imageFound) {
        val.imageURL = defaultPic;
      }
    });
  


    // use the below code to load images from another github repository

    // finalArray.forEach(async (val) => {
    //   let img;

    //   for (let extension of extensions) {
    //     try {
    //       img = `${profileImagesRepositoryURL}${val.id}.${extension}`;
    //       // eslint-disable-next-line
    //       // let response = await axios.get(img);
    //       if(imageExists(img)) {
    //         break;
    //       }
    //     } catch (err) {
    //       img = defaultPic;
    //     }
    //   }

    //   val.imageURL = img;
    //   this.setState({ membersData: finalArray });
    // });


    this.setState({ membersData: finalArray });
    this.setState({ visible: false });
    const targets = document.querySelectorAll('.image');
    targets.forEach(lazyLoad);
    var containerEl = document.querySelector(".memberContainer");
    // eslint-disable-next-line
    var mixer = mixitup(containerEl);
  mixer.filter('.Current')
    .then(function(state) {
        console.log(state.activeFilter.selector); // to filter the current members after loading
    });
  }

  render() {
    let content;
    if (this.state.visible) {
      content = (
        <div className="loader">
          <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
        </div>
      );
    } else
      content = (
        <div className="MemberDetails">
          <div className="controls">
            <Navbar />
          </div>
          <div className="memberContainer">
           {this.state.membersData.map((value) => {
           // if the role includes the term Alumni then render the card in Alumni section
           if (value.Position.includes("alumni")) {
    return (
      <MemberCard
        className={"Alumni"}
        Name={value.Name}
        Position={value.Position.replace(" alumni", ", Class of " + value.batch)}
        Email={value.Email}
        githuburl={value.githuburl}
        linkedinurl={value.linkedinurl}
        imageURL={value.imageURL}
        key={value.Name}
      />
    );
  } else if (value.Position !== "Club Member") {
    return (
      <MemberCard
        className={value.sig + " Core Current"}
        Name={value.Name}
        Position={value.Position}
        Email={value.Email}
        githuburl={value.githuburl}
        linkedinurl={value.linkedinurl}
        imageURL={value.imageURL}
        key={value.Name}
      />
    );
  } else {
    return (
      <MemberCard
        className={value.sig + " Current"}
        Name={value.Name}
        Position={value.Position}
        Email={value.Email}
        githuburl={value.githuburl}
        linkedinurl={value.linkedinurl}
        imageURL={value.imageURL}
        key={value.Name}
      />
    );
  }
})}
          </div>
        </div>
      );
    return (
      <>
        <Helmet>
          <title>Team - Web Club NITK</title>
        </Helmet>
        <Nav sticky="true" transp="false" />
        {content}
      </>
    );
  }
}

export default Members;
  

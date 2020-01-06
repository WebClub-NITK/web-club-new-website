import React from 'react';
import '../../styles/Review.css';

class Review extends React.Component{
  render(){
    return(
      <div id="REVIEW">
      <div className="he_ad">Reviews</div>
      <div className="block">
        <div className="container" >
        <div id="myCarousel" className="carousel slide" data-ride="carousel">

                <ol className="carousel-indicators">
                  <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <li data-target="#myCarousel" data-slide-to="2"></li>
                  <li data-target="#myCarousel" data-slide-to="3"></li>
                  <li data-target="#myCarousel" data-slide-to="4"></li>
                </ol>

          <div className="carousel-inner">
            <div className="item active">
              <img src="https://cdn.glitch.com/1a9215a8-43a8-46e7-9fad-bb891e9b4809%2Fcotation.png?1576917601849.png" className="center" /><br/><br/>
              <div className="review">
              "Having people believe in me motivated me to keep developing my skills in programming
              and statistics, despite all the error messages. Now it's my turn to do the believing -
              I believe in Coding Club and all its members, and
              I know that together we can learn to code and use the right type of statistics!"<br/><br/>
              <div className="rimage">
                <img src="https://cdn.glitch.com/1a9215a8-43a8-46e7-9fad-bb891e9b4809%2Fblank.jpg?1576917199191.png" />
                  <div className="rintro">
                    Member Name
                  </div>
                  <div className="desig">
                    Member
                  </div>
              </div>
              </div>
            </div>

            <div className="item">
              <img src="https://cdn.glitch.com/1a9215a8-43a8-46e7-9fad-bb891e9b4809%2Fcotation.png?1576917601849.png" className="center" /><br/><br/>
              <div className="review">
              "Having people believe in me motivated me to keep developing my skills in programming
              and statistics, despite all the error messages. Now it's my turn to do the believing -
              <br/><br/>
              <div className="rimage">
                <img src="https://cdn.glitch.com/1a9215a8-43a8-46e7-9fad-bb891e9b4809%2Fblank.jpg?1576917199191.png" />
                  <div className="rintro">
                    Member Name
                  </div>
                  <div className="desig">
                    Member
                  </div>
              </div>
              </div>
            </div>
            <div className="item">
              <img src="https://cdn.glitch.com/1a9215a8-43a8-46e7-9fad-bb891e9b4809%2Fcotation.png?1576917601849.png" className="center" /><br/><br/>
              <div className="review">
              "Having people believe in me motivated me to keep developing my skills in programming
              and statistics, despite all the error messages. Now it's my turn to do the believing -
              I believe in Coding Club and all its members, and
              I know that together we can learn to code and use the right type of statistics!"<br/><br/>
              <div className="rimage">
                <img src="https://cdn.glitch.com/1a9215a8-43a8-46e7-9fad-bb891e9b4809%2Fblank.jpg?1576917199191.png" />
                  <div className="rintro">
                    Member Name
                  </div>
                  <div className="desig">
                    Member
                  </div>
              </div>
              </div>
            </div>
            <div className="item">
              <img src="https://cdn.glitch.com/1a9215a8-43a8-46e7-9fad-bb891e9b4809%2Fcotation.png?1576917601849.png.png" className="center" /><br/><br/>
              <div className="review">
              "Having people believe in me motivated me to keep developing my skills in programming
              and statistics, despite all the error messages. Now it's my turn to do the believing -
              <br/><br/>
              <div className="rimage">
                <img src="https://cdn.glitch.com/1a9215a8-43a8-46e7-9fad-bb891e9b4809%2Fblank.jpg?1576917199191.png" />
                  <div className="rintro">
                    Member Name
                  </div>
                  <div className="desig">
                    Member
                  </div>
              </div>
              </div>
            </div>
            <div className="item">
              <img src="https://cdn.glitch.com/1a9215a8-43a8-46e7-9fad-bb891e9b4809%2Fcotation.png?1576917601849.png.png" className="center" /><br/><br/>
              <div className="review">
              "Having people believe in me motivated me to keep developing my skills in programming
              and statistics, despite all the error messages. Now it's my turn to do the believing -
              I believe in Coding Club and all its members, and
              I know that together we can learn to code and use the right type of statistics!"<br/><br/>
              <div className="rimage">
                <img src="https://cdn.glitch.com/1a9215a8-43a8-46e7-9fad-bb891e9b4809%2Fblank.jpg?1576917199191.png" />
                  <div className="rintro">
                    Member Name
                  </div>
                  <div className="desig">
                    Member
                  </div>
              </div>
              </div>
            </div>
          </div><br/><br/>


          <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="#"></span>
            <span className="sr-only"></span>
          </a>
          <a className="right carousel-control" href="#myCarousel" data-slide="next">
            <span className="#"></span>
            <span className="sr-only"></span>
          </a>
          </div>
        </div>

      </div>
      </div>
    )
  }
}

export default Review;

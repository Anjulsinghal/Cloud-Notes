import { Link, useLocation, useNavigate } from "react-router-dom";

const About = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("land", "anjul");
    navigate("/landingpage");
    props.showAlert("Logout Successful", "success");
  };
  let location = useLocation();
  const handleClick = () => {
    localStorage.removeItem("land");
  };
  const myStyle = {
    color: localStorage.getItem("land") ? "black" : "white",
  };
  return (
    <div>
      <div className="header-about">
        <h1>About-Us</h1>
        <div className="logbtn">
          {!localStorage.getItem("token") ? (
            <form className="d-flex" role="search">
              <Link
                className="btn btn-primary mx-2"
                onClick={handleClick}
                to="/login"
                role="button"
              >
                Login
              </Link>
              <Link
                className="btn btn-outline-primary "
                to="/signup"
                onClick={handleClick}
                role="button"
              >
                Sign-Up
              </Link>
            </form>
          ) : (
            <button
                onClick={handleLogout}
                className="btn btn-outline-primary "
              >
                Logout
              </button>
          )}
        </div>
      </div>
      <div className="about-main">
        <div className="about-content">
          <h2>We Provides the Cloud based CRUD Application for your Notes</h2>
          <p>
            Cloud-Notes is an innovative and efficient web application designed
            to revolutionize the way users organize and access their notes.
            Embracing the power of cloud technology.
          </p>
          <div className="about-list">
            <ul>
              <li>CRUD Operations</li>
              <li>Enhance Note Organization</li>
              <li>Ensure Data Security</li>
            </ul>
            <ul>
              <li>User-Friendly Interface</li>
              <li>Improve Productivity</li>
              <li>End to End Encryption</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="team">
        <h2>Our Team</h2>
        <div className="team-mem">
          <div className="team-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <h3>Anjul Singhal</h3>
          </div>
          <div className="team-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <h3>Ankit Singh</h3>
          </div>
          <div className="team-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <h3>Anshul Yadav</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

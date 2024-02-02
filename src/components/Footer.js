/* eslint-disable react/jsx-no-target-blank */
import linkedin_icon from '../img/linkedin_icon.svg';
import github_icon from '../img/github_icon.svg';

const Footer = () => {
  return(
    <div id="footer" style={{ backgroundColor: '#8359ee' }}>
      <p>Built by Kirk Meyer, 2024. Find me on:</p>
      <div>
          <a href="https://github.com/Kirkenstocks" target="_blank">
            <img src={github_icon} alt="Github logo" className="footer-icons"/>
          </a>
          <a href="https://www.linkedin.com/in/kirk-meyer-19622a103/" target="_blank">
            <img src={linkedin_icon} alt="LinkedIn logo" className="footer-icons" />
          </a>
      </div>
    </div>
  );
};

export default Footer;
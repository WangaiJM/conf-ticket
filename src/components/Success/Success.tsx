import Logo from "../../assets/images/logo-full.svg";
import Avatar from "../../assets/images/image-avatar.jpg";
import Github from "../../assets/images/icon-github.svg";

import "./success.scss";

const Success = () => {
  return (
    <section className="success">
      <div className="success-user">
        <div className="success-user__head">
          <img src={Logo} alt="" />
          <p>
            <span className="date">Jan 31, 2025</span> /{" "}
            <span className="location">Austin, TX</span>
          </p>
        </div>
        <div className="success-user__body">
          <img src={Avatar} alt="" />
          <div className="user">
            <h3>Jonathan Kristoff</h3>
            <div>
              <img src={Github} alt="" />
              <p>@jonatankristof0101</p>
            </div>
          </div>
        </div>
      </div>
      <div className="success-id">
        <h2>#01609</h2>
      </div>
    </section>
  );
};
export default Success;

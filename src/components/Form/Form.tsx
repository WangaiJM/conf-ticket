import Info from "../../assets/images/icon-info.svg";

import "./form.scss";
const Form = () => {
  return (
    <form>
      <div className="form-control">
        <label htmlFor="avatar">Upload Avatar</label>
        <input type="file" name="avatar" id="avatar" />
        <span>
          <img src={Info} alt="" />
          Upload your photo (JPG or PNG, max size: 500KB).
        </span>
      </div>
      <div className="form-control">
        <label htmlFor="full-name">Full Name</label>
        <input type="text" name="full-name" id="full-name" />
        <span></span>
      </div>
      <div className="form-control">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email@example.com"
        />
        <span></span>
      </div>
      <div className="form-control">
        <label htmlFor="username">GitHub Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="@yourusername"
        />
        <span></span>
      </div>
      <div className="form-control">
        <button className="btn">Generate My Ticket</button>
      </div>
    </form>
  );
};
export default Form;

import Logo from "../../assets/images/logo-full.svg";
import Github from "../../assets/images/icon-github.svg";

import "./success.scss";
import { UserContext } from "../../context/UserContext/UserContext";
import { useContext, useEffect, useState } from "react";

const Success = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("provide context");
  const { getUser, users } = context;

  const user = users.length ? getUser() : null;

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    if (user.avatar instanceof File) {
      const url = URL.createObjectURL(user.avatar);
      setAvatarUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setAvatarUrl(null);
  }, [user]);

  if (!user) {
    return (
      <section className="success">
        <div className="success-user">
          <div className="success-user__head">
            <img src={Logo} alt="logo" />
            <p>
              <span className="date">Jan 31, 2025</span> /{" "}
              <span className="location">Austin, TX</span>
            </p>
          </div>
          <div className="success-user__body">
            <div className="user">
              <h3>No user yet</h3>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="success" aria-label="Ticket confirmation">
      <div className="success-user">
        <div className="success-user__head">
          <img src={Logo} alt="Coding Conf logo" />
          <p>
            <span className="date">Jan 31, 2025</span> /{" "}
            <span className="location">Austin, TX</span>
          </p>
        </div>
        <div className="success-user__body">
          <img src={avatarUrl ?? ""} alt={`${user.fullName} avatar`} />
          <div className="user">
            <h3>{user.fullName}</h3>
            <div>
              <img src={Github} alt="GitHub icon" />
              <p>{user.userName}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="success-id" role="status" aria-live="polite">
        <h2>#{user.id}</h2>
      </div>
    </section>
  );
};
export default Success;

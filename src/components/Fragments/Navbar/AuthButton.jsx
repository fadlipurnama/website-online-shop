import { useNavigate } from "react-router-dom";
import Button from "../../Elements/Buttons";

const AuthButton = ({ className }) => {
  const navigate = useNavigate();
  return (
    <div className={className}>
      <Button
        onClick={() => {
          navigate("/login");
        }}
        className="px-6 py-5"
        variant="btn-1"
      >
        MASUK
      </Button>
      <Button
        onClick={() => {
          navigate("/register");
        }}
        className="px-6 py-5"
        variant="btn-2"
      >
        DAFTAR
      </Button>
    </div>
  );
};

export default AuthButton;

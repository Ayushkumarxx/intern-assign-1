import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (url, external = false, state = {}) => {
    if (external) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      navigate(url, { state });
    }
  };

  return navigateTo;
};

export default useNavigation;

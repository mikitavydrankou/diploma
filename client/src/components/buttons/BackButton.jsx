import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    return <button onClick={goBack}>Zamknij</button>;
};

export default BackButton;

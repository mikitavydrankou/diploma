import "./styles/Homepage.module.css";
import CreateOfferForm from "../components/forms/CreateOfferForm";
import BackButton from "../components/buttons/BackButton";

export const CreateOfferPage = () => {
  return (
    <div className="createOfferPage">
      <BackButton />
      <CreateOfferForm />
    </div>
  );
};

export default CreateOfferPage;

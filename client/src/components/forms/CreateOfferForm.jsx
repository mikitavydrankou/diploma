import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUserOffer } from "../../store/actions/offerActions";

const CreateOfferForm = () => {
  const [formData, setFormData] = useState({
    place: "",
    title: "",
    description: "",
    ttlHours: 1,
  });

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.offer);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createUserOffer(formData));
      navigate("/");
    } catch (error) {
      console.error("Offer creation failed:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-container">
      <h2>Create New Offer</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="place"
          value={formData.place}
          onChange={handleChange}
          placeholder="Place (e.g. DS4)"
          required
        />

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title (e.g. piwko)"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <input
          type="number"
          name="ttlHours"
          value={formData.ttlHours}
          onChange={handleChange}
          placeholder="TTL (hours)"
          min="1"
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Offer"}
        </button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default CreateOfferForm;

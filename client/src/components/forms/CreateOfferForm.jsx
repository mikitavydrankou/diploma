import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUserOffer } from "../../store/actions/offerActions";
import styles from "./Form.module.css";

const CreateOfferForm = () => {
  const [formData, setFormData] = useState({
    place: "",
    title: "",
    description: "",
    ttlHours: 1,
    counter_offer: "",
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
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Create New Offer</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="place"
          value={formData.place}
          onChange={handleChange}
          placeholder="Place (e.g. DS4)"
          required
          className={styles.input}
        />

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title (e.g. piwko)"
          required
          className={styles.input}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className={styles.textarea}
        />

        <input
          name="counter_offer"
          value={formData.counter_offer}
          onChange={handleChange}
          placeholder="Co chcesz?"
          required
          className={styles.input}
        />

        <input
          type="number"
          name="ttlHours"
          value={formData.ttlHours}
          onChange={handleChange}
          placeholder="TTL (hours)"
          min="1"
          required
          className={styles.numberInput}
        />

        <button type="submit" disabled={isLoading} className={styles.button}>
          {isLoading ? "Creating..." : "Create Offer"}
        </button>

        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default CreateOfferForm;

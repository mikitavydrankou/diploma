import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./styles/Offer.module.css";
import { useCreateOffer } from "../../api/offerQueries";

const OfferForm = () => {
    const [formData, setFormData] = useState({
        place: "",
        title: "",
        description: "",
        ttlHours: "",
        counterOffer: "",
    });

    const { mutate, isPending, isError, error, isSuccess } = useCreateOffer();

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({
            place: formData.place,
            title: formData.title,
            description: formData.description,
            ttlHours: formData.ttlHours,
            counter_offer: formData.counterOffer,
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.offerForm}>
                <select
                    className={styles.formInput}
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>
                        Wybierz akademik
                    </option>
                    <option value="DS1">DS1</option>
                    <option value="DS2">DS2</option>
                    <option value="DS3">DS3</option>
                    <option value="DS4">DS4</option>
                    <option value="DS6">DS6</option>
                    <option value="DS7">DS7</option>
                    <option value="DS8">DS8</option>
                    <option value="DS119">DS119</option>
                </select>

                <input
                    type="text"
                    name="title"
                    className={styles.formInput}
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Tytuł"
                    required
                />

                <input
                    type="text"
                    name="description"
                    className={styles.formInput}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Opis"
                    required
                />

                <input
                    type="number"
                    name="ttlHours"
                    className={styles.formInput}
                    value={formData.ttlHours}
                    onChange={handleChange}
                    placeholder="Czas trwania (w godzinach)"
                    required
                />

                <input
                    type="text"
                    name="counterOffer"
                    className={styles.formInput}
                    value={formData.counterOffer}
                    onChange={handleChange}
                    placeholder="Propozycja"
                    required
                />

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isPending}
                >
                    {isPending ? "Wysyłanie..." : "Wyślij"}
                </button>

                {isError && (
                    <div className={styles.errorMessage}>
                        Błąd: {error.response?.data?.message || error.message}
                    </div>
                )}

                {isSuccess && (
                    <div className={styles.successMessage}>
                        Oferta została pomyślnie dodana!
                    </div>
                )}
            </form>
        </div>
    );
};

export default OfferForm;

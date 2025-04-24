import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { useNavigate } from "react-router-dom";

import {
    fetchOffers,
    fetchOfferById,
    deleteOffer,
    createOffer,
} from "./offerAPI";

export const useOffers = () => {
    return useQuery({
        queryKey: ["offers"],
        queryFn: async () => {
            return fetchOffers();
        },
    });
};

export const useOfferById = (offerId) => {
    return useQuery({
        queryKey: ["offer", offerId],
        queryFn: () => fetchOfferById(offerId),
        enabled: !!offerId,
    });
};

export const useDeleteOffer = () => {
    return useMutation({
        mutationFn: (id) => deleteOffer(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["offers"] });
        },
    });
};

export const useCreateOffer = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createOffer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["offers"] });
            navigate("/");
        },
    });
};

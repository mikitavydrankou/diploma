import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOffers, fetchOfferById, createOffer } from "./offerAPI";

export const useOffers = () => {
    return useQuery({
        queryKey: ["offers"],
        queryFn: async () => {
            const response = await fetchOffers();
            return response.data;
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

export const useCreateOffer = (token) => {
    //TODO is this token needed?
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (offerData) => createOffer(offerData, token),
        onSuccess: () => {
            queryClient.invalidateQueries(["offers"]);
        },
    });
};

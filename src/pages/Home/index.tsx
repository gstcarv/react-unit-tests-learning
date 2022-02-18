import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

interface Props {}

export const Home = (props: Props) => {
    const auth = useAuth();

    return (
        <Box m={4}>
            <a></a>
            <Text fontWeight="bold" fontSize="2xl" data-testid="logged-username">
                Olá, {auth.user?.name}
            </Text>
            <Text>Seu email: {auth.user?.email}</Text>
        </Box>
    );
};

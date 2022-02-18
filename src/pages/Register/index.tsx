import React, { useState } from "react";
import { Box, Input, Text, Button, Alert } from "@chakra-ui/react";
import { Login as LoginCredentials } from "../../types/Login";
import { User } from "../../types/User";
import { UserRegister } from "../../types/UserRegister";
import * as UserService from "../../api";
import { useHistory } from "react-router-dom";

interface Props {}

export const Register = (props: Props) => {
    const [credentials, setCredentials] = useState<UserRegister>({
        email: "",
        password: "",
        name: "",
    });

    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [hasErrors, setHasErrors] = useState(false);

    async function handleRegister() {
        try {
            setHasErrors(false);
            setLoading(true);

            await UserService.register(credentials);

            history.push("/login");
        } catch (err) {
            setHasErrors(true);
            setLoading(false);
        }
    }

    return (
        <Box p={3}>
            <Box width={500}>
                <Text fontWeight="bold" fontSize="3xl" mb={3}>
                    Registrar
                </Text>

                <Input
                    data-testid="name"
                    placeholder="Name"
                    mb={2}
                    onChange={({ target: { value: name } }) => setCredentials({ ...credentials, name })}
                />
                <Input
                    data-testid="email"
                    placeholder="Email"
                    mb={2}
                    onChange={({ target: { value: email } }) => setCredentials({ ...credentials, email })}
                />
                <Input
                    data-testid="password"
                    placeholder="Password"
                    mb={4}
                    onChange={({ target: { value: password } }) => setCredentials({ ...credentials, password })}
                />

                <Button data-testid="btn-register" disabled={loading} isLoading={loading} mb={4} onClick={handleRegister}>
                    Register
                </Button>

                {hasErrors && (
                    <Alert data-testid="alert-error" status="error">
                        Ocorreu um erro ao cadastrar o usuário
                    </Alert>
                )}
            </Box>
        </Box>
    );
};

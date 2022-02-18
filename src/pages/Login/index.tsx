import React, { useState } from "react";
import { Box, Input, Text, Button, Alert } from "@chakra-ui/react";
import { Login as LoginCredentials } from "../../types/Login";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AxiosError } from "axios";
import { User } from "../../types/User";

interface Props {}

export const Login = (props: Props) => {
    const auth = useAuth();

    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: "",
        password: "",
    });

    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [hasErrors, setHasErrors] = useState(false);

    async function handleLogin() {
        try {
            setHasErrors(false);
            setLoading(true);

            const user = await auth.login(credentials);

            if (!user.data || user.data.length === 0) {
                setHasErrors(true);
            } else {
                history.push("/");
            }
        } catch (err) {
            setHasErrors(true);
            setLoading(false);
        }
    }

    return (
        <Box p={3}>
            <Box width={500}>
                <Text fontWeight="bold" fontSize="3xl" mb={3}>
                    Login
                </Text>

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

                <Button data-testid="btn-login" isLoading={loading} onClick={handleLogin}>
                    Fazer Login
                </Button>

                <br />
                <br />

                {hasErrors && (
                    <Alert status="error" mb={3} data-testid="login-error-alert">
                        Email ou senha incorretos
                    </Alert>
                )}

                <Link to="/register">Cadastro</Link>
            </Box>
        </Box>
    );
};

import { ChakraProvider } from "@chakra-ui/react";

import AppRoutes from "./config/routes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <AuthProvider>
            <ChakraProvider>
                <AppRoutes />
            </ChakraProvider>
        </AuthProvider>
    );
}

export default App;

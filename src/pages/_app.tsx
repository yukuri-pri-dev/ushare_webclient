import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "src/feature/auth/provider/AuthProvider";
import { Header } from "src/component/Header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      {/* あらゆるcomponent内で認証状態のチェックが可能 */}
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;

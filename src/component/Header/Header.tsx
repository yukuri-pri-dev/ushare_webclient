import { Button, chakra, Container, Heading, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthContext } from "src/feature/auth/provider/AuthProvider";
import { firebase } from "@/lib/firebase/firebase";
import "firebase/auth";

export const Header = () => {
  const toast = useToast();
  const { push } = useRouter();
  const { user } = useAuthContext();

  const handleSignOut = async () => {
    try {
      const auth = firebase.auth();
      await auth.signOut();
      toast({
        title: "ログアウトしました。",
        status: "success",
        position: "top",
      });
      push("/signin");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <chakra.header py={4} bgColor={"blue.600"}>
      <Container maxW={"container.lg"}>
        <Heading color={"white"}>
          {user ? (
            <>
              <Button colorScheme={"teal"} onClick={handleSignOut}>
                サインアウト
              </Button>
              <Text>{user.uid}</Text>
            </>
          ) : (
            "ログアウト中"
          )}
        </Heading>
      </Container>
    </chakra.header>
  );
};

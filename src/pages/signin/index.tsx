import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { firebase } from "@/lib/firebase/firebase";
import "firebase/auth";
import { FirebaseError } from "@firebase/util";

export const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const auth = firebase.auth();
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      toast({
        title: "ログインに成功しました！",
        status: "success",
        position: "top",
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "エラーが発生しました。",
        status: "error",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container py={14}>
      <Heading>Sign In</Heading>
      <chakra.form onSubmit={handleSubmit}>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display={"contents"}>
            <FormControl>
              <FormLabel>メールアドレス</FormLabel>
              <Input
                type={"email"}
                name={"email"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>パスワード</FormLabel>
              <Input
                type={"password"}
                name={"password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
          </Box>
        </Grid>
        <Spacer height={4} aria-hidden />
        <Center>
          <Button type={"submit"} isLoading={isLoading}>ログイン</Button>
        </Center>
      </chakra.form>
    </Container>
  );
};

export default SignIn;
function toast(arg0: { title: string; status: string; position: string; }) {
  throw new Error("Function not implemented.");
}


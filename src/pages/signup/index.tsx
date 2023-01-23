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
import { firebase } from "@/lib/firebase/firebase";
import "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { FormEvent, useState } from "react";

export const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password == passwordConfirmation) {
      setIsLoading(true);
      try {
        const auth = firebase.auth();
        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        toast({
          title: "ユーザー登録に成功しました！",
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
    } else {
      toast({
        title: "パスワードが一致しません。",
        status: "error",
        position: "top",
      });
    }
  };

  return (
    <Container py={14}>
      <Heading>Sign Up</Heading>
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
            <FormControl>
              <FormLabel>パスワード再確認</FormLabel>
              <Input
                type={"password"}
                name={"passwordConfirmation"}
                value={passwordConfirmation}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                }}
              />
            </FormControl>
          </Box>
        </Grid>
        <Spacer height={4} aria-hidden />
        <Center>
          <Button type={"submit"} isLoading={isLoading}>
            アカウントを作成
          </Button>
        </Center>
      </chakra.form>
    </Container>
  );
};

export default SignUp;

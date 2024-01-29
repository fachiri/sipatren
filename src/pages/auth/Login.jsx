import AuthLayout from "../../layouts/AuthLayout";
import { useState } from "react";
import {
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  FormHelperText,
  InputRightElement,
  Select,
  FormErrorMessage
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaAt } from "react-icons/fa";
import { Field, Form, Formik } from "formik";
import axios from "../../utils/axios"
import { useNavigate } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaAt = chakra(FaAt);
const CFaLock = chakra(FaLock);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <>
      <AuthLayout>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Formik
            initialValues={{ username: '', password: '', role: '' }}
            validate={values => {
              const errors = {};

              if (!values.username) {
                errors.username = 'Username harus diisi';
              }

              if (!values.password) {
                errors.password = 'Password harus diisi';
              }

              if (!values.role) {
                errors.role = 'Pilih masuk sebagai';
              }

              return errors;
            }}
            onSubmit={async (values, actions) => {
              try {
                const response = await axios.post('/auth/login', values);
                localStorage.setItem('accessToken', response.data.token);
              } finally {
                navigate('/dashboard');
              }
            }}
          >
            {(props) => (
              <Form>
                <Stack
                  spacing={5}
                  p="1.5rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                  borderRadius={10}
                >
                  <Field name='role'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.role && form.touched.role}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<CFaUserAlt color="gray.300" />}
                            border="1px"
                            borderColor="gray.200"
                            borderRadius={5}
                            borderRight={0}
                            borderRightRadius={0}
                          />
                          <Select {...field} pl={10} borderLeftRadius={0}>
                            <option value="" hidden>Masuk Sebagai</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="GURU">GURU</option>
                          </Select>
                        </InputGroup>
                        <FormErrorMessage>{form.errors.role}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='username'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.username && form.touched.username}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<CFaAt color="gray.300" />}
                          />
                          <Input {...field} type="text" placeholder="Username" autoComplete="username" />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='password'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.password && form.touched.password}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            children={<CFaLock color="gray.300" />}
                          />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            autoComplete="current-password"
                          />
                          <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                              {showPassword ? "Hide" : "Show"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                        <FormHelperText textAlign="right" mt={5}>
                          <Link>Lupa Password?</Link>
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    isLoading={props.isSubmitting}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Login
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </AuthLayout>
    </>
  )
}
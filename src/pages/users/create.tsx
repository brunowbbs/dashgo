import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";


type CreateUserFormData = {
  name: string;
  email: string;
  password_confirmation: string;
  password: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha é obrigatória').min(6, "No mínimo 6 caracteres"),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], "As senhas precisam ser iguais")
})

export default function UserCreate() {

  const router = useRouter();

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date()
      }
    })
    return response.data.user;

  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  });


  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  });

  const { isSubmitting, errors } = formState;


  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values, event) => {
    await createUser.mutateAsync(values);
    router.push('/users');
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">

        <Sidebar />

        <Box as="form" onSubmit={handleSubmit(handleCreateUser)} flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>

          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="name" label="Nome completo" type="text" {...register('name')} error={errors.name} />
              <Input name="email" label="E-mail" type="email" {...register('email')} error={errors.email} />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="password" label="Senha" type="password" {...register('password')} error={errors.password} />
              <Input name="password_confirmation" label="Confirmação da senha" type="password" {...register('password_confirmation')} error={errors.password_confirmation} />
            </SimpleGrid>
          </VStack>

          <Flex mt={["6", "8"]} justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>Salvar</Button>
            </HStack>
          </Flex>

        </Box>

      </Flex>
    </Box>
  )
}
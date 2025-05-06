'use client';

import { Button, TextInput, Paper, Title, Container } from '@mantine/core';
import { IconUser, IconLock } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container size={420} my={40}>
      <Title mb="lg">Login</Title>
      <Paper withBorder shadow="md" p={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@fastsale.com"
          leftSection={<IconUser size={18} />}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Senha"
          placeholder="Sua senha"
          type="password"
          leftSection={<IconLock size={18} />}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          mt="md"
          required
        />
        <Link href="/dashboard">
            <Button fullWidth mt="xl" >
            Entrar
            </Button>
        </Link>
      </Paper>
    </Container>
  );
}

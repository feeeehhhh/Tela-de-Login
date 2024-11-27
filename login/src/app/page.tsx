'use client'
import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { motion } from 'motion/react';

import desktop from '../../public/Other 03.png'
import retangulo from '../../public/Rectangle.png'
import google from '../../public/google-logo.svg'


export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('Login bem-sucedido!');
        // Redirecionar ou salvar o token, se necessário
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('Erro ao tentar fazer login.');
    }
  };
  return (
    <div className=" bg-blue-light h-screen">
      <ul className="flex items-center justify-between " >
        <li className="min-w-[500px] mx-40 py-12 space-y-6">
          <form onSubmit={handleLogin}>
            <h1 className="text-center font-semibold text-xl">Seja Bem-Vindo</h1>
            <div>
              <label htmlFor="email">Email:</label>
              <Input
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="rounded-full  border-purple-border border-opacity-60 shadow-purple-border  shadow-2xl" id="email" type="email" />
            </div>
            <div>
              <label htmlFor="password">Senha:</label>
              <Input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-full  border-purple-border border-opacity-60  shadow-purple-border  shadow-2xl" id="password" type="password" />
            </div>
            <Button type='submit' className="w-full mt-4 bg-purple-border rounded-full  text-white hover:bg-purple-light">Entrar</Button>
            <p className=" pt-5 flex justify-center">Você não tem uma conta?
              <motion.div className='text-blue-400 ml-2'
                whileHover={{ scale: 1.1 }}>
                <Link href={'/SingUp'}>Registre-se</Link>
              </motion.div>
            </p>

            <motion.a className="cursor-pointer flex  justify-center mt-4"
              whileHover={{ scale: 1.1 }}>
              <Image src={google} alt="Google Login" height={50} width={50} />
            </motion.a>
          </form>

        </li>
        <li className="flex">
          <div className="bg-purple-light w-[430px] h-screen">
          </div>
          <Image className="absolute 
          2xl:-ml-[280px]
          xl:-ml-[200px]
          max-xl:-ml-[150px] 
          " src={desktop} alt="Imagem Ilustrativa" height={600} width={600} />
        </li>
        <li className="absolute bottom-0">
          <Image src={retangulo} alt="Imagem Ilustrativa" height={0} width={0} />
        </li>
      </ul>

    </div >
  )
}

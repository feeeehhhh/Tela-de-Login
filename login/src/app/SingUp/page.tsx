'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { motion } from 'motion/react';
import Image from "next/image";
import Link from 'next/link';

import google from '../../../public/google-logo.svg'
import imagemregister from '../../../public/Group 3.png'
import React, { FormEvent, useState } from "react";

// interface para os dados dos usuários
interface FormData {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function SingUp() {
    // Estado para armazenar os dados dos inputs
    const [formDataState, setFormDataState] = useState<FormData>({
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Função para lidar com mudanças nos campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormDataState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Função para tratar o envio do formulário
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        if (formDataState.password !== formDataState.confirmPassword) {
            alert('As senhas estão diferentes');
            return;
        }
    
        try {
            // Certifique-se de que o corpo da requisição está sendo enviado corretamente
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formDataState.fullName,
                    userName: formDataState.userName,
                    email: formDataState.email,
                    password: formDataState.password,
                }),
            });
    
            if (response.ok) {
                alert('Usuário registrado com sucesso!');
            } else {
                const errorData = await response.json();
                alert(`Erro: ${errorData.error || 'Erro desconhecido'}`);
            }
        } catch (error) {
            // Adiciona mais logs para depuração
            console.error("Erro ao conectar com o backend", error);
            if (error instanceof Error) {
                alert(`Erro ao conectar com o backend: ${error.message}`);
            } else {
                alert(`Erro desconhecido: ${String(error)}`);
            }
        }
    };


    return (
        <div className="bg-blue-light h-screen">
            <main className="mx-16">
                <ul className="flex justify-between">
                    <li>
                        <Image src={imagemregister} alt="Imagem Ilustrativa" width={0} height={0}></Image>
                    </li>
                    <li className="min-w-[500px] mx-40 py-12 ">
                        <h1 className="text-center font-semibold">Por favor preencha o formulário para se inscrever!</h1><br />
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="nome">Nome completo:</label>
                                <Input
                                    name="fullName"
                                    value={formDataState.fullName}
                                    onChange={handleChange}
                                    className="rounded-full border-purple-border border-opacity-60 shadow-purple-border shadow-2xl"
                                    id="nome"
                                    type="text"
                                />
                            </div>
                            <div>
                                <label htmlFor="username">Nome de usuário:</label>
                                <Input
                                    name="userName"
                                    value={formDataState.userName}
                                    onChange={handleChange}
                                    className="rounded-full border-purple-border border-opacity-60 shadow-purple-border shadow-2xl"
                                    id="username"
                                    type="text"
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <Input
                                    name="email"
                                    value={formDataState.email}
                                    onChange={handleChange}
                                    className="rounded-full border-purple-border border-opacity-60 shadow-purple-border shadow-2xl"
                                    id="email"
                                    type="email"
                                />
                            </div>
                            <div>
                                <label htmlFor="senha">Senha:</label>
                                <Input
                                    name="password"
                                    value={formDataState.password}
                                    onChange={handleChange}
                                    className="rounded-full border-purple-border border-opacity-60 shadow-purple-border shadow-2xl"
                                    id="senha"
                                    type="password"
                                />
                            </div>
                            <div>
                                <label htmlFor="Confirmarsenha">Confirmar senha:</label>
                                <Input
                                    name="confirmPassword"
                                    value={formDataState.confirmPassword}
                                    onChange={handleChange}
                                    className="rounded-full border-purple-border border-opacity-60 shadow-purple-border shadow-2xl"
                                    id="Confirmarsenha"
                                    type="password"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-purple-border rounded-full text-white hover:bg-purple-light">Registrar</Button>
                        </form>
                        <p className="pt-5 flex justify-center ">Você já tem uma conta?
                            <motion.div className='text-blue-400 ml-2' whileHover={{ scale: 1.1 }}>
                                <Link href={'./'}>Entre agora</Link>
                            </motion.div>
                        </p>

                        <motion.a className="cursor-pointer flex justify-center mt-4" whileHover={{ scale: 1.1 }}>
                            <Image src={google} alt="Google Login" height={50} width={50} />
                        </motion.a>
                    </li>
                </ul>
            </main>
        </div>
    );
}

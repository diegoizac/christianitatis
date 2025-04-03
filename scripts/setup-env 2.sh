#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🚀 Iniciando configuração do ambiente Christianitatis...${NC}\n"

# Detecta o sistema operacional
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${YELLOW}📱 Sistema macOS detectado${NC}"
    
    # Configuração específica para macOS
    echo -e "${YELLOW}⚙️  Configurando .npmrc para compatibilidade...${NC}"
    cat > .npmrc << EOF
platform=linux
arch=x64
target_platform=linux
target_arch=x64
omit=optional
node-linker=hoisted
EOF
    echo -e "${GREEN}✅ .npmrc configurado com sucesso${NC}"
else
    echo -e "${YELLOW}💻 Sistema Linux/Windows detectado${NC}"
fi

# Verifica Node.js
echo -e "\n${YELLOW}🔍 Verificando versão do Node.js...${NC}"
NODE_VERSION=$(node -v)
if [[ ${NODE_VERSION:1:2} -lt 18 ]]; then
    echo -e "${RED}❌ Node.js 18+ é necessário. Versão atual: $NODE_VERSION${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $NODE_VERSION${NC}"

# Verifica npm
echo -e "\n${YELLOW}🔍 Verificando versão do npm...${NC}"
NPM_VERSION=$(npm -v)
if [[ ${NPM_VERSION:0:1} -lt 9 ]]; then
    echo -e "${RED}❌ npm 9+ é necessário. Versão atual: $NPM_VERSION${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $NPM_VERSION${NC}"

# Instala dependências
echo -e "\n${YELLOW}📦 Instalando dependências...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar dependências${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependências instaladas com sucesso${NC}"

# Verifica arquivo .env
echo -e "\n${YELLOW}🔑 Verificando arquivo .env...${NC}"
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  Arquivo .env não encontrado. Criando a partir do exemplo...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}✅ Arquivo .env criado${NC}"
        echo -e "${YELLOW}⚠️  Por favor, atualize as variáveis em .env com seus valores${NC}"
    else
        echo -e "${RED}❌ Arquivo .env.example não encontrado${NC}"
        exit 1
    fi
fi

echo -e "\n${GREEN}✅ Configuração concluída com sucesso!${NC}"
echo -e "\n${YELLOW}Para iniciar o servidor de desenvolvimento, execute:${NC}"
echo -e "${GREEN}npm run dev${NC}" 
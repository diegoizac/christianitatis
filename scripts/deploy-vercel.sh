#!/bin/bash

# Script para fazer commit das mudanças e deploy na Vercel

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Iniciando processo de deploy para Vercel...${NC}"

# Verificar se há mudanças para commit
if [[ -z $(git status -s) ]]; then
  echo -e "${YELLOW}Não há mudanças para commit.${NC}"
else
  # Adicionar todas as mudanças
  echo -e "${GREEN}Adicionando mudanças ao git...${NC}"
  git add .
  
  # Fazer commit
  echo -e "${GREEN}Fazendo commit das mudanças...${NC}"
  git commit -m "Fix: Corrigido problemas de compatibilidade para deploy na Vercel"
  
  # Enviar para o repositório remoto
  echo -e "${GREEN}Enviando mudanças para o repositório remoto...${NC}"
  git push
fi

# Fazer deploy na Vercel
echo -e "${GREEN}Iniciando deploy na Vercel...${NC}"
npx vercel --prod

echo -e "${GREEN}Processo de deploy concluído!${NC}"
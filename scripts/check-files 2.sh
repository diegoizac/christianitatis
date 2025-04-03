#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🔍 Verificando arquivos modificados...${NC}\n"

# Verifica arquivos modificados e não commitados
MODIFIED_FILES=$(git ls-files -m)

if [ -n "$MODIFIED_FILES" ]; then
    echo -e "${RED}⚠️  Arquivos modificados e não salvos:${NC}"
    echo "$MODIFIED_FILES" | while read -r file; do
        echo -e "${RED}  - $file${NC}"
    done
    echo -e "\n${YELLOW}Por favor, salve os arquivos antes de continuar.${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Todos os arquivos estão salvos!${NC}"
fi

# Verifica arquivos não rastreados
UNTRACKED_FILES=$(git ls-files --others --exclude-standard)

if [ -n "$UNTRACKED_FILES" ]; then
    echo -e "\n${YELLOW}📝 Arquivos não rastreados:${NC}"
    echo "$UNTRACKED_FILES" | while read -r file; do
        echo -e "${YELLOW}  - $file${NC}"
    done
fi

exit 0 
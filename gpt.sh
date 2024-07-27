#!/bin/bash

# Diretório onde estão os arquivos
diretorio="/tmp/ohrafaelmartins.github.io"
# Nome do arquivo de saída
arquivo_saida="${diretorio}/todos_os_css.txt"

# Limpa o arquivo de saída se já existir
> "$arquivo_saida"

# Itera sobre todos os arquivos .css no diretório
for arquivo in "$diretorio"/*.css; do
  # Verifica se é um arquivo regular e se tem a extensão .css
  if [[ -f "$arquivo" ]]; then
    # Extrai o nome do arquivo original
    nome_arquivo=$(basename "$arquivo")
    
    # Adiciona a mensagem e o conteúdo do arquivo ao arquivo de saída
    echo "Aqui esta meu código $nome_arquivo memorizar o estado atual: " >> "$arquivo_saida"
    cat "$arquivo" >> "$arquivo_saida"
    echo "---" >> "$arquivo_saida"
  fi
done

echo "Processo concluído! Todos os arquivos CSS foram combinados em $arquivo_saida."

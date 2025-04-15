# 🛒 Shopping Cart

📌 This document is written in Brazilian Portuguese. For the English version, see the file [README-en.md](/README-en.md).

A maior parte do código utiliza nomes de variáveis, funções, etc., em inglês, enquanto os comentários do código e o conteúdo textual da interface e das páginas estão em português brasileiro.

## Descrição do projeto

Este é um carrinho de compras simples e funcional desenvolvido com HTML, CSS e TypeScript. Os produtos são armazenados no navegador usando o localStorage, garantindo persistência dos dados sem necessidade de backend. Há duas páginas:

- **Página Inicial**: Lista os produtos disponíveis com imagem, nome e preço.
- **Página do Carrinho**:  Exibe os itens adicionados, permite alterar quantidades, remover produtos, limpar o carrinho ou finalizar a compra.

## :hammer: Funcionalidades

- 🛍️ Apresentar os produtos disponíveis
- 🔍 Busca de produtos por nome
- 📦 Adicionar produtos ao carrinho
- 🧮 Cálculo do preço total para a compra
- ✏️ Aumentar ou reduzir quantidade de produtos
- ❌ Remover itens individualmente
- 🧹 Limpar o carrinho por completo
- 💾 Persistência com `localStorage`
- ✅ Finalizar compra com alerta e retorno à página inicial

## 🚀 Como executar o projeto

1. Clone este repositório:
    ```bash
    git clone https://github.com/evecleison/shopping-cart.git
    ```
2. Compile os arquivos `.ts` com o comando:
    ```bash
    npx tsc
    ```
3. Abra `index.html` no navegador para ver a página inicial

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- Typescript

## 👨‍💻 Autor

- Evecleison Albuquerque do Nascimento

## 📄 Licença

Este projeto está licenciado sob a licença MIT.  
Veja o arquivo [LICENSE](https://github.com/evecleison/shopping-cart/blob/main/LICENSE)  para mais detalhes.

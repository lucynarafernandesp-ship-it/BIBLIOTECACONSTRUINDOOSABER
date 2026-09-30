# Documento de Requisitos — Biblioteca Construindo o Saber

## 1. Identificação

| Campo | Preencher |
|---|---|
| Grupo | Construindo o Saber |
| Integrantes | Lucynara Fernandes, Ícaro Magalhães |
| Disciplina | Engenharia de Software I |
| Semana | 2 |
| Data | 20/09/2026 |

## 2. O Sistema

Plataforma web e mobile de e-commerce e catálogo dinâmico para a biblioteca "Construindo o Saber", com suporte à compra e aluguel de livros, filtros de busca, resumos interativos e fluxo de checkout integrado.

## 3. Requisitos Funcionais

| ID | Descrição |
|---|---|
| RF-01 | O sistema deve permitir que o usuário busque e filtre livros por categoria, autor, faixa etária e disponibilidade para compra ou aluguel. |
| RF-02 | O sistema deve disponibilizar resumos interativos e prévias de leitura das obras cadastradas. |
| RF-03 | O sistema deve processar o aluguel e a venda de livros através de um fluxo de checkout online integrado. |
| RF-04 | O sistema deve permitir que os administradores gerenciem o acervo (cadastro, edição, remoção de títulos e controle de estoque/exemplares). |

## 4. Requisitos Não-Funcionais

| ID | Categoria | Descrição |
|---|---|---|
| RNF-01 | Desempenho | O tempo de carregamento da busca do catálogo e aplicação de filtros não deve exceder 2 segundos em conexões padrão. |
| RNF-02 | Segurança | Os dados cadastrais e de pagamento dos usuários devem ser transmitidos e armazenados utilizando criptografia segura (HTTPS / SSL e hash no banco). |
| RNF-03 | Usabilidade | A interface web e mobile deve ser responsiva e intuitiva, permitindo concluir um aluguel/compra em até 4 etapas. |
| RNF-04 | Portabilidade | O aplicativo web deve ser acessível e responsivo em navegadores modernos desktop e dispositivos móveis (Android/iOS). |

## 5. Requisitos Relacionados

| RF | RNF relacionado(s) |
|---|---|
| RF-01 | RNF-01, RNF-03, RNF-04 |
| RF-02 | RNF-03, RNF-04 |
| RF-03 | RNF-02, RNF-03, RNF-04 |
| RF-04 | RNF-02, RNF-04 |

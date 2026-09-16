# Engenharia de Requisitos — Semana 2

## Sistema: Biblioteca Construindo o Saber

### Integrantes
- Ícaro Magalhães — Engenheiro de Requisitos Técnico
- Lucynara — Engenheira de Requisitos Inovadora

## Descrição do Sistema

O sistema Biblioteca Construindo o Saber é uma plataforma web e mobile voltada para a compra e o aluguel de livros. O sistema contará com catálogo de livros, filtros por categoria e faixa etária, resumos interativos e fluxo de checkout integrado.

## Requisitos Funcionais (RF)

### RF01 — Cadastro e autenticação de usuários
O sistema deve permitir o cadastro e a autenticação de usuários por meio de e-mail e senha.

### RF02 — Consulta ao catálogo de livros
O sistema deve permitir que o usuário consulte os livros disponíveis no catálogo, exibindo informações como título, autor, categoria, faixa etária e disponibilidade.

### RF03 — Busca e filtragem de livros
O sistema deve permitir a busca de livros e a aplicação de filtros por categoria e faixa etária.

### RF04 — Compra e aluguel de livros
O sistema deve permitir que o usuário selecione livros disponíveis e escolha entre as opções de compra ou aluguel.

### RF05 — Gerenciamento da disponibilidade
O sistema deve atualizar e informar a disponibilidade dos livros para compra ou aluguel.

### RF06 — Finalização do pedido
O sistema deve permitir que o usuário revise os itens selecionados e finalize o pedido por meio do fluxo de checkout.

## Requisitos Não Funcionais (RNF)

### RNF01 — Segurança
O sistema deve armazenar as senhas dos usuários de forma criptografada e impedir o acesso não autorizado aos dados pessoais.

### RNF02 — Desempenho
O sistema deve responder às consultas ao catálogo e às buscas de livros em até 3 segundos, em condições normais de uso.

### RNF03 — Disponibilidade
O sistema deve permanecer disponível pelo menos 99% do tempo, exceto durante períodos previamente programados de manutenção.

### RNF04 — Compatibilidade
A versão web do sistema deve funcionar corretamente nos principais navegadores atuais, como Google Chrome, Microsoft Edge e Mozilla Firefox.

### RNF05 — Responsividade
A interface web deve se adaptar a diferentes tamanhos de tela, permitindo sua utilização em computadores, tablets e smartphones.

### RNF06 — Proteção de dados
O sistema deve proteger os dados pessoais dos usuários e permitir que sejam tratados de acordo com as regras de privacidade aplicáveis.

## Relação entre Requisitos Funcionais e Não Funcionais

- **RF01 — Cadastro e autenticação de usuários:** relacionado ao **RNF01 — Segurança** e ao **RNF06 — Proteção de dados**, pois o cadastro e o acesso ao sistema envolvem informações pessoais e credenciais dos usuários.

- **RF02 — Consulta ao catálogo de livros:** relacionado ao **RNF02 — Desempenho**, pois as informações do catálogo devem ser carregadas dentro do tempo de resposta estabelecido.

- **RF03 — Busca e filtragem de livros:** relacionado ao **RNF02 — Desempenho**, pois as pesquisas e os filtros devem apresentar os resultados em até 3 segundos em condições normais de uso.

- **RF04 — Compra e aluguel de livros:** relacionado ao **RNF01 — Segurança** e ao **RNF06 — Proteção de dados**, pois essas operações envolvem informações do usuário que precisam ser protegidas.

- **RF05 — Gerenciamento da disponibilidade:** relacionado ao **RNF03 — Disponibilidade**, pois as informações sobre os livros precisam estar acessíveis aos usuários durante o funcionamento do sistema.

- **RF06 — Finalização do pedido:** relacionado ao **RNF01 — Segurança**, **RNF03 — Disponibilidade** e **RNF06 — Proteção de dados**, garantindo segurança e disponibilidade durante a conclusão do pedido.
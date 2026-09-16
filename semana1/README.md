# BIBLIOTECACONSTRUINDOOSABER
Plataforma web e mobile de e-commerce e catálogo dinâmico para a biblioteca Construindo o Saber, com suporte a compra/aluguel de livros, filtros por categoria/faixa etária, resumos interativos e fluxo de checkout integrado.
## Justificativa da escolha do sistema

O sistema de biblioteca possui porte médio e complexidade moderada, pois precisa integrar diferentes funcionalidades, como cadastro de livros e usuários, controle de empréstimos e devoluções, disponibilidade dos exemplares e organização das informações.

O sistema poderia ser utilizado por funcionários da biblioteca, administradores e usuários que consultam ou solicitam livros. Inicialmente, uma equipe pequena poderia desenvolver e manter o sistema, mas ao longo do tempo outras pessoas poderiam participar de sua manutenção e evolução.

Se fosse desenvolvido de forma artesanal, sem planejamento e sem um processo organizado, poderiam surgir problemas como perda de informações, erros no controle de empréstimos, dificuldade de manutenção e conflitos entre diferentes partes do sistema.

Apenas programar bem não seria suficiente, pois o sistema precisa ser planejado, organizado, documentado e preparado para receber mudanças ao longo do tempo. A Engenharia de Software ajuda a garantir que o sistema continue funcionando corretamente mesmo com sua evolução.
## Aplicação dos quatro princípios

### Modularidade e abstração

O sistema pode ser dividido em módulos de catálogo, clientes, autenticação, carrinho, compra e aluguel, pagamento e interface. Cada módulo possui uma responsabilidade específica. Essa divisão facilita a organização do sistema, pois cada funcionalidade pode ser desenvolvida e mantida separadamente, mantendo a integração necessária entre elas.

### Qualidade de software

Os atributos mais críticos para o sistema são funcionalidade, confiabilidade e usabilidade. A funcionalidade é essencial para garantir que recursos como catálogo, cadastro, compra, aluguel e pagamento funcionem corretamente. A confiabilidade é importante para evitar erros em operações como pedidos e pagamentos. Já a usabilidade é necessária para que os usuários consigam pesquisar livros, utilizar o carrinho e concluir suas operações de maneira simples e intuitiva.

### Manutenibilidade e evolução

A manutenção evolutiva provavelmente seria uma das mais frequentes nos primeiros anos, pois novas necessidades poderiam surgir com o uso do sistema. Um exemplo seria a inclusão de uma lista de livros favoritos ou de um sistema de reservas, funcionalidades que poderiam ser solicitadas pelos usuários após a implantação do sistema.

### Boas práticas gerais

As boas práticas seriam aplicadas por meio da documentação das principais decisões do projeto, como a organização dos módulos, do banco de dados e dos processos de compra e aluguel. O Git seria utilizado para versionar o projeto, mantendo o histórico das alterações e permitindo que cada integrante trabalhe em sua própria branch e registre suas contribuições por meio de commits. Também seria adotada uma padronização para nomes e formatação do código, utilizando nomes claros e uma convenção definida, como `snake_case` para variáveis e funções.

# Projeto Final

## 1. Identificação

| Campo | Preencher |
|---|---|
| Grupo | Construindo o Saber |
| Tema | Sistema de Biblioteca |
| Integrantes | Lucynara Fernandes e Ícaro Magalhães |
| Disciplina | Engenharia de Software I |

---

## 2. Visão Geral do Sistema

A Biblioteca Construindo o Saber é uma plataforma web e mobile de e-commerce e catálogo dinâmico, desenvolvida para facilitar a consulta, compra e aluguel de livros. O sistema permite buscar e filtrar obras, consultar resumos e prévias de leitura, realizar compras ou aluguéis por meio de checkout online e possibilita aos administradores o gerenciamento do acervo.

---

## 3. Fundamentos do Sistema (Semana 1)

O sistema Biblioteca Construindo o Saber exige a aplicação de Engenharia de Software por reunir diferentes funcionalidades e responsabilidades, como catálogo, busca e filtros, compra e aluguel, pagamentos e gerenciamento do acervo. Sua construção de forma planejada permite organizar essas funcionalidades em módulos, facilitando o desenvolvimento e reduzindo problemas de integração e manutenção.

A modularidade e a abstração permitem separar as principais responsabilidades do sistema; a qualidade deve garantir que as funcionalidades sejam confiáveis, eficientes e fáceis de utilizar; e a manutenibilidade possibilita corrigir problemas e incorporar novas necessidades ao longo do tempo. Como boas práticas, o projeto adota a documentação das decisões importantes, o versionamento com Git/GitHub e a padronização de nomes e organização dos arquivos.

🔗 [Material da Semana 1](semana1/)

---

## 4. Requisitos e Viabilidade (Semana 2)

Na Semana 2 foi realizado o processo de elicitação de requisitos, considerando diferentes stakeholders do sistema por meio da definição de personas, entrevistas e discussão de necessidades. O processo também contemplou a mediação de um conflito de interesses entre stakeholders, buscando uma solução compatível com os objetivos do sistema. A partir dessas informações foram consolidados os principais requisitos funcionais e não funcionais da Biblioteca Construindo o Saber.

### Requisitos Funcionais

- **RF-01:** O sistema deve permitir que o usuário busque e filtre livros por categoria, autor, faixa etária e disponibilidade para compra ou aluguel.
- **RF-02:** O sistema deve disponibilizar resumos interativos e prévias de leitura das obras cadastradas.
- **RF-03:** O sistema deve processar o aluguel e a venda de livros através de um fluxo de checkout online integrado.
- **RF-04:** O sistema deve permitir que os administradores gerenciem o acervo, incluindo cadastro, edição, remoção de títulos e controle de estoque/exemplares.

### Requisitos Não Funcionais

- **RNF-01 — Desempenho:** O tempo de carregamento da busca do catálogo e aplicação de filtros não deve exceder 2 segundos em conexões padrão.
- **RNF-02 — Segurança:** Os dados cadastrais e de pagamento dos usuários devem ser transmitidos e armazenados utilizando criptografia segura.
- **RNF-03 — Usabilidade:** A interface web e mobile deve ser responsiva e intuitiva, permitindo concluir um aluguel ou compra em até 4 etapas.
- **RNF-04 — Portabilidade:** O aplicativo web deve ser acessível e responsivo em navegadores modernos desktop e dispositivos móveis Android/iOS.

O estudo de viabilidade analisou o projeto nas dimensões técnica, econômica e operacional. Na dimensão técnica, foram considerados especialmente os desafios relacionados ao desempenho, controle de estoque e integração segura com serviços de pagamento. Na dimensão econômica, foram avaliados os custos de desenvolvimento, infraestrutura e operação em relação aos benefícios esperados. Na dimensão operacional, foram considerados a utilização do sistema pelos leitores e o processo de adaptação dos funcionários ao gerenciamento digital do acervo.

Como conclusão, o projeto foi classificado como **viável com ressalvas**, principalmente pela necessidade de validação e testes antecipados do gateway de pagamento e dos mecanismos de segurança da informação, além da necessidade de facilitar a adaptação dos funcionários ao gerenciamento digital do acervo.

🔗 [Requisitos da Semana 2](Semana%202/requisitos.md)  
🔗 [Material da Semana 2](Semana%202/)

---

## 5. Modelagem UML (Semana 3)

Na Semana 3 foram elaborados diagramas UML para representar diferentes perspectivas do sistema Biblioteca Construindo o Saber.

### Diagrama de Casos de Uso

O Diagrama de Casos de Uso representa a interação dos atores com as principais funcionalidades do sistema. Foram considerados os atores **Usuário** e **Administrador**, contemplando os casos de uso de buscar e filtrar livros, consultar resumos e prévias, comprar ou alugar livros e gerenciar o acervo.

🔗 [Diagrama de Casos de Uso](semana3/Diagrama-casos-de-uso-biblioteca.drawio)  
🖼️ [Visualizar PNG](semana3/diagrama-casos-de-uso-biblioteca.png)

### Diagrama de Classes

O Diagrama de Classes representa a estrutura principal do sistema e as relações entre as classes **Usuário, Administrador, Livro, Exemplar, Pedido e Pagamento**, incluindo seus principais atributos e métodos.

🔗 [Diagrama de Classes](semana3/diagrama-classes-biblioteca.drawio)  
🖼️ [Visualizar PNG](semana3/diagrama-classes-biblioteca.png)

### Diagramas de Sequência

Os diagramas de sequência representam o fluxo de interação entre os participantes do sistema para a execução de funcionalidades específicas. Cada integrante do grupo elaborou um fluxo diferente.

#### Ícaro Magalhães — Comprar ou Alugar Livro

O diagrama representa o fluxo de compra ou aluguel de uma obra, envolvendo a consulta do livro e do exemplar, criação do pedido e processamento do pagamento.

🔗 [Arquivo Draw.io](semana3/ddiagrama-sequencia-comprar-alugar-livro-icaro.drawio)  
🖼️ [Visualizar PNG](semana3/diagrama-sequencia-comprar-alugar-livro-icaro.png)

#### Lucynara Fernandes — Gerenciar Acervo

O diagrama representa uma ação administrativa de gerenciamento do acervo, contemplando o cadastro de livro e o controle da quantidade de exemplares disponíveis.

🔗 [Arquivo Draw.io](semana3/diagrama-sequencia-gerenciar-acervo-lucynara.drawio)  
🖼️ [Visualizar PNG](semana3/diagrama-sequencia-gerenciar-acervo-lucynara.png)

🔗 [Pasta completa da Semana 3](semana3/)

---

## 6. Modelo de Processo (Semana 4)

Para o desenvolvimento da Biblioteca Construindo o Saber, o grupo adotaria uma abordagem ágil, utilizando o framework **Scrum**. Essa escolha se justifica pela estabilidade parcial dos requisitos, uma vez que as funcionalidades principais estão definidas, mas novas necessidades podem surgir durante a evolução do sistema.

Outro fator considerado é o perfil da equipe. Por se tratar de uma equipe pequena, a organização do trabalho em ciclos curtos favorece a divisão das atividades, o acompanhamento do desenvolvimento e a revisão frequente das funcionalidades implementadas.

O modelo em cascata foi descartado por organizar o desenvolvimento em etapas predominantemente sequenciais e oferecer menor flexibilidade diante de mudanças. O modelo incremental também seria uma alternativa possível, pois permitiria desenvolver o sistema gradualmente, mas a abordagem ágil foi considerada mais adequada por favorecer revisões frequentes das prioridades e adaptação contínua dos requisitos.

Com Scrum, o trabalho pode ser organizado em **Sprints**, enquanto os requisitos e funcionalidades são registrados e priorizados em um **Product Backlog**. Dessa forma, novas necessidades podem ser analisadas e incorporadas ao planejamento das Sprints seguintes.

No cenário de mudança proposto para o sistema, a integração com outras bibliotecas seria registrada como uma nova necessidade do produto. Os requisitos e artefatos afetados seriam revistos e as alterações necessárias seriam priorizadas no Product Backlog.

🔗 [Modelo de Processo — Semana 4](semana4/modelo-processo.md)

---

## 7. Cenário de Mudança

### O cenário recebido

A biblioteca passou a fazer parte de uma rede compartilhada com outras três bibliotecas da região, entre elas a biblioteca de uma universidade parceira, permitindo que um usuário cadastrado numa delas possa pegar emprestado um livro de qualquer uma das outras. A universidade, porém, exigiu que os livros do seu acervo raro nunca saiam fisicamente do prédio dela, mesmo estando disponíveis no sistema compartilhado.

### Tipo de manutenção

O cenário representa principalmente uma **manutenção adaptativa**, pois o sistema precisa ser modificado para se adaptar a uma mudança no ambiente de negócio em que está inserido. O sistema originalmente desenvolvido para a Biblioteca Construindo o Saber passa a operar em uma rede compartilhada com outras bibliotecas, incorporando novas regras e necessidades que não faziam parte do contexto inicial.

A mudança não decorre da correção de um defeito existente, portanto não se caracteriza como manutenção corretiva. Também não tem como objetivo principal prevenir uma falha futura ou apenas melhorar uma funcionalidade existente. O fator que provoca a alteração é a nova realidade externa na qual o sistema deverá funcionar.

### Análise de impacto

A entrada da Biblioteca Construindo o Saber em uma rede compartilhada com outras três bibliotecas provoca impactos em diferentes partes do projeto. A mudança não exige que todo o sistema seja reconstruído, mas requer a revisão dos artefatos relacionados ao cadastro de usuários, consulta ao acervo, disponibilidade dos exemplares e realização de empréstimos.

#### Stakeholders

O conjunto de stakeholders precisa ser ampliado. Além dos usuários e administradores já considerados, passam a participar do contexto as demais bibliotecas integrantes da rede e seus respectivos responsáveis. A universidade parceira também assume papel relevante por estabelecer uma regra específica para seu acervo raro.

#### Requisitos

Os requisitos relacionados à busca e disponibilidade dos livros precisam ser revistos para considerar exemplares pertencentes às diferentes bibliotecas da rede. Também será necessário incluir requisitos que permitam reconhecer em qual biblioteca o usuário está cadastrado e a qual instituição pertence cada exemplar.

Deverá ser acrescentada uma regra funcional específica para impedir o empréstimo externo dos livros classificados como pertencentes ao acervo raro da universidade parceira. Esses livros poderão permanecer visíveis no sistema compartilhado, mas não poderão ser retirados fisicamente do prédio da instituição.

Os requisitos não funcionais de segurança e desempenho também deverão ser reavaliados, pois o sistema passará a trabalhar com informações compartilhadas entre diferentes instituições e deverá continuar oferecendo acesso seguro e desempenho adequado.

#### Estudo de viabilidade

A viabilidade técnica precisa ser reavaliada devido à necessidade de integração e compartilhamento de informações entre quatro bibliotecas. A dimensão econômica também poderá sofrer impacto em razão dos custos relacionados à implementação e manutenção dessa integração. Na dimensão operacional, será necessário definir procedimentos comuns entre as instituições para empréstimos, devoluções e aplicação das restrições de cada acervo.

Isso não significa que o sistema se tornou inviável, mas que as três dimensões precisam ser novamente analisadas diante do novo contexto.

#### Diagramas UML

O Diagrama de Casos de Uso deverá ser atualizado para representar as novas possibilidades de empréstimo entre bibliotecas e a restrição aplicada ao acervo raro.

O Diagrama de Classes também será afetado. A estrutura deverá permitir identificar a biblioteca à qual cada exemplar pertence e representar as regras necessárias para distinguir exemplares comuns daqueles submetidos a restrições de circulação. Também poderá ser necessária a representação da própria biblioteca como entidade do domínio.

Os Diagramas de Sequência já produzidos continuam válidos para representar os fluxos originalmente modelados, mas novos diagramas ou adaptações poderão ser necessários para representar o empréstimo entre bibliotecas e o tratamento da tentativa de retirada de um exemplar pertencente ao acervo raro.

#### Modelo de processo

A escolha de uma abordagem ágil com Scrum continua adequada e não precisa ser substituída. O cenário reforça a necessidade de um processo capaz de absorver mudanças nos requisitos. As novas funcionalidades e regras seriam registradas e priorizadas no Product Backlog e desenvolvidas nas Sprints seguintes.

#### Elementos que permanecem válidos

Os fundamentos de Engenharia de Software definidos anteriormente permanecem válidos. Modularidade, qualidade, manutenibilidade e boas práticas tornam-se ainda mais importantes diante da integração com outras instituições.

Da mesma forma, funcionalidades que não possuem relação direta com o compartilhamento entre bibliotecas, como a disponibilização de resumos e prévias das obras, não precisam necessariamente ser modificadas. O objetivo da manutenção é alterar somente os elementos atingidos pelo novo cenário, preservando aquilo que continua atendendo corretamente às necessidades do sistema.

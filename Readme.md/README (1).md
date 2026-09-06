# 📚 Construindo o Saber

Sistema de catálogo, venda e aluguel de livros — site responsivo (web e mobile) com carrinho de compras, checkout com pagamento e cadastro de clientes.

## Estrutura do repositório

```
construindo-o-saber/
├── der/
│   └── DER.md              # Modelo Entidade-Relacionamento (diagrama + notas de negócio)
├── python/
│   ├── app.py               # API Flask (catálogo, clientes, carrinho, checkout, pagamento)
│   ├── models.py             # Modelos SQLAlchemy (espelham sql/schema.sql)
│   ├── seed.py               # Popula o banco com dados de demonstração
│   └── requirements.txt
├── sql/
│   ├── schema.sql            # Criação de todas as tabelas, chaves e índices
│   └── seed.sql               # Dados de exemplo (livros, categorias, faixas etárias)
├── frontend/
│   ├── index.html             # Site (home, catálogo, cadastro, carrinho, checkout)
│   ├── style.css              # Identidade visual e responsividade
│   └── script.js               # Interatividade: filtros, modal de resumo, carrinho, pagamento
└── README.md
```

## Como o site atende ao briefing

| Pedido | Onde está |
|---|---|
| Livros em alta na home | Seção "Livros em alta" em `index.html` / `renderHome()` em `script.js` |
| Catálogo por tipo e faixa etária | Filtros por categoria e faixa etária em `view-catalogo` |
| Resumo do livro no catálogo | Modal que abre ao clicar em qualquer capa (`abrirModalLivro`) |
| Carrinho de compras | Gaveta lateral (`cartDrawer`), acessível pelo ícone no topo |
| Forma de pagamento | Tela de checkout dentro do carrinho, com cartão de crédito/débito, Pix e boleto |
| Cadastro de cliente | Aba "Minha Conta", com criação de conta e login |
| Comprar **ou** alugar | Cada livro elegível mostra os dois botões no modal de resumo, com seletor de dias de aluguel |
| Responsivo web e mobile | Layout em grid que se adapta em breakpoints de 860px e 640px (menu vira hambúrguer, gaveta ocupa a tela toda, grade de livros reflui) |

## Rodando o frontend (demonstração)

O site funciona sozinho, sem precisar do backend, usando dados de exemplo embutidos em `frontend/script.js` (os mesmos 8 livros do `sql/seed.sql`). Basta abrir `frontend/index.html` no navegador — funciona tanto no desktop quanto no celular.

## Rodando o backend (API real)

```bash
cd python
pip install -r requirements.txt
python seed.py      # cria o banco sqlite local e popula com os livros de exemplo
python app.py        # sobe a API em http://localhost:5000
```

Principais endpoints:

- `GET  /api/livros?categoria=Fantasia&faixa_etaria=Juvenil (9-13)&em_alta=true` — catálogo com filtros
- `GET  /api/livros/<id>` — detalhe/resumo de um livro
- `POST /api/clientes` — cadastro de cliente
- `POST /api/login` — login
- `GET  /api/carrinho/<id_cliente>` / `POST /api/carrinho` / `DELETE /api/carrinho/<id_item>`
- `POST /api/checkout` — fecha o pedido, gera aluguel(is) quando aplicável e processa o pagamento

Para conectar o site real à API, defina `API_BASE_URL` no topo de `frontend/script.js` e troque as chamadas marcadas com o comentário `INTEGRAÇÃO API` por `fetch()` para os endpoints acima.

## Banco de dados

O modelo (ver `der/DER.md`) foi pensado para separar claramente:

- **Catálogo**: `livro`, `categoria`, `faixa_etaria`, `autor`, `editora`, `estoque`.
- **Cliente**: `cliente`, `endereco`.
- **Fluxo de compra**: `carrinho_item` → `pedido` → `pedido_item` → `pagamento`.
- **Fluxo de aluguel**: `aluguel`, que guarda início, prazo previsto e devolução real — sem duplicar a estrutura de venda, já que o mesmo `pedido_item` cobre os dois casos através do campo `tipo_operacao`.

Para subir o schema em PostgreSQL/MySQL:

```bash
psql -d construindo_o_saber -f sql/schema.sql
psql -d construindo_o_saber -f sql/seed.sql
```

## Sobre os números do catálogo

O selo "Em alta" na home não é um cálculo estatístico complexo: é simplesmente o grupo de livros com mais vendas e aluguéis nos últimos dias (`qtd_vendida` em `livro`). Na prática, quanto mais um título está sendo comprado/alugado agora, maior a chance de aparecer em destaque — sem nenhuma fórmula que precise de explicação técnica para o time de negócio.

## Critério de sucesso

Um leitor deve conseguir, sem instruções adicionais:
1. Abrir o site e ver os livros em alta na home.
2. Ir ao catálogo, filtrar por tipo de livro e faixa etária.
3. Clicar em um livro e ler o resumo.
4. Escolher comprar ou alugar, adicionar ao carrinho.
5. Repetir para outros livros.
6. Abrir o carrinho, escolher forma de pagamento e confirmar a compra.

Todo esse fluxo funciona de ponta a ponta em `frontend/index.html`, sem necessidade de configurar o backend.

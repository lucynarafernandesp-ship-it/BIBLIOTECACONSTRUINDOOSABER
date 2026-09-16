"""
Construindo o Saber — API Backend (Flask)
------------------------------------------
Expõe o catálogo de livros, cadastro/login de clientes, carrinho de
compras/aluguel, fechamento de pedido e pagamento.

Rodar localmente:
    pip install -r requirements.txt
    python app.py
A API sobe em http://localhost:5000 e o frontend (pasta ../frontend)
consome estes endpoints via fetch().
"""
from datetime import datetime, timedelta
from decimal import Decimal

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

from models import (
    db, Cliente, Categoria, FaixaEtaria, Livro, Estoque,
    CarrinhoItem, Pedido, PedidoItem, Aluguel, FormaPagamento, Pagamento
)

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///construindo_o_saber.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app)  # libera o frontend (web/mobile) para consumir a API
db.init_app(app)


# ---------------------------------------------------------------
# CATÁLOGO
# ---------------------------------------------------------------
@app.get("/api/livros")
def listar_livros():
    """Catálogo com filtros opcionais por categoria, faixa etária e busca por título."""
    query = Livro.query
    categoria = request.args.get("categoria")
    faixa = request.args.get("faixa_etaria")
    busca = request.args.get("q")
    em_alta = request.args.get("em_alta")

    if categoria:
        query = query.join(Categoria).filter(Categoria.nome == categoria)
    if faixa:
        query = query.join(FaixaEtaria).filter(FaixaEtaria.nome == faixa)
    if busca:
        query = query.filter(Livro.titulo.ilike(f"%{busca}%"))
    if em_alta == "true":
        query = query.filter(Livro.em_alta.is_(True))

    livros = query.all()
    return jsonify([l.to_dict() for l in livros])


@app.get("/api/livros/<int:id_livro>")
def detalhe_livro(id_livro):
    """Detalhe/resumo de um livro específico, usado no modal do catálogo."""
    livro = Livro.query.get_or_404(id_livro)
    return jsonify(livro.to_dict())


@app.get("/api/categorias")
def listar_categorias():
    return jsonify([{"id": c.id_categoria, "nome": c.nome} for c in Categoria.query.all()])


@app.get("/api/faixas-etarias")
def listar_faixas():
    return jsonify([{"id": f.id_faixa, "nome": f.nome} for f in FaixaEtaria.query.all()])


# ---------------------------------------------------------------
# CLIENTES (cadastro / login)
# ---------------------------------------------------------------
@app.post("/api/clientes")
def cadastrar_cliente():
    dados = request.get_json(force=True)
    obrigatorios = ["nome", "email", "senha"]
    faltando = [c for c in obrigatorios if not dados.get(c)]
    if faltando:
        return jsonify({"erro": f"Campos obrigatórios ausentes: {', '.join(faltando)}"}), 400

    if Cliente.query.filter_by(email=dados["email"]).first():
        return jsonify({"erro": "Já existe uma conta com este e-mail."}), 409

    cliente = Cliente(
        nome=dados["nome"],
        email=dados["email"],
        senha_hash=generate_password_hash(dados["senha"]),
        cpf=dados.get("cpf"),
        telefone=dados.get("telefone"),
    )
    db.session.add(cliente)
    db.session.commit()
    return jsonify(cliente.to_dict()), 201


@app.post("/api/login")
def login():
    dados = request.get_json(force=True)
    cliente = Cliente.query.filter_by(email=dados.get("email")).first()
    if not cliente or not check_password_hash(cliente.senha_hash, dados.get("senha", "")):
        return jsonify({"erro": "E-mail ou senha inválidos."}), 401
    return jsonify(cliente.to_dict())


# ---------------------------------------------------------------
# CARRINHO
# ---------------------------------------------------------------
@app.get("/api/carrinho/<int:id_cliente>")
def ver_carrinho(id_cliente):
    itens = CarrinhoItem.query.filter_by(id_cliente=id_cliente).all()
    resultado = []
    for item in itens:
        preco = (
            float(item.livro.preco_venda) if item.tipo_operacao == "venda"
            else float(item.livro.preco_aluguel_dia) * (item.dias_aluguel or 1)
        )
        resultado.append({
            "id_item": item.id_item,
            "livro": item.livro.to_dict(),
            "quantidade": item.quantidade,
            "tipo_operacao": item.tipo_operacao,
            "dias_aluguel": item.dias_aluguel,
            "subtotal": round(preco * item.quantidade, 2),
        })
    return jsonify(resultado)


@app.post("/api/carrinho")
def adicionar_ao_carrinho():
    dados = request.get_json(force=True)
    item = CarrinhoItem(
        id_cliente=dados["id_cliente"],
        id_livro=dados["id_livro"],
        quantidade=dados.get("quantidade", 1),
        tipo_operacao=dados.get("tipo_operacao", "venda"),
        dias_aluguel=dados.get("dias_aluguel"),
    )
    db.session.add(item)
    db.session.commit()
    return jsonify({"mensagem": "Item adicionado ao carrinho.", "id_item": item.id_item}), 201


@app.delete("/api/carrinho/<int:id_item>")
def remover_do_carrinho(id_item):
    item = CarrinhoItem.query.get_or_404(id_item)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"mensagem": "Item removido do carrinho."})


# ---------------------------------------------------------------
# CHECKOUT / PAGAMENTO
# ---------------------------------------------------------------
@app.post("/api/checkout")
def finalizar_pedido():
    """
    Fecha o pedido a partir do carrinho do cliente, gera os itens do
    pedido, cria os registros de aluguel quando aplicável e processa
    o pagamento (simulado).
    body: { "id_cliente": 1, "forma_pagamento": "pix" }
    """
    dados = request.get_json(force=True)
    id_cliente = dados["id_cliente"]
    nome_forma = dados.get("forma_pagamento", "pix")

    itens_carrinho = CarrinhoItem.query.filter_by(id_cliente=id_cliente).all()
    if not itens_carrinho:
        return jsonify({"erro": "Carrinho vazio."}), 400

    valor_total = Decimal("0")
    pedido = Pedido(id_cliente=id_cliente, status="pendente", valor_total=0)
    db.session.add(pedido)
    db.session.flush()  # garante id_pedido antes de criar os itens

    for item in itens_carrinho:
        livro = item.livro
        if item.tipo_operacao == "venda":
            preco_unit = livro.preco_venda
        else:
            preco_unit = livro.preco_aluguel_dia * (item.dias_aluguel or 1)

        pedido_item = PedidoItem(
            id_pedido=pedido.id_pedido,
            id_livro=livro.id_livro,
            quantidade=item.quantidade,
            tipo_operacao=item.tipo_operacao,
            dias_aluguel=item.dias_aluguel,
            preco_unitario=preco_unit,
        )
        db.session.add(pedido_item)
        db.session.flush()

        if item.tipo_operacao == "aluguel":
            hoje = datetime.utcnow().date()
            db.session.add(Aluguel(
                id_cliente=id_cliente,
                id_livro=livro.id_livro,
                id_pedido_item=pedido_item.id_pedido_item,
                data_inicio=hoje,
                data_prevista_devolucao=hoje + timedelta(days=item.dias_aluguel or 7),
                status="ativo",
            ))

        valor_total += preco_unit * item.quantidade
        livro.qtd_vendida = (livro.qtd_vendida or 0) + item.quantidade
        db.session.delete(item)

    pedido.valor_total = valor_total

    forma = FormaPagamento.query.filter_by(nome=nome_forma).first()
    if not forma:
        forma = FormaPagamento(nome=nome_forma)
        db.session.add(forma)
        db.session.flush()

    pagamento = Pagamento(
        id_pedido=pedido.id_pedido,
        id_forma=forma.id_forma,
        valor=valor_total,
        status="aprovado",  # simulação: aprovação imediata
        processado_em=datetime.utcnow(),
    )
    pedido.status = "pago"
    db.session.add(pagamento)
    db.session.commit()

    return jsonify({
        "mensagem": "Compra confirmada com sucesso!",
        "id_pedido": pedido.id_pedido,
        "valor_total": float(valor_total),
        "status_pagamento": pagamento.status,
    }), 201


@app.get("/api/pedidos/<int:id_cliente>")
def listar_pedidos(id_cliente):
    pedidos = Pedido.query.filter_by(id_cliente=id_cliente).order_by(Pedido.criado_em.desc()).all()
    return jsonify([{
        "id_pedido": p.id_pedido,
        "criado_em": p.criado_em.isoformat(),
        "status": p.status,
        "valor_total": float(p.valor_total),
    } for p in pedidos])


# ---------------------------------------------------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)

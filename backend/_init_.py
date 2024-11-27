import pyodbc
from flask import Flask, request, jsonify
from flask_cors import CORS     


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"]) 

def get_db_connection():
    conn = pyodbc.connect(
        r'DRIVER={ODBC Driver 17 for SQL Server};'
        r'SERVER=localhost;'  # Nome do servidor
        r'DATABASE=Login;'  # Nome do banco de dados
        r'Trusted_Connection=yes;'  # Usando autenticação do Windows
    )
    return conn

@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()

    full_name = data.get('fullName')
    user_name = data.get('userName')
    email = data.get('email')
    password = data.get('password')

    # Verificação de campos obrigatórios
    if not all([full_name, user_name, email, password]):
        return jsonify({"error": "Preencha todos os campos"}), 400

    # Verificar se o usuário já existe
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    
    if user:
        return jsonify({"error": "Usuário já existe"}), 400

    # Inserir o novo usuário
    cursor.execute(
        "INSERT INTO users (full_name, user_name, email, password) VALUES (?, ?, ?, ?)",
        (full_name, user_name, email, password)
    )
    conn.commit()
    
    # Confirmar inserção e fechar a conexão
    cursor.close()
    conn.close()
    
    return jsonify({"message": "Usuário registrado com sucesso!"}), 201

@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({"error": "Email e senha são obrigatórios"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Verificar se o usuário existe no banco de dados
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()

    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 400
    
    # Verificar se a senha está correta (comparando diretamente - idealmente deveria ser criptografada)
    if user[4] != password:  # Assumindo que a senha está na coluna 4
        return jsonify({"error": "Senha incorreta"}), 400

    cursor.close()
    conn.close()

    return jsonify({"message": "Login bem-sucedido!"}), 200





if __name__ == '__main__':
    app.run(debug=True)

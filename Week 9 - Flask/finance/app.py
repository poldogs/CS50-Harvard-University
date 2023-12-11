import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session, url_for
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd


# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    # Query database for user's transactions
    rows = db.execute("SELECT symbol, SUM(shares) as total_shares FROM transactions WHERE user_id = ? GROUP BY symbol HAVING total_shares > 0", session["user_id"])

    # Initialize variable for total value of stocks
    total_value = 0

    # For each stock, lookup current price and calculate total value
    for row in rows:
        stock = lookup(row["symbol"])
        row["name"] = stock["name"]
        row["price"] = usd(stock["price"])
        row["total"] = usd(stock["price"] * row["total_shares"])
        total_value += stock["price"] * row["total_shares"]

    # Query database for user's cash balance
    rows_cash = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])
    cash = rows_cash[0]["cash"]

    # Calculate grand total
    grand_total = total_value + cash

    # Render index template
    return render_template("index.html", stocks=rows, cash=usd(cash), total=usd(grand_total))


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    if request.method == "POST":
        symbol = request.form.get("symbol")
        shares = request.form.get("shares")

        if not symbol:
            return apology("must provide symbol", 403)

        if not shares or not shares.isdigit() or int(shares) <= 0:
            return apology("must provide a positive integer for shares", 403)

        quote = lookup(symbol)
        if quote is None:
            return apology("invalid symbol", 403)

        cost = quote['price'] * int(shares)

        conn = sqlite3.connect('finance.db')
        db = conn.cursor()
        db.execute("SELECT cash FROM users WHERE id = ?", (session["user_id"],))
        cash = db.fetchone()[0]

        if cash < cost:
            return apology("can't afford", 403)

        db.execute("UPDATE users SET cash = cash - ? WHERE id = ?", (cost, session["user_id"]))
        db.execute("INSERT INTO transactions (user_id, symbol, shares, price) VALUES (?, ?, ?, ?)",
                   (session["user_id"], symbol, shares, quote['price']))
        conn.commit()

        return redirect(url_for("index"))

    else:
        return render_template("buy.html")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    conn = sqlite3.connect('finance.db')
    db = conn.cursor()
    db.execute("SELECT symbol, shares, price, timestamp FROM transactions WHERE user_id = ? ORDER BY timestamp DESC", (session["user_id"],))
    transactions = db.fetchall()
    return render_template("history.html", transactions=transactions)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""
    if request.method == "POST":
        symbol = request.form.get("symbol")
        if not symbol:
            return apology("must provide symbol", 403)

        quote = lookup(symbol)
        if quote is None:
            return apology("invalid symbol", 403)

        return render_template("quoted.html", quote=quote)

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("quote.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        # Ensure username was submitted
        if not username:
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not password:
            return apology("must provide password", 403)

        # Ensure password confirmation matches
        elif password != confirmation:
            return apology("passwords don't match", 403)

        # Hash the user's password
        hashed_password = generate_password_hash(password)

        # Insert the new user into the users table
        conn = sqlite3.connect('finance.db')
        db = conn.cursor()
        db.execute("INSERT INTO users (username, hash) VALUES (?, ?)", (username, hashed_password))
        conn.commit()

        # Redirect user to login page
        return redirect(url_for("login"))

    else:
        return render_template("register.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    if request.method == "POST":
        symbol = request.form.get("symbol")
        shares = request.form.get("shares")
        if not symbol:
            return apology("must provide symbol", 403)
        if not shares or not shares.isdigit() or int(shares) <= 0:
            return apology("must provide a positive integer for shares", 403)
        shares = int(shares)
        conn = sqlite3.connect('finance.db')
        db = conn.cursor()
        db.execute("SELECT SUM(shares) as total_shares FROM transactions WHERE user_id = ? AND symbol = ? GROUP BY symbol", (session["user_id"], symbol))
        total_shares = db.fetchone()
        if total_shares is None or total_shares[0] < shares:
            return apology("not enough shares", 403)
        quote = lookup(symbol)
        if quote is None:
            return apology("invalid symbol", 403)
        revenue = quote['price'] * shares
        db.execute("UPDATE users SET cash = cash + ? WHERE id = ?", (revenue, session["user_id"]))
        db.execute("INSERT INTO transactions (user_id, symbol, shares, price) VALUES (?, ?, ?, ?)",
                   (session["user_id"], symbol, -shares, quote['price']))
        conn.commit()
        return redirect(url_for("index"))
    else:
        db.execute("SELECT DISTINCT symbol FROM transactions WHERE user_id = ?", (session["user_id"],))
        symbols = db.fetchall()
        return render_template("sell.html", symbols=symbols)

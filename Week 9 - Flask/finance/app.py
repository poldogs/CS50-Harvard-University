import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session, url_for
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

import sqlite3

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
        # Retrieve form data
        symbol = request.form.get("symbol")
        shares = request.form.get("shares")

        # Validate symbol input
        if not symbol:
            return apology("must provide symbol", 400)

        # Validate shares input
        if not shares or not shares.isdigit() or int(shares) <= 0:
            return apology("must provide a positive integer for shares", 400)

        # Lookup stock information
        quote = lookup(symbol)
        if quote is None:
            return apology("invalid symbol", 400)

        # Calculate cost of the purchase
        cost = quote['price'] * int(shares)

        # Connect to database
        conn = sqlite3.connect('finance.db')
        db = conn.cursor()

        # Retrieve user's cash balance
        db.execute("SELECT cash FROM users WHERE id = ?", (session["user_id"],))
        cash = db.fetchone()[0]

        # Check if user can afford the purchase
        if cash < cost:
            return apology("can't afford", 400)

        # Update user's cash balance and record the transaction
        db.execute("UPDATE users SET cash = cash - ? WHERE id = ?", (cost, session["user_id"]))
        db.execute("INSERT INTO transactions (user_id, symbol, shares, price, type) VALUES (?, ?, ?, ?, ?)",
                   (session["user_id"], symbol, shares, quote['price'], 'buy'))

        # Commit changes and redirect to home page
        conn.commit()
        return redirect(url_for("index"))
    else:
        return render_template("buy.html")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    # Query database for user's transaction history
    rows = db.execute("SELECT symbol, shares, price, timestamp, type FROM transactions WHERE user_id = ? ORDER BY timestamp DESC", session["user_id"])

    # Render history template
    return render_template("history.html", transactions=rows)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 400)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 400)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 400)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

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
    # Handle POST request for getting stock quote
    if request.method == "POST":
        # Retrieve symbol from form
        symbol = request.form.get("symbol")

        # Validate symbol input
        if not symbol:
            return apology("must provide symbol", 400)

        # Lookup stock information
        quote = lookup(symbol)
        if quote is None:
            return apology("invalid symbol", 400)

        # Render quoted template with stock information
        return render_template("quoted.html", quote=quote)

    else:
        return render_template("quote.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    # Handle POST request for user registration
    if request.method == "POST":
        # Retrieve registration information
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        # Validate username input
        if not username:
            return apology("must provide username", 400)

        # Validate password input
        elif not password:
            return apology("must provide password", 400)

        # Ensure password confirmation was submitted
        elif not confirmation:
            return apology("must provide password confirmation", 400)

        # Validate password confirmation
        elif password != confirmation:
            return apology("passwords don't match", 400)

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
    # Handle POST request for selling shares
    if request.method == "POST":
        # Ensure symbol was submitted
        symbol = request.form.get("symbol")
        if not symbol:
            return apology("must provide symbol", 400)

        # Ensure shares was submitted
        try:
            shares = int(request.form.get("shares"))
        except ValueError:
            return apology("shares must be a positive integer", 400)

        # Check if the user owns the stock and has enough shares to sell
        rows = db.execute("SELECT SUM(shares) as total_shares FROM transactions WHERE user_id = :user_id AND symbol = :symbol GROUP BY symbol",
                          user_id=session["user_id"], symbol=symbol)
        if len(rows) != 1 or rows[0]["total_shares"] < shares:
            return apology("not enough shares", 403)

        # Process the sale of the stock
        price = lookup(symbol)["price"]
        total = price * shares
        db.execute("INSERT INTO transactions (user_id, symbol, shares, price, type) VALUES (:user_id, :symbol, :shares, :price, :type)",
                   user_id=session["user_id"], symbol=symbol, shares=-shares, price=price, type='sell')
        db.execute("UPDATE users SET cash = cash + :total WHERE id = :id", total=total, id=session["user_id"])

        # Redirect user to home page
        return redirect("/")

    else:
        # Retrieve list of owned symbols for selling
        rows = db.execute("SELECT DISTINCT symbol FROM transactions WHERE user_id = :user_id", user_id=session["user_id"])
        symbols = [row["symbol"] for row in rows]
        return render_template("sell.html", symbols=symbols)

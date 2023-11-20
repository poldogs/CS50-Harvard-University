#import cs50
def get_float(prompt):
    while True:
        value = input(prompt)
        try:
            value = float(value)
            return value
        except ValueError:
            print("Invalid input. Please enter a valid float value.")

# Get the amount of change owed from the user
change = get_float("Change owed: ")

# Ensure the amount of change is non-negative
while change < 0:
    change = get_float("Change owed: ")

# Convert dollars to cents
change_cents = int(change * 100)

# Initialize the number of coins
quarters = 0
dimes = 0
nickels = 0
pennies = 0

# Calculate the number of quarters
quarters = change_cents // 25
change_cents %= 25

# Calculate the number of dimes
dimes = change_cents // 10
change_cents %= 10

# Calculate the number of nickels
nickels = change_cents // 5
change_cents %= 5

# Calculate the number of pennies
pennies = change_cents

# Print the total number of coins
print(quarters + dimes + nickels + pennies)

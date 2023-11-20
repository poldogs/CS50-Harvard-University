def get_positive_int(prompt):
    while True:
        try:
            number = int(input(prompt))
            if number > 0 and number <= 8:
                return number
            else:
                print("That is not a valid number. Please enter a positive integer between 1 and 8 (inclusive).")
        except ValueError:
            print("That is not a valid number. Please enter a positive integer between 1 and 8 (inclusive).")

height = get_positive_int("Height: ")

for row in range(1, height + 1):
    for space in range(height - row):
        print(" ", end="")
    for block in range(row):
        print("#", end="")
    print()

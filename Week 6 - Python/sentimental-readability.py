import cs50

def main():
    # Get the user's input
    text = cs50.get_string("Text: ")

    # Count the number of letters, words, and sentences in the text
    letter_count = 0
    word_count = 0
    sentence_count = 1

    for char in text:
        if char.isalpha():
            letter_count += 1

        if char.isspace():
            word_count += 1

        if char in {".", "!", "?"}:
            sentence_count += 1

    # Compute the Coleman-Liau index
    L = (letter_count / word_count) * 100
    S = (sentence_count / word_count) * 100
    index = 0.0588 * L - 0.296 * S - 15.8

    # Round the index to the nearest integer
    grade = int(round(index))

    # Print the grade level
    if grade >= 16:
        print("Grade 16+")
    elif grade < 1:
        print("Before Grade 1")
    else:
        print(f"Grade {grade}")

if __name__ == "__main__":
    main()

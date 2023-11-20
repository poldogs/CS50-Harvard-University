import csv
import sys

def main():
    # Check for command-line usage
    if len(sys.argv) != 3:
        print("Usage: python dna.py <CSV filename> <DNA filename>")
        sys.exit(1)

    # Read database file into a variable
    csv_filename = sys.argv[1]
    with open(csv_filename, newline='') as csvfile:
        csv_reader = csv.DictReader(csvfile)
        database = [row for row in csv_reader]

    # Read DNA sequence file into a variable
    dna_filename = sys.argv[2]
    with open(dna_filename, 'r') as dna_file:
        dna_sequence = dna_file.read()

    # Find longest match of each STR in DNA sequence
    for str_column in database[0].keys()[1:]:  # Assuming the first row contains column names
        str_count = longest_match(dna_sequence, str_column)
        print(f'{str_column}: {str_count}')

    # Check database for matching profiles
    matching_individual = None
    for person in database:
        if all(int(person[str_column]) == longest_match(dna_sequence, str_column) for str_column in database[0].keys()[1:]):
            matching_individual = person['name']
            break

    # Print the result
    if matching_individual:
        print(matching_individual)
    else:
        print("No match")

if __name__ == "__main__":
    main()

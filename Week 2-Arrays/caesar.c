#include <cs50.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int main(int argc, string argv[])
{
    // Check for the correct number of command-line arguments
    if (argc != 2)
    {
        printf("Usage: ./caesar key\n");
        return 1;
    }

    // Convert the command-line argument to an integer
    int k = atoi(argv[1]);

    // Check if the key is a non-negative integer
    if (k < 0)
    {
        printf("Key must be a non-negative integer.\n");
        return 1;
    }

    string plaintext = get_string("plaintext: ");
    printf("ciphertext: ");

    // Iterate over each character in the plaintext
    for (int i = 0, n = strlen(plaintext); i < n; i++)
    {
        char c = plaintext[i];

        if (isalpha(c))
        {
            char base = isupper(c) ? 'A' : 'a';
            // Apply the Caesar cipher to alphabetical characters
            char encrypted = (c - base + k) % 26 + base;
            printf("%c", encrypted);
        }
        else
        {
            // Leave non-alphabetical characters unchanged
            printf("%c", c);
        }
    }

    printf("\n");
    return 0;
}

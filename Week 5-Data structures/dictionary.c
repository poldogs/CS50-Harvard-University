#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include "dictionary.h"

#define LENGTH 45

typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
} node;

node *table[N];

// Loads the dictionary into a hash table
bool load(const char *dictionary)
{
    FILE *file = fopen(dictionary, "r");
    if (file == NULL)
    {
        return false;
    }

    char word[LENGTH + 1];
    while (fscanf(file, "%s", word) != EOF)
    {
        // Hash the word to determine its index in the table
        unsigned int index = hash(word);
        // Create a new node for the word
        node *new_node = malloc(sizeof(node));
        if (new_node == NULL)
        {
            fclose(file);
            return false;
        }

        // Copy the word into the new node
        strcpy(new_node->word, word);
        new_node->next = NULL;

        // Add the new node to the appropriate index in the hash table
        if (table[index] == NULL)
        {
            table[index] = new_node;
        }
        else
        {
            new_node->next = table[index];
            table[index] = new_node;
        }
    }

    fclose(file);
    return true;
}

// Hashes a word to determine its index in the hash table
unsigned int hash(const char *word)
{
    // Simple hash function that sums the ASCII values of the characters in the word
    unsigned int hash_value = 0;
    for (int i = 0; word[i] != '\0'; i++)
    {
        hash_value += word[i];
    }

    return hash_value % N;
}

// Returns the number of words loaded in the dictionary
unsigned int size(void)
{
    unsigned int count = 0;
    for (int i = 0; i < N; i++)
    {
        node *current = table[i];
        while (current != NULL)
        {
            count++;
            current = current->next;
        }
    }

    return count;
}

// Checks if a word is in the dictionary
bool check(const char *word)
{
    // Convert the word to lowercase for case-insensitive comparison
    char lowercase_word[LENGTH + 1];
    strcpy(lowercase_word, word);
    for (int i = 0; lowercase_word[i] != '\0'; i++)
    {
        lowercase_word[i] = tolower(lowercase_word[i]);
    }

    unsigned int index = hash(lowercase_word);
    node *current = table[index];
    while (current != NULL)
    {
        if (strcmp(current->word, lowercase_word) == 0)
        {
            return true;
        }

        current = current->next;
    }

    return false;
}

// Unloads the dictionary and frees memory
bool unload(void)
{
    for (int i = 0; i < N; i++)
    {
        node *current = table[i];
        node *next_node;
        while (current != NULL)
        {
            next_node = current->next;
            free(current);
            current = next_node;
        }

        table[i] = NULL;
    }

    return true;
}

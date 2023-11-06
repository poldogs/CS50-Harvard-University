#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

#define BLOCK_SIZE 512

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        fprintf(stderr, "Usage: %s IMAGE\n", argv[0]);
        return 1;
    }

    // Open the forensic image for reading
    FILE *raw_file = fopen(argv[1], "r");
    if (raw_file == NULL)
    {
        fprintf(stderr, "Could not open the forensic image for reading.\n");
        return 1;
    }

    uint8_t buffer[BLOCK_SIZE];

    FILE *output_file = NULL;
    int file_count = 0;

    while (fread(buffer, 1, BLOCK_SIZE, raw_file) == BLOCK_SIZE)
    {
        // Check if the block is the start of a new JPEG
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            if (output_file != NULL)
            {
                fclose(output_file);
            }

            // Create a new JPEG file with a unique name
            char filename[8];
            sprintf(filename, "%03d.jpg", file_count);
            output_file = fopen(filename, "w");
            file_count++;
        }

        if (output_file != NULL)
        {
            fwrite(buffer, 1, BLOCK_SIZE, output_file);
        }
    }

    if (output_file != NULL)
    {
        fclose(output_file);
    }

    fclose(raw_file);

    return 0;
}

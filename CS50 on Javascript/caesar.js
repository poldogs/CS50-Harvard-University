/*
Caesar’s algorithm (i.e., cipher) encrypts messages by “rotating” each letter by 
positions. More formally, if is some plaintext (i.e., an unencrypted message), is the character in , and 
is a secret key (i.e., a non-negative integer), then each letter, , in the ciphertext, , is computed as wherein 
here means “remainder when dividing by 26.” This formula perhaps makes the cipher seem more complicated 
than it is, but it’s really just a concise way of expressing the algorithm precisely. */

const caesar = (message = "", key = 0) => {
    const shift = (char, base, key) => String.fromCharCode(((char.charCodeAt() - base + key) % 26) + base);

    const caesarCipher = (char) => {
        if (/[A-Z]/.test(char)) return shift(char, 65, key);
        if (/[a-z]/.test(char)) return shift(char, 97, key);
        return char;
    };

    const messageCyphered = message.split("").map(caesarCipher).join("");

    console.log(messageCyphered);
}

caesar("Hello", 1);

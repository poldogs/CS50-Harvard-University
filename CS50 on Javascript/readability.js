/*A number of “readability tests” have been developed over the years 
that define formulas for computing the reading level of a text. 
One such readability test is the Coleman-Liau index. The Coleman-Liau 
index of a text is designed to output that (U.S.) grade level that is 
needed to understand some text. The formula is

index = 0.0588 * L - 0.296 * S - 15.8

where L is the average number of letters per 100 words in the text, and S
 is the average number of sentences per 100 words in the text.
 Let’s write a program called readability that takes a text and determines
  its reading level.*/

const readability = (text = "") => {
    const wordArray = text.split(/\s+/).filter(word => word.length > 0);
    const sentenceArray = text.split(/[.!?;]/).filter(sentence => sentence.length > 0);

    const words = wordArray.length;
    const sentences = sentenceArray.length;
    const letters = text.replace(/[^a-zA-Z]/g, "").length;

    const index = 0.0588 * (letters / words * 100) - 0.296 * (sentences / words * 100) - 15.8;
    console.log(Math.round(index));
}

readability("Harry Potter was a highly unusual boy in many ways. For one thing, he hated the summer holidays more than any other time of year. For another, he really wanted to do his homework, but was forced to do it in secret, in the dead of the night. And he also happened to be a wizard.")
readability("When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, and Jem's fears of never being able to play football were assuaged, he was seldom self-conscious about his injury. His left arm was somewhat shorter than his right; when he stood or walked, the back of his hand was at right angles to his body, his thumb parallel to his thigh.")
readability("It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.")
function toggleCardDetails(titleElement) {
    var cardBody = titleElement.parentNode;

    var cardText = cardBody.querySelector('.card-text');

    if (cardText.classList.contains('hidden')) {
        cardText.classList.remove('hidden');
    } else {
        cardText.classList.add('hidden');
    }
}
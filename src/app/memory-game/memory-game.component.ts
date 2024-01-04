// memory-game.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Card {
  imagePath: string;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {
  numCards!: number;
  cards: Card[] = [];
  moves: number = 0;
  misses: number = 0;


  flippedCards: number[] = [];
  matchedPairs: Card[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.numCards = parseInt(this.route.snapshot.paramMap.get('numCards') || '12', 10);
    console.log(this.numCards);

    this.initializeCards();
    this.shuffleCards();
  }

  initializeCards() {
    // Generate cards based on numCards
    const availableImages = ['./assets/images/img1.png', './assets/images/img2.png', './assets/images/img3.png', './assets/images/img4.png', './assets/images/img5.png', './assets/images/img6.png'];

    for (let i = 0; i < this.numCards / 2; i++) {
      const image = availableImages[i];
      this.cards.push({ imagePath: image, isFlipped: false, isMatched: false });
      this.cards.push({ imagePath: image, isFlipped: false, isMatched: false });

    }
  }

  shuffleCards() {
    this.cards = this.shuffle([...this.cards]);
  }

  flipCard(index: number) {
    if (!this.cards[index].isFlipped && this.flippedCards.length < 2) {
      this.cards[index].isFlipped = true;
      this.flippedCards.push(index);

      if (this.flippedCards.length === 2) {
        setTimeout(() => this.checkForMatch(), 1000);
        this.moves++;
      }
    }
  }

  checkForMatch() {
    const [index1, index2] = this.flippedCards;

    if (this.cards[index1].imagePath === this.cards[index2].imagePath) {
      this.matchedPairs.push(this.cards[index1]);
      this.cards[index1].isMatched = true;
      this.cards[index2].isMatched = true;
    } else {
      this.cards[index1].isFlipped = false;
      this.cards[index2].isFlipped = false;
      this.misses++;
    }

    this.flippedCards = [];

    if (this.matchedPairs.length === this.numCards / 2) {
      alert('Congratulations! You matched all pairs.');
    }
  }

  private shuffle(array: any[]): any[] {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  resetGame() {
    this.moves = 0;
    this.misses = 0;
    this.shuffleCards();
    this.resetCards();
  }
  private resetCards() {
    this.cards.forEach(card => (card.isFlipped = false));
    this.flippedCards = [];
    this.matchedPairs = [];
  }
}

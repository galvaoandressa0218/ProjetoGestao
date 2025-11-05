import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Review, NewReviewData } from '../model/review.model';

// Usando os dados mock da sua ReviewDetailPage.tsx como fonte principal
const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    titulo: "Introduction to React Hooks",
    workAuthor: "Dan Abramov",
    reviewAuthor: "Sarah Chen",
    knowledgeArea: "Programming",
    conteudo: "An excellent guide to understanding React Hooks. The examples are clear and the explanations are thorough. This resource has helped me significantly improve my React development skills. The author does a great job of breaking down complex concepts into digestible pieces. I particularly appreciated the practical examples and the emphasis on best practices. Whether you're new to React or looking to level up your skills, this is an invaluable resource."
  },
  {
    id: 2,
    titulo: "Machine Learning Fundamentals",
    workAuthor: "Andrew Ng",
    reviewAuthor: "Michael Torres",
    knowledgeArea: "AI",
    conteudo: "Comprehensive overview of ML concepts. Great for beginners and intermediate learners alike. The course structure is well-organized and builds knowledge progressively. The mathematical foundations are explained clearly without being overly complex. Highly recommended for anyone looking to break into the field of machine learning."
  },
  // ... (restante dos dados mock de ReviewDetailPage)
  {
    id: 3,
    titulo: "Cybersecurity Best Practices",
    workAuthor: "Bruce Schneier",
    reviewAuthor: "Emily Rodriguez",
    knowledgeArea: "Security",
    conteudo: "Essential reading for anyone working with sensitive data. Practical advice with real-world examples. The book covers a wide range of security topics and provides actionable recommendations. The author's expertise shines through in every chapter."
  },
  {
    id: 4,
    titulo: "Clean Code Principles",
    workAuthor: "Robert C. Martin",
    reviewAuthor: "David Kim",
    knowledgeArea: "Programming",
    conteudo: "A must-read for software developers. The principles outlined here have transformed how I write code. The examples are practical and immediately applicable. This book has made me a better programmer and team member."
  }
];

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  // Usamos um BehaviorSubject para que a lista seja reativa
  private _reviews$ = new BehaviorSubject<Review[]>(MOCK_REVIEWS);

  constructor() { }

  getReviews(): Observable<Review[]> {
    return this._reviews$.asObservable();
  }

  getReviewById(id: number): Observable<Review | undefined> {
    // Encontra o review na lista atual
    return this._reviews$.pipe(
      map(reviews => reviews.find(r => r.id === id))
    );
  }

  addReview(reviewData: NewReviewData): Observable<Review> {
    const currentReviews = this._reviews$.getValue();
    const newId = Math.max(...currentReviews.map(r => r.id)) + 1;
    
    const newReview: Review = {
      id: newId,
      ...reviewData
    };
    
    // Adiciona o novo review no topo da lista e atualiza o Subject
    this._reviews$.next([newReview, ...currentReviews]);
    return of(newReview); // Retorna o review criado
  }

  deleteReview(id: number): Observable<void> {
    const currentReviews = this._reviews$.getValue();
    const updatedReviews = currentReviews.filter(r => r.id !== id);
    this._reviews$.next(updatedReviews);
    alert("Review deleted (demo)");
    return of(undefined);
  }
}
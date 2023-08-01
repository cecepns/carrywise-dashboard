import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { client } from './config/apollo.ts';
import { GlobalStateProvider } from '@/hooks';
import './index.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <GlobalStateProvider>
            <App />
          </GlobalStateProvider>
        </BrowserRouter>
      </Elements>
    </ApolloProvider>
  </React.StrictMode>,
);

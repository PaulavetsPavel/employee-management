import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/global.css';
import Router from './routers/Router.jsx';
import Store from './store/store';

export const store = new Store();

export const Context = createContext({
	store,
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<QueryClientProvider client={queryClient}>
		<Context.Provider
			value={{
				store,
			}}
		>
			<Router />
		</Context.Provider>
	</QueryClientProvider>
);

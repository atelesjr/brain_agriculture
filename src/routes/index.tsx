import { Routes, Route } from 'react-router-dom';
import { Home, Dashboard, NotFound } from '@/pages';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

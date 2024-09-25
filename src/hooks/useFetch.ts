import { useState, useEffect } from 'react';

interface FetchOptions {
	method?: string;
	headers?: HeadersInit;
	body?: BodyInit | null;
}

interface FetchState<T> {
	data: T | null;
	error: string | null;
	loading: boolean;
}

const useFetch = <T>(url: string, options?: FetchOptions): FetchState<T> => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await fetch(url, options);
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				const result = await response.json();
				setData(result);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url, options]);

	return { data, error, loading };
};

export default useFetch;

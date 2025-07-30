export function useAsync(fn, deps = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

const run = useCallback(async () => {
    setLoading(true); 
    setError(null);
    try {
      const result = await fn();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, deps);
  useEffect(() => {
    if (fn) run();
  }, [run]);
  return { data, error, loading, run };
}

function useCases (){
  const { data, loading, error } = useAsync(() => fetchDataFromAPI(), []);
  const { data, error, loading, run } = useAsync();

  useEffect(() => {
    run(() => fetchDataFromAPI());
  }, []);
}
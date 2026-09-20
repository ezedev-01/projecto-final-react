import { useSearchParams } from 'react-router-dom';

export function useContactSearch(contacts) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(query.toLowerCase())
  );

  return {
    query,
    handleSearchChange,
    filteredContacts
  };
}
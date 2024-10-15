import { useState, useEffect } from 'react';

export const useIndexedDB = (storeName, version = 1) => {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initDB = () => {
      const request = indexedDB.open('myQuizes', version);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        }
      };

      request.onsuccess = (event) => {
        setDb(event.target.result);
      };

      request.onerror = (event) => {
        setError(event.target.error);
      };
    };

    initDB();
  }, [storeName, version]);

  // Add item to IndexedDB
  const addItem = async (item) => {
    return new Promise((resolve, reject) => {
      if (db) {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add(item);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      } else {
        reject(new Error('Database not initialized'));
      }
    });
  };

  // Get item by id from IndexedDB
  const getItem = async (id) => {
    return new Promise((resolve, reject) => {
      if (db) {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      } else {
        reject(new Error('Database not initialized'));
      }
    });
  };

  // Get all items from IndexedDB
  const getAllItems = async () => {
    return new Promise((resolve, reject) => {
      if (db) {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      } else {
        reject(new Error('Database not initialized'));
      }
    });
  };

  // Remove item by id from IndexedDB
  const removeItem = async (id) => {
    return new Promise((resolve, reject) => {
      if (db) {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      } else {
        reject(new Error('Database not initialized'));
      }
    });
  };

  return {
    addItem,
    getItem,
    getAllItems,
    removeItem,
    error,
  };
};

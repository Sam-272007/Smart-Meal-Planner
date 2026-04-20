import { createContext, useContext, useState, useEffect } from 'react';
import { auth, isFirebaseConfigured } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut 
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock implementation for demo without Firebase keys
  const mockLogin = async (email, password) => {
    const user = { uid: "mock_uid_123", email };
    localStorage.setItem("mock_user", JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  const mockSignup = async (email, password) => {
    return mockLogin(email, password);
  };

  const mockLogout = async () => {
    localStorage.removeItem("mock_user");
    setCurrentUser(null);
  };

  useEffect(() => {
    if (isFirebaseConfigured) {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // Mock flow
      const stored = localStorage.getItem("mock_user");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    if (isFirebaseConfigured) return signInWithEmailAndPassword(auth, email, password);
    return mockLogin(email, password);
  };

  const signup = (email, password) => {
    if (isFirebaseConfigured) return createUserWithEmailAndPassword(auth, email, password);
    return mockSignup(email, password);
  };

  const logout = () => {
    if (isFirebaseConfigured) return firebaseSignOut(auth);
    return mockLogout();
  };

  const value = {
    currentUser,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

import React, { useState } from 'react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    
    if (!agreeTerms) {
      setError('Você precisa concordar com os termos de uso.');
      return;
    }
    
    // Here you would typically make an API call to register the user
    console.log('Registration attempt with:', { name, email, password });
    
    // For demo purposes, simulate a successful registration
    alert('Cadastro realizado com sucesso!');
    
    // Reset form and switch to login
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAgreeTerms(false);
    setError('');
    onSwitchToLogin();
  };

  return (
    <div className="register-form-container">
      <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder="Seu nome completo"
          />
        </div>
        
        <div>
          <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="seu@email.com"
          />
        </div>
        
        <div>
          <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="********"
          />
        </div>
        
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar Senha
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            placeholder="********"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="agree-terms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="h-4 w-4 text-primary-color focus:ring-primary-color border-gray-300 rounded"
          />
          <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
            Concordo com os <a href="#" className="text-primary-color hover:underline">Termos de Uso</a> e <a href="#" className="text-primary-color hover:underline">Política de Privacidade</a>
          </label>
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full btn btn-primary"
          >
            Cadastrar
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Já tem uma conta?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-primary-color hover:underline font-medium"
          >
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

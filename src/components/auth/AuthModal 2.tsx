import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ResetPasswordForm from "./ResetPasswordForm";

type AuthView = "login" | "register" | "reset-password";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: AuthView;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultView = "login",
}) => {
  const [currentView, setCurrentView] = useState<AuthView>(defaultView);
  const navigate = useNavigate();

  const handleSuccess = () => {
    onClose();
    navigate("/");
  };

  const getTitle = () => {
    switch (currentView) {
      case "login":
        return "Entrar";
      case "register":
        return "Criar conta";
      case "reset-password":
        return "Recuperar senha";
      default:
        return "";
    }
  };

  return (
    <Modal id="auth-modal" isOpen={isOpen} onClose={onClose} title={getTitle()}>
      <div className="w-full max-w-md mx-auto">
        {currentView === "login" && (
          <LoginForm
            onSuccess={handleSuccess}
            onForgotPassword={() => setCurrentView("reset-password")}
          />
        )}
        {currentView === "register" && (
          <RegisterForm
            onSuccess={handleSuccess}
            onLoginClick={() => setCurrentView("login")}
          />
        )}
        {currentView === "reset-password" && (
          <ResetPasswordForm
            onSuccess={handleSuccess}
            onLoginClick={() => setCurrentView("login")}
          />
        )}

        {currentView === "login" && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <button
                onClick={() => setCurrentView("register")}
                className="text-primary-600 hover:text-primary-500"
              >
                Criar conta
              </button>
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;

// src/entities/session/hooks/useLoginForm.js
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sessionApi } from '@entities/session/api/sessionApi';
import { loginSchema } from '@entities/session/model/schema';

export const useLoginForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await sessionApi.login(data);
      navigate('/');
    } catch (error) {
      setError('root', {
        message: error.message,
      });
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};

// src/entities/session/hooks/useRegistrationForm.js
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sessionApi } from '@entities/session/api/sessionApi';
import { registrationSchema } from '@entities/session/model/schema';

export const useRegistrationForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await sessionApi.register(data);
      navigate('/login');
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

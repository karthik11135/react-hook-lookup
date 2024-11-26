import './App.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

type FormFields = z.infer<typeof formSchema>;

const App = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <div>
      <h1>Form practice with hook forms</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <div>{errors.email.message}</div>}
        <br />
        <label>Password</label>
        <input {...register('password')} />
        {errors.password && <div>{errors.password.message}</div>}
        <br />
        <button disabled={isSubmitting} type={'submit'}>
          {isSubmitting ? 'Loading' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default App;

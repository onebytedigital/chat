import { ValidationError } from '@middlewares/ValidationError';
import { validate as validateClass } from 'class-validator';

export const validate = async (dto: any) => {
  const errors: any = await validateClass(dto);

  let messages: string[] = [];
  if (errors?.length) {
    for (const error of errors) {
      const { constraints } = error;
      for (const i in constraints) {
        const msg = constraints[i];
        messages.push(msg);
      }
    }
  }

  if (messages?.length > 0) {
    throw new ValidationError('Ocorreu erros na validação dos dados ou parâmetros enviados!', messages);
  }
};

import {
  FC,
  FormHTMLAttributes,
  ReactNode,
  cloneElement,
  isValidElement,
} from "react";
import { useForm } from "../../hooks/useForm";

interface FormProps<T extends Record<string, any>>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  /**
   * Configuração dos campos do formulário
   */
  config: Parameters<typeof useForm>[0];
  /**
   * Função chamada quando o formulário é submetido com sucesso
   */
  onSubmit: (values: T) => void;
  /**
   * Elementos filhos do formulário (inputs, buttons, etc)
   */
  children: ReactNode | ((formProps: ReturnType<typeof useForm>) => ReactNode);
}

/**
 * Componente Form que integra com o hook useForm
 * @example
 * <Form
 *   config={{
 *     email: {
 *       initialValue: '',
 *       validate: [
 *         {
 *           validate: (value) => value.includes('@'),
 *           message: 'Email inválido'
 *         }
 *       ]
 *     }
 *   }}
 *   onSubmit={(values) => console.log(values)}
 * >
 *   {({ values, errors, handleChange }) => (
 *     <Input
 *       name="email"
 *       value={values.email}
 *       onChange={(e) => handleChange('email', e.target.value)}
 *       error={errors.email}
 *     />
 *   )}
 * </Form>
 */
export function Form<T extends Record<string, any>>({
  config,
  onSubmit,
  children,
  ...props
}: FormProps<T>) {
  const form = useForm<T>(config);
  const { handleSubmit } = form;

  const renderChildren = () => {
    if (typeof children === "function") {
      return children(form);
    }

    return children;
  };

  const enhanceInputs = (node: ReactNode): ReactNode => {
    if (!isValidElement(node)) {
      return node;
    }

    if (
      node.type === "input" ||
      (typeof node.type === "function" && node.type.name === "Input")
    ) {
      const name = node.props.name;
      if (name && name in form.values) {
        return cloneElement(node, {
          value: form.values[name],
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            form.handleChange(name, e.target.value);
            node.props.onChange?.(e);
          },
          error: form.errors[name],
          "aria-invalid": !!form.errors[name],
        });
      }
    }

    if (node.props.children) {
      const children = Array.isArray(node.props.children)
        ? node.props.children.map((child) => enhanceInputs(child))
        : enhanceInputs(node.props.children);

      return cloneElement(node, { children });
    }

    return node;
  };

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)} noValidate>
      {enhanceInputs(renderChildren())}
    </form>
  );
}

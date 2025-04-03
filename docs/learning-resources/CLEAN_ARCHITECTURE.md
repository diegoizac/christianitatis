# Clean Architecture no React

## Recursos Oficiais

1. [Documentação Oficial do React](https://reactjs.org/docs/architecture.html)
2. [React Design Principles](https://reactjs.org/docs/design-principles.html)

## Conceitos Fundamentais

### 1. Separação de Responsabilidades

```typescript
// ✅ Correto
src/
  ├── domain/         # Regras de negócio e interfaces
  ├── application/    # Casos de uso
  ├── infrastructure/ # Implementações concretas
  └── presentation/   # Componentes React
```

### 2. Princípios SOLID no React

- **S** - Single Responsibility
- **O** - Open/Closed
- **L** - Liskov Substitution
- **I** - Interface Segregation
- **D** - Dependency Inversion

### 3. Exemplos Práticos

```typescript
// Domain Layer
interface IEvent {
  id: string;
  title: string;
  date: Date;
  location: string;
}

// Application Layer
interface IEventRepository {
  getEvents(): Promise<IEvent[]>;
  createEvent(event: IEvent): Promise<void>;
}

// Infrastructure Layer
class SupabaseEventRepository implements IEventRepository {
  async getEvents(): Promise<IEvent[]> {
    // Implementação com Supabase
  }

  async createEvent(event: IEvent): Promise<void> {
    // Implementação com Supabase
  }
}

// Presentation Layer
const EventList: React.FC = () => {
  // Componente React
};
```

## Melhores Práticas

1. Use Custom Hooks para lógica de negócio
2. Implemente Repository Pattern
3. Utilize Context API para estado global
4. Mantenha componentes puros
5. Aplique injeção de dependência

## Recursos Adicionais

- [Clean Architecture with React (Medium)](https://medium.com/better-programming/clean-architecture-with-react-cc097a08b105)
- [React Clean Code Guide](https://github.com/ryanmcdermott/clean-code-javascript)
- [Uncle Bob's Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## Exercícios Práticos

1. Refatore um componente usando Clean Architecture
2. Implemente um caso de uso completo
3. Crie testes para cada camada
